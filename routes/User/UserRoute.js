const UserController = require('./UserController')
const UserInputFormat = require('./UserInputFormat')
const router = require('express').Router()

router.get('/one/:id', UserController.getById)

router.patch('/one/:id', UserController.update)

router.delete('/one/:id', UserController.delete)

router.get('/all', UserController.getAll)

router.get('/guest', UserController.loginGuest)

router.post('/login', UserInputFormat.login ,UserController.loginUser)

router.post('/register', UserInputFormat.register, UserController.register)


module.exports = router