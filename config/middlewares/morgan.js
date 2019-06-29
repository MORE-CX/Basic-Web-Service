var morgan = require('morgan')
var app = require('../../server').app


app.use(morgan('tiny'))

