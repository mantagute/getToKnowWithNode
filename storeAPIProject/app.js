require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');

const productsRouter = require('./routes/products');

const notFound = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

//middleware

app.use(express.json());

//routes

app.get('/', (request, response) => {
    response.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>');
})

app.use('/api/v1/products', productsRouter);

// products route

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8080;

const start = async () => {
    try {
        await connectDB(process.env.STORE_API_MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error)
    }
}

start();
