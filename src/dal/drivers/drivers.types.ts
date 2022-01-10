export type DefaultModelScalars = {
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type DataTypeAdapterMap<ModelScalars extends object, DBScalars extends object> = {
  [key in keyof ModelScalars]: DBScalars extends Record<key, unknown> ? DataTypeAdapter<ModelScalars[key], DBScalars[key]> : DataTypeAdapter<ModelScalars[key], unknown>
}

export type DataTypeAdapter<ModelType, DBType> = {
  modelToDB: (data: ModelType) => DBType
  dbToModel: (data: DBType) => ModelType
  validate?: (data: ModelType) => boolean
  generate?: () => ModelType
}

export const identityAdapter: DataTypeAdapter<any, any> = {
  dbToModel: (o: unknown) => o,
  modelToDB: (o: unknown) => o,
}
