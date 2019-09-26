import AuthenticationResolver from './resolvers/authentication'
import UsersResolver from './resolvers/users'


module.exports = {
    Query: {
        ...UsersResolver.Query
    }, 

    Mutation: {
        ...AuthenticationResolver.Mutation,
        ...UsersResolver.Mutation
    }
}