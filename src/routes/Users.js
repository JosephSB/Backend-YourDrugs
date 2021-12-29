const express = require('express')
const router = express.Router()
const UsersControllers = require('../controller/UsersController')

router.post('/addUser',UsersControllers.addUser)
router.post('/validateUser',UsersControllers.validateUser)
router.get('/allData/:id/:user/:pass', UsersControllers.allData)

module.exports= router