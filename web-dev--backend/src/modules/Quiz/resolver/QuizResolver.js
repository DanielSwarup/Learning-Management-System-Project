import { QuizTC } from '../schema/QuizSchema.js'

export const quizQuery = {
    quizById: QuizTC.mongooseResolvers.findById(),
    quizByIds: QuizTC.mongooseResolvers.findByIds(),
    quizOne: QuizTC.mongooseResolvers.findOne(),
    quizMany: QuizTC.mongooseResolvers.findMany(),
    quizDataLoader: QuizTC.mongooseResolvers.dataLoader(),
    quizDataLoaderMany: QuizTC.mongooseResolvers.dataLoaderMany(),
    quizByIdLean: QuizTC.mongooseResolvers.findById({ lean: true }),
    quizByIdsLean: QuizTC.mongooseResolvers.findByIds({ lean: true }),
    quizOneLean: QuizTC.mongooseResolvers.findOne({ lean: true }),
    quizManyLean: QuizTC.mongooseResolvers.findMany({ lean: true }),
    quizDataLoaderLean: QuizTC.mongooseResolvers.dataLoader({ lean: true }),
    quizDataLoaderManyLean: QuizTC.mongooseResolvers.dataLoaderMany({ lean: true }),
    quizCount: QuizTC.mongooseResolvers.count(),
    quizConnection: QuizTC.mongooseResolvers.connection(),
    quizPagination: QuizTC.mongooseResolvers.pagination(),
};
  
export const quizMutation ={
    quizCreateOne: QuizTC.mongooseResolvers.createOne(),
    quizCreateMany: QuizTC.mongooseResolvers.createMany(),
    quizUpdateById: QuizTC.mongooseResolvers.updateById(),
    quizUpdateOne: QuizTC.mongooseResolvers.updateOne(),
    quizUpdateMany: QuizTC.mongooseResolvers.updateMany(),
    quizRemoveById: QuizTC.mongooseResolvers.removeById(),
    quizRemoveOne: QuizTC.mongooseResolvers.removeOne(),
    quizRemoveMany: QuizTC.mongooseResolvers.removeMany(),
};

