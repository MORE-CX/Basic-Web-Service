const jwt = require('jsonwebtoken');
const app = require('../../server').app
const secretKey = 'yaquisieras'
const hrsQuantity=24

exports.genToken = (data) => {
    return jwt.sign(data, secretKey, { expiresIn: 60 * 60*hrsQuantity })
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
    var token = req.headers.authorization;
    var url = req.url;
    if (url == '/user/guest')
        return next();

    if (!token || !this.verify(token.substring(7)))
        return res.status(401).send('Unauthorized Token');

    if (token&&allowedRoutesByRols(this.decode(token.substring(7)).rol,url))
        return next()

    return res.status(401).send('Unauthorized Token');
}

function allowedRoutesByRols(roles, url) {
    var rols = roles.map(rol => rol._id);

    rol_0_urls = ['/user/guest', '/user/login', '/user/register']
    rol_1 = ['TODO']
    
    if (rol_0.includes(url) && 0 in rols) return true;
    if (rol_1.includes(url) && 1 in rols || rol_1.includes('TODO')) return true;
}

app.use(this.tokenValMidd)