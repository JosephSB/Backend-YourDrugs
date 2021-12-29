const products = require('../assets/products.json')
const Validate = () => {}

Validate.Comment = (data) =>{
    let errors = 0
    let encontrado = false

    const {userId, product, userName, score, hour, comment} = data;
    if(comment.length > 200) errors++
    products.Productos.map((item) =>{
        if(item.name.toLocaleLowerCase() == product.toLocaleLowerCase() && !encontrado) encontrado = true
    })
    if(!encontrado) errors++
    if(score > 5) errors++

    if(errors > 0) return false
    else return true
} 

module.exports = Validate