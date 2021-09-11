import { composeMongoose } from 'graphql-compose-mongoose';
import { Admin } from '../models/AdminMongoose.js'

const customizationOptions = {}; // left it empty for simplicity, described below
export const AdminTC = composeMongoose(Admin, customizationOptions);
