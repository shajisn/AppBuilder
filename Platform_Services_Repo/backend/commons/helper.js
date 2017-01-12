function convertArrayToObjectById(array){
    var returnObj = {};
    array.forEach(function(obj){
        returnObj[obj.id] = obj;
    });
    return returnObj;
}

module.exports = {
    convertArrayToObjectById: convertArrayToObjectById
}