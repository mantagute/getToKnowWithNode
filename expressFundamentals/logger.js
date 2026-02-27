const logger = (request,response,next) => {
    const method = request.method;
    const url = request.url
    const time = new Date().getFullYear()
    console.log(method, url, time)
    next()
}

module.exports = logger