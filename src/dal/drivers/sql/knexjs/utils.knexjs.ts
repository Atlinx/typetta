import { findSchemaField, modelValueToDbValue, MONGODB_QUERY_PREFIXS } from '../../../../utils/utils'
import { EqualityOperators, QuantityOperators, ElementOperators, StringOperators, LogicalOperators } from '../../../dao/filters/filters.types'
import { GenericProjection } from '../../../dao/projections/projections.types'
import { Schema, SchemaField } from '../../../dao/schemas/schemas.types'
import { SortDirection } from '../../../dao/sorts/sorts.types'
import { DefaultModelScalars } from '../../drivers.types'
import { KnexJSDataTypeAdapterMap } from './adapters.knexjs'
import { Knex } from 'knex'

export type AbstractFilter = {
  [key: string]: unknown | null | EqualityOperators<unknown> | QuantityOperators<unknown> | ElementOperators | StringOperators
} & LogicalOperators<unknown>

export type AbstractSort = { [key: string]: SortDirection }

function modelNameToDbName<ScalarsType>(name: string, schema: Schema<ScalarsType>): string {
  const c = name.split('.')
  const k = c.shift()!
  const schemaField = schema[k]
  const n = (schemaField && schemaField.alias) || k
  if (c.length === 0) {
    return n
  } else {
    return schemaField && 'embedded' in schemaField ? concatEmbeddedNames(n, modelNameToDbName(c.join('.'), schemaField.embedded)) : k + '.' + c.join('.')
  }
}

// TODO: array fitlering not supported
export function buildWhereConditions<TRecord, TResult, ScalarsType extends DefaultModelScalars>(
  builder: Knex.QueryBuilder<TRecord, TResult>,
  filter: AbstractFilter,
  schema: Schema<ScalarsType>,
  adapters: KnexJSDataTypeAdapterMap<ScalarsType>,
): Knex.QueryBuilder<TRecord, TResult> {
  Object.entries(filter).forEach(([k, v]) => {
    const schemaField = findSchemaField(k, schema)
    if (schemaField) {
      if (schemaField.array) {
        throw new Error(`Array filtering not supported on sql entity yet. (field: ${k})`)
      }
      const columnName = modelNameToDbName(k, schema)
      if ('scalar' in schemaField) {
        if (typeof v === 'object' && v !== null && Object.keys(v).some((kv) => MONGODB_QUERY_PREFIXS.has(kv))) {
          const adapter = adapters[schemaField.scalar]
          if (!adapter) {
            throw new Error(`Adapter for scalar ${schemaField.scalar} not found. ${Object.keys(adapters)}`)
          }
          Object.entries(v).forEach(([fk, fv]) => {
            const av = () => adapter.modelToDB(fv) as any
            const avs = () => (fv as any[]).map((fve) => adapter.modelToDB(fve) as any)
            // prettier-ignore
            switch (fk) { // TODO: text search
              case '$exists': fv ? builder.whereNotNull(columnName) : builder.whereNull(columnName); break
              case '$eq': builder.where(columnName, av()); break
              case '$gte': builder.where(columnName, '>=', av()); break
              case '$gt': builder.where(columnName, '>', av()); break
              case '$lte': builder.where(columnName, '<=', av()); break
              case '$lt': builder.where(columnName, '<', av()); break
              case '$ne': builder.not.where(columnName, av()); break
              case '$in': builder.whereIn(columnName, avs()); break
              case '$nin': builder.not.whereIn(columnName, avs()); break
              default: throw new Error(`${fk} query is not supported on sql entity yet.`)
            }
          })
        } else {
          if (v === null) {
            builder.whereNull(columnName)
          } else if (v !== undefined) {
            const adapter = adapters[schemaField.scalar]
            builder.where(columnName, adapter.modelToDB(v as any) as any)
          }
        }
      } else {
        throw new Error('Filtering on embedded types is not supported.')
      }
    } else if (k === '$or') {
      builder.orWhere((qb) => {
        ;(v as AbstractFilter[]).forEach((f) => buildWhereConditions(qb.or, f, schema, adapters))
      })
    } else if (k === '$and') {
      builder.andWhere((qb) => {
        ;(v as AbstractFilter[]).forEach((f) => buildWhereConditions(qb, f, schema, adapters))
      })
    } else if (k === '$nor') {
      builder.not.orWhere((qb) => {
        ;(v as AbstractFilter[]).forEach((f) => buildWhereConditions(qb.or, f, schema, adapters))
      })
    } else if (k === '$not') {
      builder.whereNot((qb) => {
        buildWhereConditions(qb, v as AbstractFilter, schema, adapters)
      })
    } else {
      throw new Error(`${k} is not a scalar in the schema. (Filtering on embedded types is not supported.)`)
    }
  })
  return builder
}

function embeddedColumns<ScalarsType>(prefix: string, schema: Schema<ScalarsType>, projection: GenericProjection): string[] {
  return Object.entries(schema).flatMap(([k, v]) => {
    if (projection === true || (typeof projection === 'object' && k in projection)) {
      if ('embedded' in v) {
        return embeddedColumns(concatEmbeddedNames(prefix, v.alias || k), v.embedded, projection === true ? projection : projection[k])
      }
      return concatEmbeddedNames(prefix, v.alias || k)
    }
    return []
  })
}

// TODO: array not supported
export function buildSelect<TRecord, TResult, ScalarsType>(
  builder: Knex.QueryBuilder<TRecord, TResult>,
  projection: GenericProjection,
  schema: Schema<ScalarsType>,
): Knex.QueryBuilder<TRecord, TResult> {
  if (projection === false) {
    builder.select([])
  } else if (projection === true) {
    builder.select()
  } else {
    builder.select(
      Object.entries(projection).flatMap(([k, v]) => {
        if (k in schema) {
          const schemaField = schema[k]
          if ('embedded' in schemaField) {
            return embeddedColumns(schemaField.alias || k, schemaField.embedded, v)
          } else {
            return [schemaField.alias || k]
          }
        } else {
          return []
        }
      }),
    )
  }
  return builder
}

export function buildSort<TRecord, TResult, ScalarsType>(builder: Knex.QueryBuilder<TRecord, TResult>, sorts: AbstractSort[], schema: Schema<ScalarsType>): Knex.QueryBuilder<TRecord, TResult> {
  sorts.forEach((s) => {
    const [sortKey, sortDirection] = Object.entries(s)[0]
    builder.orderBy(modelNameToDbName(sortKey, schema), sortDirection === SortDirection.ASC ? 'asc' : 'desc')
  })
  return builder
}

export function flatEmbdeddedToDb<ScalarsType>(schema: Schema<ScalarsType>, object: any) {
  function flat(prefix: string, schemaFiled: { embedded: Schema<ScalarsType> }, value: any): object {
    return Object.entries(schemaFiled.embedded).reduce((result, [k, subSchemaField]) => {
      const key = subSchemaField.alias || k
      if (key in value) {
        const name = concatEmbeddedNames(prefix, key)
        if ('embedded' in subSchemaField) {
          return { ...result, ...flat(name, subSchemaField, value[key]) }
        } else {
          return { ...result, [name]: value[key] }
        }
      }
      return result
    }, {})
  }
  return Object.entries(schema).reduce((result, [k, schemaFiled]) => {
    const name = schemaFiled.alias || k
    if ('embedded' in schemaFiled && name in object) {
      const flatted = { ...result, ...flat(name, schemaFiled, object[name]) }
      delete flatted[name]
      return flatted
    }
    return result
  }, object)
}

export function unflatEmbdeddedFromDb<ScalarsType>(schema: Schema<ScalarsType>, object: any) {
  function unflat(prefix: string, schemaFiled: { embedded: Schema<ScalarsType> }, value: { [key: string]: unknown }, toDelete: string[] = []): [object | undefined, string[]] {
    const res = Object.entries(schemaFiled.embedded).reduce(
      ([record, oldToDelete], [k, subSchemaField]) => {
        const name = concatEmbeddedNames(prefix, subSchemaField.alias || k)
        if ('embedded' in subSchemaField) {
          const [obj, newToDelete] = unflat(name, subSchemaField, value, oldToDelete)
          return [{ ...(record || {}), [k]: obj }, newToDelete] as [object, string[]]
        } else if (name in value) {
          return [{ ...(record || {}), [k]: value[name] }, [...oldToDelete, name]] as [object, string[]]
        }
        return [record, oldToDelete] as [object | undefined, string[]]
      },
      [undefined, toDelete] as [object | undefined, string[]],
    )
    return res
  }
  return Object.entries(schema).reduce((result, [k, schemaFiled]) => {
    if ('embedded' in schemaFiled) {
      const [obj, toDelete] = unflat(schemaFiled.alias || k, schemaFiled, object)
      if (obj) {
        const res = { ...result, [k]: obj }
        for (const key of toDelete) {
          delete (res as any)[key]
        }
        return res
      }
    }
    return result
  }, object)
}

export function concatEmbeddedNames(prefix: string, name: string) {
  return prefix + '_' + name
}

export function embeddedScalars<ScalarsType>(prefix: string, schema: Schema<ScalarsType>): [string, { scalar: keyof ScalarsType } & { array?: boolean; required?: boolean; alias?: string }][] {
  return Object.entries(schema).flatMap(([key, schemaField]) => {
    if ('embedded' in schemaField) {
      return embeddedScalars(concatEmbeddedNames(prefix, schemaField.alias || key), schemaField.embedded)
    }
    return [[concatEmbeddedNames(prefix, schemaField.alias || key), schemaField]]
  })
}

export function adaptUpdate<ScalarsType extends DefaultModelScalars, UpdateType>(update: UpdateType, schema: Schema<ScalarsType>, adapters: KnexJSDataTypeAdapterMap<ScalarsType>): any {
  return Object.entries(update).reduce((p, [k, v]) => {
    const schemaField = findSchemaField(k, schema)
    const columnName = modelNameToDbName(k, schema)
    if (schemaField && 'scalar' in schemaField) {
      const adapter = adapters[schemaField.scalar]
      return { [columnName]: modelValueToDbValue(v, schemaField, adapter), ...p }
    } else if (schemaField) {
      const adapted = adaptUpdate(v, schemaField.embedded, adapters)
      return Object.entries(adapted).reduce((sp, [sk, sv]) => {
        return { [concatEmbeddedNames(columnName, sk)]: sv, ...sp }
      }, p)
    } else {
      return p
    }
  }, {})
}
