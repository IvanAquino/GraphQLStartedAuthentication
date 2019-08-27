const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = importSchema(__dirname + "/schemas/schema.graphql");
const resolvers = require('./resolvers');

module.exports = makeExecutableSchema({ typeDefs, resolvers });