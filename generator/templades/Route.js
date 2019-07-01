const fs = require('fs');

exports.createRoute=async (routeName)=>{
    var modelName=routeName;

    

    var textForFile=`
    const ${modelName}Controller = require('./${modelName}Controller');
    const ${modelName}InputFormat = require('./${modelName}InputFormat');
    const router = require('express').Router();
    
    //By default only a user (rol 1) can get,update,create,delete a ${modelName}

    router.get('/one/:id',[routeFilter([1])] ,${modelName}Controller.getById);
    
    router.patch('/one/:id',[routeFilter([1])] ,${modelName}InputFormat.update ,${modelName}Controller.update);

    router.post('/one/:id',[routeFilter([1])] ,${modelName}InputFormat.create ,${modelName}Controller.create);
    
    router.delete('/one/:id',[routeFilter([1])] ,${modelName}Controller.delete);
    
    router.get('/all', ${modelName}Controller.getAll);
    
    
    module.exports = router;


    function routeFilter(roles){
      return ${modelName}Controller.authRols(roles).filterRols;
  }
    `;


    await fs.mkdirSync(`./routes/${modelName}`);

    await fs.writeFile(`./routes/${modelName}/${modelName}Route.js`, textForFile, function (err) {
        if (err) throw err;
        console.log(`Created: ${modelName}Route.js`);
      });
}