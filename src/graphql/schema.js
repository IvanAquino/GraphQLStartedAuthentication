import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = importSchema(__dirname + "/schemas/schema.graphql");

module.exports = makeExecutableSchema({ typeDefs, resolvers });