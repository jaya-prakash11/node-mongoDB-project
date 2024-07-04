const constants = require('../constants')
const errorHandeler = (err, req, res, next ) =>{
    let statusCode = req.statusCode || 500

    // console.log('eree' ,err.message)

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({title :'validation Failed', message: err.message , stackTrace: err.stack})
            break;

            case constants.NOT_FOUND:
            res.json({title :'Not found', message: err.message, stackTrace: err.stack})
            break;

            case constants.UNAUTHORIZED:
            res.json({title :'unauthorized', message: err.message, stackTrace: err.stack})
            break;

            case constants.FORBIDDEN:
            res.json({title :'forbidden', message: err.message, stackTrace: err.stack})
            break;

            case constants.SERVER_ERROR:
            res.json({title :'server error', message: err.message, stackTrace: err.stack})
            break;


            default:
            break;
    }

    
}

module.exports = errorHandeler;