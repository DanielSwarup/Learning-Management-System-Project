import { composeMongoose } from 'graphql-compose-mongoose';
import { Quiz } from '../models/QuizMongoose.js'

const customizationOptions = {}; // left it empty for simplicity, described below
export const QuizTC = composeMongoose(Quiz, customizationOptions);
