import { CalendarTC } from '../schema/CalendarSchema.js'

export const calendarQuery = {
    calendarById: CalendarTC.mongooseResolvers.findById(),
    calendarByIds: CalendarTC.mongooseResolvers.findByIds(),
    calendarOne: CalendarTC.mongooseResolvers.findOne(),
    calendarMany: CalendarTC.mongooseResolvers.findMany(),
    calendarDataLoader: CalendarTC.mongooseResolvers.dataLoader(),
    calendarDataLoaderMany: CalendarTC.mongooseResolvers.dataLoaderMany(),
    calendarByIdLean: CalendarTC.mongooseResolvers.findById({ lean: true }),
    calendarByIdsLean: CalendarTC.mongooseResolvers.findByIds({ lean: true }),
    calendarOneLean: CalendarTC.mongooseResolvers.findOne({ lean: true }),
    calendarManyLean: CalendarTC.mongooseResolvers.findMany({ lean: true }),
    calendarDataLoaderLean: CalendarTC.mongooseResolvers.dataLoader({ lean: true }),
    calendarDataLoaderManyLean: CalendarTC.mongooseResolvers.dataLoaderMany({ lean: true }),
    calendarCount: CalendarTC.mongooseResolvers.count(),
    calendarConnection: CalendarTC.mongooseResolvers.connection(),
    calendarPagination: CalendarTC.mongooseResolvers.pagination(),
};
  
export const calendarMutation ={
    calendarCreateOne: CalendarTC.mongooseResolvers.createOne(),
    calendarCreateMany: CalendarTC.mongooseResolvers.createMany(),
    calendarUpdateById: CalendarTC.mongooseResolvers.updateById(),
    calendarUpdateOne: CalendarTC.mongooseResolvers.updateOne(),
    calendarUpdateMany: CalendarTC.mongooseResolvers.updateMany(),
    calendarRemoveById: CalendarTC.mongooseResolvers.removeById(),
    calendarRemoveOne: CalendarTC.mongooseResolvers.removeOne(),
    calendarRemoveMany: CalendarTC.mongooseResolvers.removeMany(),
};

