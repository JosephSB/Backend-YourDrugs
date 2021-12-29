const User = require('./UserSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config()


const UserModel = () => {}

UserModel.addUser = async (cb, data) =>{
    const newUser = new User()
    newUser.userId = data.userId
    newUser.userName = data.userName
    newUser.password = newUser.encryptPassword(data.password)
    newUser.name = data.name
    newUser.Email = data.Email
    newUser.Grow = data.password
    await User.create(newUser,(err)=>{
        if(err) cb(err)
        else cb()
    })
}

UserModel.validateRepeatUser = (user)=>{
    return new Promise(function (resolve, reject){
        User
            .find({userName : user})
            .exec((err, docs)=>{
                if(err)  throw err
                else {
                    if(docs.length == 0) resolve(true)
                    else resolve("existe")
                }
            })
    })
}


UserModel.validateUser = async (cb,data) =>{
    const busquedaUser = await  User.findOne({userName : data.userName})

    if(!busquedaUser){
		cb(false,"EL USUARIO NO EXISTE")
	}else if(!busquedaUser.comparePassword(data.password)){
		cb(false,"DATOS INCORRECTOS")
	}else{
        //si el usuario existe
        const user= {
            id: busquedaUser.userId,
            userName: busquedaUser.userName
        }
        jwt.sign({user}, process.env.SECRET_KEY, (err, token) => {
            cb(true,"LOGIN SUCCESSFUL",token)
        });
    }
}

UserModel.allData = async(cb)=>{
    await User
        .find()
        .exec((err, docs)=>{
            if(err) cb(err)
            else cb(null,docs)
        })
}

module.exports = UserModel