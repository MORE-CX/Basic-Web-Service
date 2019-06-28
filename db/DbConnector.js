const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:/api-basic', {useNewUrlParser: true});
module.exports=mongoose
