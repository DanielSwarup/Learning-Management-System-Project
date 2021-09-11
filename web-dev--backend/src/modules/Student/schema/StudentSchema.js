import { composeMongoose } from 'graphql-compose-mongoose';
import { Student } from '../models/StudentMongoose.js'

const customizationOptions = {}; // left it empty for simplicity, described below
export const StudentTC = composeMongoose(Student, customizationOptions);
