import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config({ path: 'default.env' });

export const hashPassword = async (password) => {
    console.log(password)
    return await bcrypt.hash(password, process.env.PASSWORD_SALT);
}

export default hashPassword