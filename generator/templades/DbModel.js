const fs = require('fs');

exports.createDbModel=(routeName,varsAndTypes)=>{
    var modelName=routeName;
    var variables="";
    (varsAndTypes).forEach(element => {
        variables=variables+element[0]+":"+element[1]+",";
    });

    var textForFile=`
    const mongoose=require('../DbConnector');
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;
    
    const ${modelName}Schema = new Schema({
        ${variables}
    },{collection:'${modelName}'});
    
    const ${modelName}DbModel=mongoose.model('${modelName}',${modelName}Schema);
    module.exports=${modelName}DbModel;
    `;
    fs.writeFile(`./db/models/${modelName}DbModel.js`, textForFile, function (err) {
        if (err) throw err;
        console.log(`Created: ${modelName}DbModel.js`);
      });
}