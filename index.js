const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config({ path: 'default.env' });

const schema = require('./graphql/schema');

const server = new ApolloServer({
    schema,
    debug: true,
    context: ({ req }) => {
        const token = req.headers['authorization'];

        if ( !!token ) {
            try {
                let verifiedData = jwt.verify(token, process.env.JWT_SECRET);
                return { userId: verifiedData.user }
            } catch (err) {
                console.error(err)
            }
        }
    }
});

server.listen(9001).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});