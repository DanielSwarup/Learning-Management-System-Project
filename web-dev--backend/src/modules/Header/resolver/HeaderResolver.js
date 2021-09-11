import { HeaderTC } from '../schema/HeaderSchema.js'

export const headerQuery = {
    headerById: HeaderTC.mongooseResolvers.findById(),
    headerByIds: HeaderTC.mongooseResolvers.findByIds(),
    headerOne: HeaderTC.mongooseResolvers.findOne(),
    headerMany: HeaderTC.mongooseResolvers.findMany(),
    headerDataLoader: HeaderTC.mongooseResolvers.dataLoader(),
    headerDataLoaderMany: HeaderTC.mongooseResolvers.dataLoaderMany(),
    headerByIdLean: HeaderTC.mongooseResolvers.findById({ lean: true }),
    headerByIdsLean: HeaderTC.mongooseResolvers.findByIds({ lean: true }),
    headerOneLean: HeaderTC.mongooseResolvers.findOne({ lean: true }),
    headerManyLean: HeaderTC.mongooseResolvers.findMany({ lean: true }),
    headerDataLoaderLean: HeaderTC.mongooseResolvers.dataLoader({ lean: true }),
    headerDataLoaderManyLean: HeaderTC.mongooseResolvers.dataLoaderMany({ lean: true }),
    headerCount: HeaderTC.mongooseResolvers.count(),
    headerConnection: HeaderTC.mongooseResolvers.connection(),
    headerPagination: HeaderTC.mongooseResolvers.pagination(),
};
  
export const headerMutation ={
    headerCreateOne: HeaderTC.mongooseResolvers.createOne(),
    headerCreateMany: HeaderTC.mongooseResolvers.createMany(),
    headerUpdateById: HeaderTC.mongooseResolvers.updateById(),
    headerUpdateOne: HeaderTC.mongooseResolvers.updateOne(),
    headerUpdateMany: HeaderTC.mongooseResolvers.updateMany(),
    headerRemoveById: HeaderTC.mongooseResolvers.removeById(),
    headerRemoveOne: HeaderTC.mongooseResolvers.removeOne(),
    headerRemoveMany: HeaderTC.mongooseResolvers.removeMany(),
};