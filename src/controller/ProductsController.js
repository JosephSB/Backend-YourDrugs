const products = require('../assets/products.json')
const ProductsController = () => {}

ProductsController.getAllProducts = (req,res) =>{
    res.json(products.Productos)
}

ProductsController.getOneProduct = async (req,res) =>{
    let encontrado = false
    await products.Productos.map((product) =>{
        if(product.name.toLocaleLowerCase() == req.params.name.toLocaleLowerCase() && !encontrado){
            res.json(product)
            encontrado = true
        } 
    })
    if(!encontrado) res.json({err: "No existe ese producto"})
}

module.exports = ProductsController