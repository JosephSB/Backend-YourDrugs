const userModel = require('../model/UsersModel')
const UserValidate = () => {}

UserValidate.validatePassword = (Password, Password2)=>{
    let infoErrors =[]

    let mayuscula = false;
    let numero = false;
    if(!Password.length >= 8) infoErrors.push("La contraseña tiene que tener mas de 8 caracteres")
    for(let i = 0;i<Password.length;i++){
        if(Password.charCodeAt(i) >= 65 &&Password.charCodeAt(i) <= 90) mayuscula = true;
        else if(Password.charCodeAt(i) >= 48 &&Password.charCodeAt(i) <= 57) numero = true;
    }
    if(mayuscula === false) infoErrors.push("La contraseña tiene que tener mayuscula")
    if(numero === false) infoErrors.push("La contraseña tiene que tener numeros")
    if(Password != Password2) infoErrors.push("Las contraseñas no coinciden")
    if(infoErrors.length != 0) return false
    else return true
}

UserValidate.validateUser = async (user) =>{
    if(user.length >= 4) return await userModel.validateRepeatUser(user)
    else return false
}
UserValidate.validateName = (Name) =>{
    if(!Name.length >= 3) return false
    else return true
}

UserValidate.validateAll = async(req) =>{
    const pass = UserValidate.validatePassword(req.body.password, req.body.password2)
    const name = UserValidate.validateName(req.body.name)
    const user = await UserValidate.validateUser(req.body.userName)


    return new Promise(function (resolve, reject){
        if(pass && name && user && user != "existe") resolve(true)
        else{
            if(user == "existe") resolve("existe")
            else resolve(false)
        } 
    })
}

module.exports = UserValidate