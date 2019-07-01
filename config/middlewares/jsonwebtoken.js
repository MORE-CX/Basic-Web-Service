const jwt = require('jsonwebtoken');
const app = require('../../server').app
const secretKey = 'yaquisieras'
const hrsQuantity = 24

exports.genToken = (data) => {
    return jwt.sign(data, secretKey, { expiresIn: 60 * 60 * hrsQuantity })
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
    if (url == '/user/guest'){
        req.body['roles'] = [0]
        return next();}

    if (!token)
        return res.status(401).send('Missing Token');

    if (!this.verify(token.substring(7)))
        return res.status(401).send('Unauthorized Token');

    if (token){
        var rols = (this.decode(token.substring(7)).rol).map(rol => rol._id)
        req.body['roles'] = rols
        return next()
    }

    return res.status(401).send('Unauthorized Token');
}

/*function allowedRoutesByRols(roles, url) {
    var rols = roles.map(rol => rol._id);

    rol_0_urls = ['/user/guest', '/user/login', '/user/register'];
    rol_1_urls = ['TODO'];

    if (rol_0_urls.includes(url) && 0 in rols) return true;
    if (rol_1_urls.includes(url) && 1 in rols || rol_1_urls.includes('TODO')) return true;
}
*/

app.use(this.tokenValMidd)