import { composeMongoose } from 'graphql-compose-mongoose';
import { Course } from '../models/CourseMongoose.js'

const customizationOptions = {}; // left it empty for simplicity, described below
export const CourseTC = composeMongoose(Course, customizationOptions);
