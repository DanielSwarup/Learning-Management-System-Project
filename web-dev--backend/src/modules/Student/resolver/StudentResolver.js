import { StudentTC } from '../schema/StudentSchema.js'

export const studentQuery = {
    studentById: StudentTC.mongooseResolvers.findById(),
    studentByIds: StudentTC.mongooseResolvers.findByIds(),
    studentOne: StudentTC.mongooseResolvers.findOne(),
    studentMany: StudentTC.mongooseResolvers.findMany(),
    studentDataLoader: StudentTC.mongooseResolvers.dataLoader(),
    studentDataLoaderMany: StudentTC.mongooseResolvers.dataLoaderMany(),
    studentByIdLean: StudentTC.mongooseResolvers.findById({ lean: true }),
    studentByIdsLean: StudentTC.mongooseResolvers.findByIds({ lean: true }),
    studentOneLean: StudentTC.mongooseResolvers.findOne({ lean: true }),
    studentManyLean: StudentTC.mongooseResolvers.findMany({ lean: true }),
    studentDataLoaderLean: StudentTC.mongooseResolvers.dataLoader({ lean: true }),
    studentDataLoaderManyLean: StudentTC.mongooseResolvers.dataLoaderMany({ lean: true }),
    studentCount: StudentTC.mongooseResolvers.count(),
    studentConnection: StudentTC.mongooseResolvers.connection(),
    studentPagination: StudentTC.mongooseResolvers.pagination(),
};
  
export const studentMutation ={
    studentCreateOne: StudentTC.mongooseResolvers.createOne(),
    studentCreateMany: StudentTC.mongooseResolvers.createMany(),
    studentUpdateById: StudentTC.mongooseResolvers.updateById(),
    studentUpdateOne: StudentTC.mongooseResolvers.updateOne(),
    studentUpdateMany: StudentTC.mongooseResolvers.updateMany(),
    studentRemoveById: StudentTC.mongooseResolvers.removeById(),
    studentRemoveOne: StudentTC.mongooseResolvers.removeOne(),
    studentRemoveMany: StudentTC.mongooseResolvers.removeMany(),
};

