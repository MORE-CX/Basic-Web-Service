const fs = require('fs');

exports.createInputFormat=async (routeName)=>{
    var modelName=routeName;

    

    var textForFile=`
    let Validator = require("fastest-validator");
const Response = require('../../config/class/Response')

let v = new Validator();


const create${modelName} = {
}

const update${modelName} = {
}




exports.create=async(req,res,next)=>{
    
    var result = v.validate({},create${modelName})
    if (result != true)
        return res.send(Response(null, formatfilterErrors(result)));
    return next()
}


exports.update=async(req,res,next)=>{
    
    var result = v.validate({},create${modelName})
    if (result != true)
        return res.send(Response(null, formatfilterErrors(result)));
    return next()
}


function formatfilterErrors(errors) {
    errorsFiltered = {};
    errs = [];
    errors.forEach(element => {
        if (Array.isArray(element)) {
            element.message.forEach(e => { errs.push(e) })
        } else {
            errs = [element.message]
        }
        errorsFiltered[element.field] = errs;
    });
    return errorsFiltered;
}



    `;



    await fs.writeFile(`./routes/${modelName}/${modelName}InputFormat.js`, textForFile, function (err) {
        if (err) throw err;
        console.log(`Created: ${modelName}InputFormat.js`);
      });
}