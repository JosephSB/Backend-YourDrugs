const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    userId: String,
    userName: String,
    password: String,
    name: String,
    Email: String,
    Grow: String
},{ collection: "users" })

UserSchema.methods.encryptPassword = (password)=>{
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
UserSchema.methods.comparePassword = function (password){
	return bcrypt.compareSync(password, this.password)
}

const connection = require('./CommentsConnection')
const UserModel = mongoose.model('Usuarios', UserSchema);

module.exports = UserModel