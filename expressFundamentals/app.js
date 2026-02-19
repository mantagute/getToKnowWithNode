const http = require('http');
const {readFileSync} = require('fs');

const homePage = readFileSync('./index.html')

const server = http.createServer((request, response) => {
    const url = request.url

    if (url === '/') {
        response.writeHead(200, {'content-type':'text/html'})
        response.end(homePage)
    }
    else if (url === '/about') {
        response.writeHead(200, {'content-type':'text/html'})
        response.end('<h1>About page</h1>')
    }
    else {
        response.writeHead(404, {'content-type':'text/html'})
        response.end('<h1>Page not found</h1>')
    }

})

server.listen(8000)