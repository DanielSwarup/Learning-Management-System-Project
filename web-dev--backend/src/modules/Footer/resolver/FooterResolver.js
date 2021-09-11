import { FooterTC } from '../schema/FooterSchema.js'

export const footerQuery = {
    footerById: FooterTC.mongooseResolvers.findById(),
    footerByIds: FooterTC.mongooseResolvers.findByIds(),
    footerOne: FooterTC.mongooseResolvers.findOne(),
    footerMany: FooterTC.mongooseResolvers.findMany(),
    footerDataLoader: FooterTC.mongooseResolvers.dataLoader(),
    footerDataLoaderMany: FooterTC.mongooseResolvers.dataLoaderMany(),
    footerByIdLean: FooterTC.mongooseResolvers.findById({ lean: true }),
    footerByIdsLean: FooterTC.mongooseResolvers.findByIds({ lean: true }),
    footerOneLean: FooterTC.mongooseResolvers.findOne({ lean: true }),
    footerManyLean: FooterTC.mongooseResolvers.findMany({ lean: true }),
    footerDataLoaderLean: FooterTC.mongooseResolvers.dataLoader({ lean: true }),
    footerDataLoaderManyLean: FooterTC.mongooseResolvers.dataLoaderMany({ lean: true }),
    footerCount: FooterTC.mongooseResolvers.count(),
    footerConnection: FooterTC.mongooseResolvers.connection(),
    footerPagination: FooterTC.mongooseResolvers.pagination(),
};
  
export const footerMutation ={
    footerCreateOne: FooterTC.mongooseResolvers.createOne(),
    footerCreateMany: FooterTC.mongooseResolvers.createMany(),
    footerUpdateById: FooterTC.mongooseResolvers.updateById(),
    footerUpdateOne: FooterTC.mongooseResolvers.updateOne(),
    footerUpdateMany: FooterTC.mongooseResolvers.updateMany(),
    footerRemoveById: FooterTC.mongooseResolvers.removeById(),
    footerRemoveOne: FooterTC.mongooseResolvers.removeOne(),
    footerRemoveMany: FooterTC.mongooseResolvers.removeMany(),
};

