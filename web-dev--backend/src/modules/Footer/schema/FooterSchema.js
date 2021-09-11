import { composeMongoose } from 'graphql-compose-mongoose';
import { Footer } from '../models/FooterMongoose.js'

const customizationOptions = {}; // left it empty for simplicity, described below
export const FooterTC = composeMongoose(Footer, customizationOptions);
