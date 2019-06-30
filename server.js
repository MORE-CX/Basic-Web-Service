
var app = require('express')();
exports.app = app

//Middlewares
require('./config/middlewares/body-parser')
require('./config/middlewares/morgan')
require('./config/middlewares/mongoose')
require('./config/middlewares/jsonwebtoken')




//Services
/*
require('./services/GeolocalizationService')
*/


//Routes
require('./routes/RoutesAutoLoader').app




app.listen(3000,console.log('--------------------------------------'))