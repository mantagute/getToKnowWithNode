const {CustomAPIError} = require('../errors/customErrors');

const errorHandlerMiddleware = (error, request, response, next) => {
    if (error instanceof CustomAPIError) {
        return response.status(error.status).json({message: error.message});
    }
    return response.status(500).json({message: "Something Went Wrong, Try Again"});
}

module.exports = errorHandlerMiddleware;