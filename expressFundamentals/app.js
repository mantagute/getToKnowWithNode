const express = require('express');

const app = express()

app.get('/',(request, response) => {
    console.log('user hit the resource')
    response.status(200).send('Home Page')
})

app.get('/about', (request, response) => {
    response.status(200).send('About Page')
})

app.use((request, response) => {
    response.status(404).send('<h1>Resource Not Found</h1>')
})

app.listen(8000, () => {
    console.log('server is listening on port 8000...')
})