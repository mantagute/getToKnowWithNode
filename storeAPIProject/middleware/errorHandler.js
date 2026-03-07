const errorHandlerMiddleware = (error, request, response, next) => {
    return response.status(500).json({message: "Something Went Wrong, Try Again"});
}

module.exports = errorHandlerMiddleware;