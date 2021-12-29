const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()
const publicDir = express.static(path.join(__dirname + '/public'))

/*-----------Settings------------*/
app.set('port', process.env.PORT || 3000)

/*----------Middlewares----------*/
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(publicDir)
/*-------------Routes------------*/

app.get('/', (req,res)=>{
    res.send('API OF YOURDROGS')
})
app.use('/api/products', require('./routes/products'))
app.use('/api/comments', require('./routes/comments'))
app.use('/api/Users', require('./routes/Users'))

module.exports = app