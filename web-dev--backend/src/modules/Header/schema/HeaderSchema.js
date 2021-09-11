import { composeMongoose } from 'graphql-compose-mongoose';
import { Header } from '../models/HeaderMongoose.js'

const customizationOptions = {}; // left it empty for simplicity, described below
export const HeaderTC = composeMongoose(Header, customizationOptions);