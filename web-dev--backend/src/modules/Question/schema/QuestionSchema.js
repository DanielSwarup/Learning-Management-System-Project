import { composeMongoose } from 'graphql-compose-mongoose';
import { Question } from '../models/QuestionMongoose.js'

const customizationOptions = {}; // left it empty for simplicity, described below
export const QuestionTC = composeMongoose(Question, customizationOptions);
