const { UserModel } = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config({ path: 'default.env' });

const generateToken = (user, expiresIn) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn })
}

module.exports = {
    Query: {
        myUser: (_, args, { userId }) => {
            return new Promise((resolve, reject) => {
                if (!!!userId) return resolve(null);

                UserModel.findById(userId)
                    .then(user => resolve(user))
                    .catch(err => reject(err));
            })
        },
        users: (_, args, { userId }) => {
            return new Promise((resolve, reject) => {
                if (!!!userId) return resolve(null);

                UserModel.find({ _id: userId }).then(users => {
                    resolve(users);
                })
                .catch(err => reject(err))
            })
        }
    }, 

    Mutation: {
        createUser: (_, { input }) => {
            const { name, email, password } = input;
            const user = new UserModel({ name, email, password });

            return new Promise((resolve, reject) => {
                user.save()
                    .then(() => resolve(user))
                    .catch(err => reject(err));
            })
        },

        authenticate: (_, { input }) => {
            const { email, password } = input;

            return new Promise((resolve, reject) => {
                UserModel.findOne({ email })
                    .then(user => {
                        bcrypt.compare(password, user.password, (err, passwordIsCorrect) => {
                            if ( !passwordIsCorrect ) return reject(new Error("Incorrect password"));
                            resolve({
                                token: generateToken(user._id, '365d')
                            })
                        })
                    })
                    .catch(err => reject(err));
            })
        }
    }
}