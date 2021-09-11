import { composeMongoose } from 'graphql-compose-mongoose';
import { Resource } from '../models/ResourceMongoose.js'

const customizationOptions = {}; // left it empty for simplicity, described below
export const ResourceTC = composeMongoose(Resource, customizationOptions);
