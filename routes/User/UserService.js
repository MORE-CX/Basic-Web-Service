const UserModel = require('../../db/models/UserDbModel')
const to = require('../../config/utils/utilsFunctions').to
const bcrypt = require('bcrypt')
const jwt=require('../../config/utils/jsonwebtoken')

module.exports.existByEmail = async (email) => {
    [err, user] = await to(UserModel.findOne({ email: email }))
    return err || !user ? false : true
}

module.exports.getByEmail = async (email) => {
    [err, user] = await to(UserModel.findOne({ email: email }))
    return err || !user ? false : user
}

module.exports.login = async (email, password) => {
    var userDb = await this.getByEmail(email)
    if (userDb && bcrypt.compareSync(password, userDb.password)) {
        return jwt.generate(userDb,null)
    }else{
        return jwt.generate(null,'password incorrecta')
    }
}


module.exports.findById = async (id) => {
    [err, user] = await to(UserModel.findById(id))
    return err || !user ? false : user
}
