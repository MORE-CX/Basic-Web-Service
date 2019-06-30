exports.exist=(array,key)=>{
    return (key in array) ? array[key] : null;
}
exports.isNull=(variable)=>{
    return variable==null
}