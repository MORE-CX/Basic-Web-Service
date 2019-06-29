
module.exports.to = (promise) => {
   return promise.then(data => {
      return [null, data];
   }).catch(err => [err]);
}

exports.tc = (func) => {
   try {
      return func
   }
   catch (err) { return err }
}