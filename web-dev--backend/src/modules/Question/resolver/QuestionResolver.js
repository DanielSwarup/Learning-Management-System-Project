import { QuestionTC } from '../schema/QuestionSchema.js'

export const questionQuery = {
    questionById: QuestionTC.mongooseResolvers.findById(),
    questionByIds: QuestionTC.mongooseResolvers.findByIds(),
    questionOne: QuestionTC.mongooseResolvers.findOne(),
    questionMany: QuestionTC.mongooseResolvers.findMany(),
    questionDataLoader: QuestionTC.mongooseResolvers.dataLoader(),
    questionDataLoaderMany: QuestionTC.mongooseResolvers.dataLoaderMany(),
    questionByIdLean: QuestionTC.mongooseResolvers.findById({ lean: true }),
    questionByIdsLean: QuestionTC.mongooseResolvers.findByIds({ lean: true }),
    questionOneLean: QuestionTC.mongooseResolvers.findOne({ lean: true }),
    questionManyLean: QuestionTC.mongooseResolvers.findMany({ lean: true }),
    questionDataLoaderLean: QuestionTC.mongooseResolvers.dataLoader({ lean: true }),
    questionDataLoaderManyLean: QuestionTC.mongooseResolvers.dataLoaderMany({ lean: true }),
    questionCount: QuestionTC.mongooseResolvers.count(),
    questionConnection: QuestionTC.mongooseResolvers.connection(),
    questionPagination: QuestionTC.mongooseResolvers.pagination(),
};
  
export const questionMutation ={
    questionCreateOne: QuestionTC.mongooseResolvers.createOne(),
    questionCreateMany: QuestionTC.mongooseResolvers.createMany(),
    questionUpdateById: QuestionTC.mongooseResolvers.updateById(),
    questionUpdateOne: QuestionTC.mongooseResolvers.updateOne(),
    questionUpdateMany: QuestionTC.mongooseResolvers.updateMany(),
    questionRemoveById: QuestionTC.mongooseResolvers.removeById(),
    questionRemoveOne: QuestionTC.mongooseResolvers.removeOne(),
    questionRemoveMany: QuestionTC.mongooseResolvers.removeMany(),
};

