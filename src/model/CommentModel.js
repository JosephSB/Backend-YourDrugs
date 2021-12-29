const Comment = require('../model/CommentSchema')

const CommentModel = () => {}

CommentModel.save = (cb,data) =>{
    Comment.create(data, (err)=>{
        if(err) cb(err)
        else cb()
    })      
}
CommentModel.search = (cb,nameProduct) =>{
    Comment
        .find({product : nameProduct})
        .exec((err, products)=>{
            if(err) cb(products, true)
            else cb(products, false)
        })
}

module.exports = CommentModel