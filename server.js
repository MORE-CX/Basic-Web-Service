
var app = require('express')();
module.exports.app = app
console.log('Paquetes incluidos\n------------------')

//Middlewares
/* */
require('./config/middlewares/body-parser')
require('./config/middlewares/morgan')
require('./config/middlewares/mongoose')



//Utils
/* */
require('./config/utils/jsonwebtoken')


//Services
/*
require('./services/GeolocalizationService')
*/


//Routes
/* */
require('./routes/RoutesAutoLoader').app




app.listen(3000)