import "regenerator-runtime/runtime";

import { ApolloServer } from 'apollo-server'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config({ path: 'default.env' })

import schema from './graphql/schema'
const debugMode = process.env.DEBUG == 'true'

const server = new ApolloServer({
    schema,
    debug: debugMode,
    cors: true,
    playground: debugMode,
    context: ({ req }) => {
        if (!!req) {
            const token = req.headers['authorization'];
            if (!!token) {
                try {
                    let verifiedData = jwt.verify(token, process.env.JWT_SECRET);
                    return { authenticatedId: verifiedData.user, authenticatedType: verifiedData.type }
                } catch (err) {
                    console.error(err)
                }
            }
        }
    }
});

server.listen({ port: process.env.PORT, host: process.env.HOST }).then(({ url, subscriptionsUrl }) => {
    console.log(`🚀  Server ready at ${url} - ${subscriptionsUrl}`);
})