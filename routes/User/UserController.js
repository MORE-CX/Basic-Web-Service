const UserModel = require('../../db/models/UserDbModel')
const to = require('../../config/utils/utilsFunctions').to
const tc = require('../../config/utils/utilsFunctions').tc
const bcrypt = require('bcrypt')
const jwt = require('../../config/utils/jsonwebtoken')
const Response = require('../../config/class/Response')

exports.existByEmail = async (email) => {
    [err, user] = await to(UserModel.findOne({ email: email }));
    return err || !user ? false : true;
}

exports.getByEmail = async (email) => {
    [err, user] = await to(UserModel.findOne({ email: email }));
    return err || !user ? false : user;
}

exports.getById = async (req, res, next) => {
    id = req.params.id;
    [err, user] = await to(UserModel.findOne({ _id: id }));
    return res.send(Response(err || !user ? false : user,err.message));
}


exports.getAll = async (req, res) => {
    [err, users] = await to(UserModel.find({}));
    return res.send(Response(err || !users ? false : users,err.message));
}


exports.loginUser = async (req, res, next) => {
    email = req.body.email
    password = req.body.password
    var userDb = await this.getByEmail(email)
    if (userDb && bcrypt.compareSync(password, userDb.password)) {
        var userJson = {
            Rol: [{ _id: 1, name: 'User' }],
            Email: userDb.email,
        }
        return res.send(Response({ Token: jwt.genToken(userJson) }));
    } else {
        return res.send(Response(null, { Password: 'Incorrect password.' }));
    }
}

exports.loginGuest = (req, res, next) => {
    return res.send(Response({ Token: jwt.genToken({ Rol: [{ _id: 0, name: 'Guest' }] }) }));
}

exports.register = async (req, res, next) => {
    var email = req.body.email
    var password = req.body.password
    if (await this.existByEmail(email)) {
        return res.send(Response(null, { Email: 'There is already a user with such email' }));
    }
    var hash = bcrypt.hashSync(password, 10);
    [err, result] = await to(UserModel.insertMany([{ email: email, password: hash }]))
    if (!err && result) {
        return this.loginUser(req, res)
    }
}

exports.update = async (req, res, next) => {
    var id = req.params.id;
    jsonUpdate = {};
    if (req.body.email) jsonUpdate['email'] = req.body.email;
    if (req.body.password) jsonUpdate['password'] = bcrypt.hashSync(req.body.password, 10);
    [err, user] = await to(UserModel.findByIdAndUpdate(id, jsonUpdate, { new: true }));
    return res.send(Response(err || !user ? false : true,err.message));
}
exports.delete = async (req, res, next) => {
    var id = req.params.id;
    [err, user] = await to(UserModel.findByIdAndDelete(id,));
    return res.send(Response(err || !user ? false : true,err.message));
}