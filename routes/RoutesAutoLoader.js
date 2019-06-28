const fs = require('fs')
const app = require('../server').app

fs.readdirSync('./routes').forEach(function (name) {
    if (name != 'RoutesAutoLoader.js') {
        var routeFolder = './' + name + '/' + name + 'Route';
        router=require(routeFolder)
        app.use('/'+name, router)
    }
});

