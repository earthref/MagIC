import {Mongo} from 'meteor/mongo';

export const Users = new Mongo.Collection('users');
export const References = new Mongo.Collection('references');
export const Contributions = new Mongo.Collection('contributions');
export const MagICModels = new Mongo.Collection('magic.models');
