import { AdminTC } from '../schema/AdminSchema.js'

export const adminQuery = {
    adminById: AdminTC.mongooseResolvers.findById(),
    adminByIds: AdminTC.mongooseResolvers.findByIds(),
    adminOne: AdminTC.mongooseResolvers.findOne(),
    adminMany: AdminTC.mongooseResolvers.findMany(),
    adminDataLoader: AdminTC.mongooseResolvers.dataLoader(),
    adminDataLoaderMany: AdminTC.mongooseResolvers.dataLoaderMany(),
    adminByIdLean: AdminTC.mongooseResolvers.findById({ lean: true }),
    adminByIdsLean: AdminTC.mongooseResolvers.findByIds({ lean: true }),
    adminOneLean: AdminTC.mongooseResolvers.findOne({ lean: true }),
    adminManyLean: AdminTC.mongooseResolvers.findMany({ lean: true }),
    adminDataLoaderLean: AdminTC.mongooseResolvers.dataLoader({ lean: true }),
    adminDataLoaderManyLean: AdminTC.mongooseResolvers.dataLoaderMany({ lean: true }),
    adminCount: AdminTC.mongooseResolvers.count(),
    adminConnection: AdminTC.mongooseResolvers.connection(),
    adminPagination: AdminTC.mongooseResolvers.pagination(),
};
  
export const adminMutation ={
    adminCreateOne: AdminTC.mongooseResolvers.createOne(),
    adminCreateMany: AdminTC.mongooseResolvers.createMany(),
    adminUpdateById: AdminTC.mongooseResolvers.updateById(),
    adminUpdateOne: AdminTC.mongooseResolvers.updateOne(),
    adminUpdateMany: AdminTC.mongooseResolvers.updateMany(),
    adminRemoveById: AdminTC.mongooseResolvers.removeById(),
    adminRemoveOne: AdminTC.mongooseResolvers.removeOne(),
    adminRemoveMany: AdminTC.mongooseResolvers.removeMany(),
};

