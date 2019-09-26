import { UserModel } from '../../database'

const createUser = async (_, { input }) => {
    const { name, email, password } = input;
    const user = new UserModel({ name, email, password });

    await user.save()
    return user
}

const myUser = async (_, { input }, { authenticatedId }) => {
    if ( !authenticatedId ) throw new Error("Authentication is required")

    return await UserModel.findById(authenticatedId)
}

module.exports = {
    Query: {
        myUser
    },
    Mutation: {
        createUser
    }
}