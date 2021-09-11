import { ResourceTC } from '../schema/ResourceSchema.js'

export const resourceQuery = {
    resourceById: ResourceTC.mongooseResolvers.findById(),
    resourceByIds: ResourceTC.mongooseResolvers.findByIds(),
    resourceOne: ResourceTC.mongooseResolvers.findOne(),
    resourceMany: ResourceTC.mongooseResolvers.findMany(),
    resourceDataLoader: ResourceTC.mongooseResolvers.dataLoader(),
    resourceDataLoaderMany: ResourceTC.mongooseResolvers.dataLoaderMany(),
    resourceByIdLean: ResourceTC.mongooseResolvers.findById({ lean: true }),
    resourceByIdsLean: ResourceTC.mongooseResolvers.findByIds({ lean: true }),
    resourceOneLean: ResourceTC.mongooseResolvers.findOne({ lean: true }),
    resourceManyLean: ResourceTC.mongooseResolvers.findMany({ lean: true }),
    resourceDataLoaderLean: ResourceTC.mongooseResolvers.dataLoader({ lean: true }),
    resourceDataLoaderManyLean: ResourceTC.mongooseResolvers.dataLoaderMany({ lean: true }),
    resourceCount: ResourceTC.mongooseResolvers.count(),
    resourceConnection: ResourceTC.mongooseResolvers.connection(),
    resourcePagination: ResourceTC.mongooseResolvers.pagination(),
};
  
export const resourceMutation ={
    resourceCreateOne: ResourceTC.mongooseResolvers.createOne(),
    resourceCreateMany: ResourceTC.mongooseResolvers.createMany(),
    resourceUpdateById: ResourceTC.mongooseResolvers.updateById(),
    resourceUpdateOne: ResourceTC.mongooseResolvers.updateOne(),
    resourceUpdateMany: ResourceTC.mongooseResolvers.updateMany(),
    resourceRemoveById: ResourceTC.mongooseResolvers.removeById(),
    resourceRemoveOne: ResourceTC.mongooseResolvers.removeOne(),
    resourceRemoveMany: ResourceTC.mongooseResolvers.removeMany(),
};

