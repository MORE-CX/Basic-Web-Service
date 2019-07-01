const UserController = require('./UserController')
const UserInputFormat = require('./UserInputFormat')
const router = require('express').Router()

router.get('/one/:id', UserController.getById)

router.patch('/one/:id', UserController.update)

router.delete('/one/:id', UserController.delete)

router.get('/all', UserController.getAll)

router.get('/guest',[routeFilter([0])],UserController.loginGuest)

router.post('/login', [UserInputFormat.login,routeFilter([0])], UserController.loginUser)

router.post('/register', UserInputFormat.register, routeFilter([0]),UserController.register)


module.exports = router

function routeFilter(arrayRols){
    return UserController.authRols(arrayRols).filterRols;
}