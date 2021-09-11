import { CourseTC } from '../schema/CourseSchema.js'

export const courseQuery = {
    courseById: CourseTC.mongooseResolvers.findById(),
    courseByIds: CourseTC.mongooseResolvers.findByIds(),
    courseOne: CourseTC.mongooseResolvers.findOne(),
    courseMany: CourseTC.mongooseResolvers.findMany(),
    courseDataLoader: CourseTC.mongooseResolvers.dataLoader(),
    courseDataLoaderMany: CourseTC.mongooseResolvers.dataLoaderMany(),
    courseByIdLean: CourseTC.mongooseResolvers.findById({ lean: true }),
    courseByIdsLean: CourseTC.mongooseResolvers.findByIds({ lean: true }),
    courseOneLean: CourseTC.mongooseResolvers.findOne({ lean: true }),
    courseManyLean: CourseTC.mongooseResolvers.findMany({ lean: true }),
    courseDataLoaderLean: CourseTC.mongooseResolvers.dataLoader({ lean: true }),
    courseDataLoaderManyLean: CourseTC.mongooseResolvers.dataLoaderMany({ lean: true }),
    courseCount: CourseTC.mongooseResolvers.count(),
    courseConnection: CourseTC.mongooseResolvers.connection(),
    coursePagination: CourseTC.mongooseResolvers.pagination(),
};
  
export const courseMutation ={
    courseCreateOne: CourseTC.mongooseResolvers.createOne(),
    courseCreateMany: CourseTC.mongooseResolvers.createMany(),
    courseUpdateById: CourseTC.mongooseResolvers.updateById(),
    courseUpdateOne: CourseTC.mongooseResolvers.updateOne(),
    courseUpdateMany: CourseTC.mongooseResolvers.updateMany(),
    courseRemoveById: CourseTC.mongooseResolvers.removeById(),
    courseRemoveOne: CourseTC.mongooseResolvers.removeOne(),
    courseRemoveMany: CourseTC.mongooseResolvers.removeMany(),
};

