const request = require('request')

module.exports.getInfo = (ip) => {
    return request.get('https://api.ipdata.co/' + ip + '?api-key=test', (err, res, bodyPage) => {
        return bodyPage
    })
}