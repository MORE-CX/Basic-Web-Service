const jwt = require('jsonwebtoken');
const secretKey = 'yaquisieras'
const expirateMins = 60


module.exports.generate = (data = '', err = '') => {
    var info = {}
    if (data != null && data != '') info['data'] = data
    if (err != null && err != '') info['err'] = err

    return jwt.sign(info, secretKey
    )
}

module.exports.verify = (token) => {
    try {
        return jwt.verify(token, secretKey) != "";
    } catch (error) {
        return false
    }
}

module.exports.decode = (token) => {
    try {
        return jwt.decode(token);
    } catch (error) {
        return false
    }
}

module.exports.decodeComplete = (token) => {
    try {
        return jwt.decode(token, { complete: true });
    } catch (error) {
        return false
    }
}
