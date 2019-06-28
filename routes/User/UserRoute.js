const UserService = require('./UserService')
const router = require('express').Router()

router.get('/:id', function (req, res, next) {
    id=req.params.id
    console.log(id)
    UserService.findById(id).then(val => {
        res.send(val)
    })
})

router.post('/login', function (req, res, next) {
    email=req.body.email
    password=req.body.password
    console.log(req.body)
    UserService.login(email,password).then(val => {
        res.send(val)
    })
})

module.exports = router