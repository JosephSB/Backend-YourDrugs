const CommentModel = require('../model/CommentModel')
const jwt = require('jsonwebtoken');
const Validate = require('../helpers/Validate')

const CommentController = () => {}

CommentController.saveCommet = (req,res) =>{
    if(Validate.Comment(req.body)){
        //verifico si el token existe
        jwt.verify(req.token, process.env.SECRET_KEY, (error, authData) => {
            if(error){
                res.json({message: "NO ESTAS REGISTRADO", error: true})
            }else{
                const data = {
                    userId: authData.user.id, 
                    product: req.body.product, 
                    userName: authData.user.userName, 
                    score: req.body.score, 
                    hour: req.body.hour, 
                    comment: req.body.comment
                }
                CommentModel.save((err)=>{
                    if(err) res.json({message: "Algo salio mal en la base de datos", error: true})
                    else res.json({message: 'New Comment added', error: false})
                }, data)
            }
        });
    }else res.json({message: "Los datos ingresados son erroneos", error: true})
}
CommentController.searchCommets = (req,res) =>{
    CommentModel.search((product, err)=>{
        if(err) res.json({message: "Algo salio mal en la base de datos", error: true})
        else {
            if(product.length == 0) res.json({message: "No se encontro comentarios", error: true})
            else res.json(product)
        }
    }, req.params.nameProduct)
}

module.exports = CommentController
