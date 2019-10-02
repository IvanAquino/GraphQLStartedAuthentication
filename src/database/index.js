const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config({ path: 'default.env' });

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true });

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});

const UserModel = mongoose.model('users', userSchema);

module.exports = {
    UserModel
}