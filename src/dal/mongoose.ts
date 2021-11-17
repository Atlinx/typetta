import { Document, Model, Types } from 'mongoose';
import { mongooseProjection, addAssociationRefToProjection, ConditionalPartialBy } from "../utils/utils";
import {
    DAOAssociationReference,
    ReadOptions, WriteOptions, AbstractDAO, DAOParams,
} from "./dao";
import { PartialDeep } from "type-fest";
import { deepCopy, setTraversing, replaceType } from '@twinlogix/tl-commons';
import Bignumber from 'bignumber.js';
import { AbstractDAOContext } from './daoContext';
import { Projection } from '../utils/types';

export abstract class AbstractMongooseDAO
    <
    ModelType,
    IDKey extends keyof Omit<ModelType, ExcludedFields>,
    IDAutogenerated extends boolean,
    FilterType,
    SortType,
    UpdateType,
    ExcludedFields extends keyof ModelType,
    SecurityContext
    >
    extends
    AbstractDAO
    <
    Model<Document>,
    Document,
    ModelType,
    IDKey,
    IDAutogenerated,
    FilterType,
    SortType,
    UpdateType,
    ExcludedFields,
    SecurityContext
    > {

    public DBModel: Model<Document>;

    protected constructor({ dbModel, ...params }: { idField: IDKey, daoContext: AbstractDAOContext<SecurityContext>, dbModel: Model<Document> } & DAOParams<ModelType, IDKey, IDAutogenerated, FilterType, UpdateType, ExcludedFields, SecurityContext>) {
        super(params);
        this.DBModel = dbModel;
    }

    protected async dbToModel(dbRecord: Document | null, projections?: Projection<ModelType>): Promise<ModelType | null> {
        return (await this.dbToModels([dbRecord], projections))[0];
    }

    protected async dbToModels(dbRecords: (Document | null)[], projections?: Projection<ModelType>): Promise<ModelType[]> {
        let dbObjects = dbRecords.map(dbRecord => this.dbToObject(dbRecord));
        dbObjects = await this.resolveAssociations(dbObjects, projections);
        return dbObjects;
    }

    protected dbToObject(dbRecord: Document | null): any {
        return dbRecord ? this.replaceTypesDbToModel(deepCopy(dbRecord.toObject())) : dbRecord;
    }

    protected replaceTypesDbToModel(obj: any): any {
        return replaceType(
            obj,
            (o: any): o is Types.Decimal128 => o instanceof Types.Decimal128,
            (o: Types.Decimal128) => new Bignumber(o.toString())
        );
    }

    protected replaceTypesModelToDb(obj: any): any {
        return replaceType(
            obj,
            (o: any): o is Bignumber => o instanceof Bignumber,
            (o: Bignumber) => Types.Decimal128.fromString(o.toString())
        );
    }

    protected modelToDb(
        model: Omit<ModelType, ExcludedFields> | PartialDeep<Omit<ModelType, ExcludedFields>> | ConditionalPartialBy<Omit<ModelType, ExcludedFields>, IDKey, IDAutogenerated>
    ): any {
        return this.replaceTypesModelToDb(deepCopy(model));
    }

    protected filterToDB(filter?: FilterType): any {
        let dbFilter = this.replaceTypesModelToDb(deepCopy(filter));
        if (dbFilter && dbFilter._) {
            dbFilter = { ...dbFilter, ...dbFilter._ };
            delete dbFilter._
        }
        return dbFilter;
    }

    protected projectionsToDB(projections?: Projection<ModelType>): any {
        let dbProjections = deepCopy(projections);

        // ENSURE CONNECTIONS FIELDS ARE SELECTED IF A CONNECTED ENTITY IS SELECTED
        if (dbProjections && typeof dbProjections === 'object') {
            this.associations
                .filter(association => association.reference === DAOAssociationReference.INNER)
                .forEach(association => addAssociationRefToProjection(
                    association.field,
                    association.refFrom,
                    dbProjections));
            this.associations
                .filter(association => association.reference === DAOAssociationReference.FOREIGN)
                .forEach(association => setTraversing(dbProjections, association.refTo, true));

            if (dbProjections._) {
                dbProjections = { ...dbProjections, ...dbProjections._ };
                delete dbProjections._
            }
        }
        return dbProjections;
    }

    protected sortsToDB(sorts?: SortType): any {
        if (sorts) {
            let dbSorts;
            if (Array.isArray(sorts)) {
                dbSorts = {};
                for (const sort of sorts) {
                    dbSorts = { ...dbSorts, ...sort }
                }
            } else if ((sorts as any).sorts || (sorts as any)._) {
                dbSorts = {
                    ...this.sortsToDB((sorts as any).sorts),
                    ...(sorts as any)._
                };
            } else {
                dbSorts = sorts;
            }
            return dbSorts;
        } else {
            return sorts;
        }
    }

    protected updatesToDB(updates?: UpdateType): any {
        let dbUpdates = this.replaceTypesModelToDb(deepCopy(updates));
        if (dbUpdates._) {
            dbUpdates = { ...dbUpdates, ...dbUpdates._ };
            delete dbUpdates._
        }
        Object.keys(dbUpdates).forEach(v => {
            if(dbUpdates[v] === undefined) {
                delete dbUpdates[v]
            }
        })
        return dbUpdates;
    }

    protected async _find(
        conditions: FilterType,
        projections?: Projection<ModelType>,
        sorts?: SortType,
        start?: number,
        limit?: number,
        options?: ReadOptions
    ): Promise<ModelType[]> {

        if (limit === 0) {
            return [];
        } else {
            const dbOptions = { skip: start, limit, sort: this.sortsToDB(sorts), ...(options || {})._ };
            const query = this.DBModel.find(
                this.filterToDB(conditions),
                mongooseProjection(this.projectionsToDB(projections), this.DBModel.schema),
                dbOptions
            );
            return this.dbToModels(await query.exec(), this.projectionsToDB(projections));
        }
    }

    protected async _findOne(
        conditions: FilterType,
        projections?: Projection<ModelType>,
        options?: ReadOptions
    ): Promise<ModelType | null> {

        const query = this.DBModel.findOne(
            this.filterToDB(conditions),
            mongooseProjection(this.projectionsToDB(projections),
                this.DBModel.schema),
            (options || {})._
        );
        return this.dbToModel(await query.exec(), this.projectionsToDB(projections));
    }

    protected async _findPage(
        conditions: FilterType,
        projections?: Projection<ModelType>,
        sorts?: SortType,
        start?: number,
        limit?: number,
        options?: ReadOptions
    ): Promise<{ totalCount: number, records: ModelType[] }> {

        const totalCount = await this.count(conditions);
        let records: ModelType[] = [];
        if (totalCount > 0) {
            records = await this._find(conditions, projections, sorts, start, limit, (options || {})._);
        }
        return { totalCount, records };
    }

    protected async _findByQuery(
        query: (dbRef: Model<Document>, dbProjections: any, dbSorts?: any, start?: number, limit?: number, options?: any) => Promise<Document[]>,
        projections?: Projection<ModelType>,
        sorts?: SortType,
        start?: number,
        limit?: number,
        options?: ReadOptions,
    ): Promise<ModelType[]> {

        if (limit === 0) {
            return [];
        } else {
            const dbProjections = this.projectionsToDB(projections);
            const dbSorts = this.sortsToDB(sorts);
            const dbOptions = { skip: start, limit, sort: this.sortsToDB(sorts), ...(options || {})._ };
            const dbRecords = await query(this.DBModel, dbProjections, dbSorts, start, limit, (options || {})._);
            return this.dbToModels(dbRecords, dbProjections);
        }
    }

    protected async _exists(conditions: FilterType, options?: ReadOptions): Promise<boolean> {
        return this.DBModel.exists(this.filterToDB(conditions));
    }

    protected async _count(conditions: FilterType, options?: ReadOptions): Promise<number> {
        return this.DBModel.count(this.filterToDB(conditions)).exec();
    }

    protected async _insert(
        record: ConditionalPartialBy<Omit<ModelType, ExcludedFields>, IDKey, IDAutogenerated>,
        options?: WriteOptions): Promise<ModelType> {

        const dbObjects = await this.DBModel.create([this.modelToDb(record)], (options || {})._);
        record[this.idField] = (dbObjects[0].toObject() as any)[this.idField];
        return record as ModelType;
    }

    protected async _updateOne(filter: FilterType, changes: UpdateType, options?: WriteOptions): Promise<void> {
        if (options && options._) {
            await this.DBModel.updateOne(this.filterToDB(filter), this.updatesToDB(changes), options._).exec();
        } else {
            const res = await this.DBModel.updateOne(this.filterToDB(filter), this.updatesToDB(changes)).exec();
        }
    }

    protected async _updateMany(filter: FilterType, changes: UpdateType, options?: WriteOptions): Promise<void> {
        if (options && options._) {
            await this.DBModel.updateMany(this.filterToDB(filter), this.updatesToDB(changes), options._).exec();
        } else {
            await this.DBModel.updateMany(this.filterToDB(filter), this.updatesToDB(changes)).exec();
        }
    }

    protected async _replaceOne(filter: FilterType, to: Omit<ModelType, ExcludedFields>, options?: WriteOptions): Promise<void> {
        await this.DBModel.replaceOne(filter, this.modelToDb(to));
    }

    protected async _deleteOne(filter: FilterType, options?: WriteOptions): Promise<void> {
        if (options && options._) {
            await this.DBModel.deleteOne(this.filterToDB(filter), options._).exec();
        } else {
            await this.DBModel.deleteOne(this.filterToDB(filter)).exec();
        }
    }

    protected async _deleteMany(filter: FilterType, options?: WriteOptions): Promise<void> {
        if (options && options._) {
            await this.DBModel.deleteMany(this.filterToDB(filter), options._).exec();
        } else {
            await this.DBModel.deleteMany(this.filterToDB(filter)).exec();
        }
    }

}
