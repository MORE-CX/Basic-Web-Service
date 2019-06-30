let Validator = require("fastest-validator");
const Response = require('../../config/class/Response')
const emailCheck = require('email-check')

let v = new Validator();


const register = {
    email: {
        type: "email",
        messages: {
            email: "What is entered does not correspond with an email."
        }
    },
    password: {
        type: "string",
        min: 6,
        messages: {
            string: "What is entered does not correspond with an password"
        }
    }
}


const login={
    email: {
        type: "email",
        messages: {
            email: "What is entered does not correspond with an email."
        }
    },
    password: {
        type: "string",
        min: 6,
        messages: {
            string: "What is entered does not correspond with an password."
        }
    }
}

exports.register = async (req, res, next) => {

    var result = (v.validate({ email: req.body.email, password: req.body.password }, register));

    if (result != true)
        return res.send(Response(null, formatfilterErrors(result)));
    /*
        var existEmail=await emailCheck(req.body.email);
        if (!existEmail)
            return res.send(Response(null, [{ email: ['Invalid email.'] }]));
    */
    return next();
}


exports.login=async(req,res,next)=>{
    
    var result = v.validate({email:req.body.email,password:req.body.password},login)
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
