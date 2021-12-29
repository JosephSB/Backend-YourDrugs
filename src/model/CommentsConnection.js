const mongoose = require('mongoose')
const configDB = require('./config.json')

mongoose.connect(`mongodb://${configDB.mongo.host}/${configDB.mongo.database}`, {useNewUrlParser: true,useUnifiedTopology: true})
  .then(db => console.log('Database connected successful'))
	.catch(err => console.log('Database is not connected'))
