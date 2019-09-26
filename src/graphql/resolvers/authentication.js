import dotenv from 'dotenv'
dotenv.config({ path: 'default.env' });

import { UserModel } from '../../database'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateToken = (user, type, expiresIn) => {
    const token = jwt.sign({ user, type }, process.env.JWT_SECRET, { expiresIn })
    const tokenData = jwt.verify(token, process.env.JWT_SECRET)
    return {
        token,
        expiresIn: tokenData.exp
    }
}

const authenticate = async (_, { input }) => {
    const { email, password } = input
    
    const user = await UserModel.findOne({ email })
    const isPasswordCorrect = bcrypt.compareSync(password, user.password)
    if (!isPasswordCorrect) throw new Error("[AuthPasswordIN] Verify your password")

    return generateToken(user._id, 'user', '365d')
}

module.exports = {
    Mutation: {
        authenticate
    }
}