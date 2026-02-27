const express = require('express');
const app = express();
const logger = require('./logger');
const authorize = require('./authorize');

app.use([logger, authorize])

app.get('/', (request, response) => {
    response.send('Home');
})

app.get('/about', (request, response) => {
    response.send('About');
})

app.get('/api/products', (request, response) => {
    response.send('Products');
})

app.get('/api/items', (request, response) => {
    response.send('Items');
})

app.listen(8000, () => {
    console.log(`Server is listen on port 8000...`)
})