const UserModel = require('../../db/models/UserDbModel')
const to = require('../../config/utils/utilsFunctions').to
const bcrypt = require('bcrypt')
const jwt = require('../../config/middlewares/jsonwebtoken')
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
    return res.send(Response(err || !user ? false : user, err.message));
}

exports.getAll = async (req, res) => {
    [err, users] = await to(UserModel.find({}));
    if (err)
        return res.send(Response(null, err.message));

    allUsers = users.map((user) => { return { id: user.id, email: user.email } });
    return res.send(Response(allUsers, null));
}

exports.loginUser = async (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    var userDb = await this.getByEmail(email);
    var match = bcrypt.compareSync(password, userDb.password);
    if (userDb && match) {
        var userJson = {
            rol: [{ _id: 1, name: 'user' }],
            email: userDb.email,
        }
        return res.send(Response({ token: jwt.genToken(userJson) }));
    }
    return res.send(Response(null, { Password: 'Incorrect password.' }));

}

exports.loginGuest = (req, res, next) => {
    return res.send(Response({ Token: jwt.genToken({ rol: [{ _id: 0, name: 'guest' }] }) }));
}

exports.register = async (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    if (await this.existByEmail(email))
        return res.send(Response(null, { Email: 'There is already a user with such email.' }));
    var hash = bcrypt.hashSync(password, 10);
    [err, result] = await to(UserModel.insertMany([{ email: email, password: hash }]))
    if (!err && result)
        return this.loginUser(req, res, next)
    return res.send(Response(null, err.message));
}

exports.update = async (req, res, next) => {
    var id = req.params.id;
    jsonUpdate = {};
    if (req.body.email) jsonUpdate['email'] = req.body.email;
    if (req.body.password) jsonUpdate['password'] = bcrypt.hashSync(req.body.password, 10);
    [err, user] = await to(UserModel.findByIdAndUpdate(id, jsonUpdate, { new: true }));
    return res.send(Response(err || !user ? false : true, err.message));
}

exports.delete = async (req, res, next) => {
    var id = req.params.id;
    [err, user] = await to(UserModel.findByIdAndDelete(id));
    return res.send(Response(err || !user ? false : true, err.message));
}
let authRoles;

exports.authRols=(arrayRoles)=>{
    this.authRoles=arrayRoles;
    return this;
}

exports.filterRols = (req,res,next) => {
    return (req.body.roles).every(r=>this.authRoles.includes(r))?next():res.status(401).send('Unauthorized token.');
}