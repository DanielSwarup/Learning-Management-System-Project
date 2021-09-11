import { composeMongoose } from 'graphql-compose-mongoose';
import { Calendar } from '../models/CalendarMongoose.js'

const customizationOptions = {}; // left it empty for simplicity, described below
export const CalendarTC = composeMongoose(Calendar, customizationOptions);
