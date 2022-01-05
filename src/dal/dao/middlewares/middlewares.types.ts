import { MiddlewareContext, DeleteParams, FindParams, InsertParams, ReplaceParams, UpdateParams, IdGenerationStrategy, DAOGenerics } from '../dao.types'
import { PartialDeep } from 'type-fest'

export type Continue<T extends boolean> = { continue: T }
export type FindMiddlewareInput<T extends DAOGenerics> = { operation: 'find'; params: FindParams<T> }
export type InsertMiddlewareInput<T extends DAOGenerics> = { operation: 'insert'; params: InsertParams<T> }
export type UpdateMiddlewareInput<T extends DAOGenerics> = { operation: 'update'; params: UpdateParams<T> }
export type ReplaceMiddlewareInput<T extends DAOGenerics> = { operation: 'replace'; params: ReplaceParams<T> }
export type DeleteMiddlewareInput<T extends DAOGenerics> = { operation: 'delete'; params: DeleteParams<T> }
export type MiddlewareInput<T extends DAOGenerics> = FindMiddlewareInput<T> | InsertMiddlewareInput<T> | UpdateMiddlewareInput<T> | ReplaceMiddlewareInput<T> | DeleteMiddlewareInput<T>

export type FindMiddlewareOutput<T extends DAOGenerics> = { operation: 'find'; params: FindParams<T>; records: PartialDeep<T['model']>[]; totalCount?: number }
export type InsertMiddlewareOutput<T extends DAOGenerics> = { operation: 'insert'; params: InsertParams<T>; record: T['insert'] }
export type UpdateMiddlewareOutput<T extends DAOGenerics> = { operation: 'update'; params: UpdateParams<T> }
export type ReplaceMiddlewareOutput<T extends DAOGenerics> = { operation: 'replace'; params: ReplaceParams<T> }
export type DeleteMiddlewareOutput<T extends DAOGenerics> = { operation: 'delete'; params: DeleteParams<T> }
export type MiddlewareOutput<T extends DAOGenerics> = FindMiddlewareOutput<T> | InsertMiddlewareOutput<T> | UpdateMiddlewareOutput<T> | ReplaceMiddlewareOutput<T> | DeleteMiddlewareOutput<T>

export type SelectBeforeMiddlewareOutputType<T extends DAOGenerics, I extends MiddlewareInput<T>> = I['operation'] extends 'find'
  ? (FindMiddlewareInput<T> & Continue<true>) | (FindMiddlewareOutput<T> & Continue<false>)
  : I['operation'] extends 'insert'
  ? (InsertMiddlewareInput<T> & Continue<true>) | (InsertMiddlewareOutput<T> & Continue<false>)
  : I['operation'] extends 'update'
  ? (UpdateMiddlewareInput<T> & Continue<true>) | (UpdateMiddlewareOutput<T> & Continue<false>)
  : I['operation'] extends 'replace'
  ? (ReplaceMiddlewareInput<T> & Continue<true>) | (ReplaceMiddlewareOutput<T> & Continue<false>)
  : I['operation'] extends 'delete'
  ? (DeleteMiddlewareInput<T> & Continue<true>) | (DeleteMiddlewareOutput<T> & Continue<false>)
  : never

export type SelectAfterMiddlewareOutputType<T extends DAOGenerics, I extends MiddlewareInput<T>> = I['operation'] extends 'find'
  ? FindMiddlewareOutput<T> & Continue<boolean>
  : I['operation'] extends 'insert'
  ? InsertMiddlewareOutput<T> & Continue<boolean>
  : I['operation'] extends 'update'
  ? UpdateMiddlewareOutput<T> & Continue<boolean>
  : I['operation'] extends 'replace'
  ? ReplaceMiddlewareOutput<T> & Continue<boolean>
  : I['operation'] extends 'delete'
  ? DeleteMiddlewareOutput<T> & Continue<boolean>
  : never

export type BeforeMiddlewareResult<T extends DAOGenerics> = (MiddlewareInput<T> & Continue<true>) | (MiddlewareOutput<T> & Continue<false>)
export type AfterMiddlewareResult<T extends DAOGenerics> = Continue<boolean> & MiddlewareOutput<T>

export type DAOMiddleware<T extends DAOGenerics> = {
  before?: <G extends MiddlewareInput<T>>(args: G, context: MiddlewareContext<T>) => Promise<BeforeMiddlewareResult<T> | void>
  after?: (args: MiddlewareOutput<T>, context: MiddlewareContext<T>) => Promise<AfterMiddlewareResult<T> | void>
}
