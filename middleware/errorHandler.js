
const constants =require('../constants');

const errorhandler = (err, req, res, next) => {
    const statuscode = res.statuscode ? res.statuscode : 500;
    switch(statuscode){
        case constants.VALIDATION_ERROR:
            res.json({title:"Validation Failed" ,message: err.message, stackTrace: err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({title:"Not Found" ,message: err.message, stackTrace: err.stack});
            break;
        case constants.UNAUTHORIZED:
            res.json({title:"UN-AUTHORIZED" ,message: err.message, stackTrace: err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({title:"FORBIDDEN" ,message: err.message, stackTrace: err.stack});
            break;
        case constants.SERVER_ERROR:
            res.json({title:"SERVER-ERROR" ,message: err.message, stackTrace: err.stack});
            break;
        default:
            console.log("NO ERROR...");
            break;
    }
    next();
}

module.exports = errorhandler;