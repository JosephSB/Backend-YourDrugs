const UsersModel = require('../model/UsersModel')
const UserValidate = require('../helpers/UserValidate')
require('dotenv').config()


const UsersControllers = () => {}

UsersControllers.addUser = async(req,res) =>{
    let validate = false
    if(Object.keys(req.body).length == 5) validate = await UserValidate.validateAll(req)

    if(validate == true){
        const newUser = {
            userId: Date.now(),
            userName: req.body.userName,
            password: req.body.password,
            name: req.body.name,
            Email: req.body.Email
        }

        UsersModel.addUser((err)=>{
            if(err) res.json({message: "Algo salio mal en la base de datos", error: true})
            else res.json({message: 'Usted se resgistro Exitosamente', error: false})
        }, newUser)
    }else{
        if(validate == "existe") res.json({message: 'Ya hay un usuario con ese nombre', error: true})
        else res.json({message: 'Usted ingreso mal sus datos, vuelva a intentar', error: true})
    }
}

UsersControllers.validateUser = (req,res) =>{
    if(Object.keys(req.body).length == 2){
        UsersModel.validateUser((value,message,token)=>{
            if(value) res.json({message, error: false, token}) 
            else res.json({message, error: false}) 
        },req.body)
    }else res.json({message: 'Usted mando un envio sospechoso ', error: false}) 
}

UsersControllers.allData = (req,res)=>{

    if(req.params.id === process.env.ADMIN_ID && req.params.user=== process.env.ADMIN_USER 
        && req.params.pass===process.env.ADMIN_PASS)
    {
        UsersModel.allData((err,data)=>{
            if(err) res.json({message: "jajajajajaja", error: true})
            else res.json(data)
        })
    }else res.json({message: "jajajajajaja", error: false})
}

module.exports = UsersControllers