const fs = require('fs');

exports.createController = async (routeName,varsAndTypes) => {
    var modelName = routeName;

    var varAsigg="";
    (varsAndTypes).forEach(element => {
        varAsigg=varAsigg+element[0]+"=req.body."+element[0]+";";
    });
    var varJson="";
    (varsAndTypes).forEach(element => {
        varJson=varJson+element[0]+":"+element[0]+",";
    });


    var textForFile = `
    const ${modelName}Model = require('../../db/models/${modelName}DbModel')
    const to = require('../../config/utils/utilsFunctions').to
    const Response = require('../../config/class/Response')
    
    exports.getById = async (req, res, next) => {
        id = req.params.id;
        [err, ${modelName}] = await to(${modelName}Model.findOne({ _id: id }));
        return res.send(Response(err || !${modelName} ? false : ${modelName}, err.message));
    }
    
    exports.getAll = async (req, res,next) => {
        [err, ${modelName}s] = await to(${modelName}Model.find({}));
        if (err)
            return res.send(Response(null, err.message));
        return res.send(Response(${modelName}s, null));
    }
    
    exports.create = async (req, res, next) => {
        ${varAsigg}
        [err, result] = await to(${modelName}Model.insertMany([{${varJson}}]))
        return res.send(Response(err ? false : true, err.message));
    }
    
    exports.update = async (req, res, next) => {
        var id = req.params.id;
        ${varAsigg}
        [err, ${modelName}] = await to(${modelName}Model.findByIdAndUpdate(id, {${varJson}}, { new: true }));
        return res.send(Response(err || !${modelName} ? false : true, err.message));
    }
    
    exports.delete = async (req, res, next) => {
        var id = req.params.id;
        [err, ${modelName}] = await to(${modelName}Model.findByIdAndDelete(id));
        return res.send(Response(err || !${modelName} ? false : true, err.message));
    }
    let authRoles;

    exports.authRols=(arrayRoles)=>{
        this.authRoles=arrayRoles;
        return this;
    }

    exports.filterRols = (req,res,next) => {
        return (req.body.roles).every(r=>this.authRoles.includes(r))?next():res.status(401).send('Unauthorized token.');
    }
    `;



    await fs.writeFile(`./routes/${modelName}/${modelName}Controller.js`, textForFile, function (err) {
        if (err) throw err;
        console.log(`Created: ${modelName}Controller.js`);
    });
}


