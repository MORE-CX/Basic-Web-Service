const jwt = require('jsonwebtoken');
const secretKey = 'yaquisieras'

exports.genToken=(data)=>{
    return jwt.sign(data, secretKey)
}
exports.verify = (token) => {
    try {
        return jwt.verify(token, secretKey) != "";
    } catch (error) {
        return false
    }
}

exports.decode = (token) => {
    try {
        return jwt.decode(token);
    } catch (error) {
        return false
    }
}

exports.decodeComplete = (token) => {
    try {
        return jwt.decode(token, { complete: true });
    } catch (error) {
        return false
    }
}

exports.tokenValMidd = (req, res, next) => {
    var url = req.url
    if (url != '/user/guest') {
        try{
            var token = req.headers.authorization.substring(7);
            (this.verify(token)) ? next() : res.status(401).send('Unauthorized Token');
        }catch{
            res.status(401).send('Unauthorized Token');
        }   
    }else{
        next()
    }
}