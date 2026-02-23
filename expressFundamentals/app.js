const express = require('express');
const app = express();
const {products} = require('./data')

app.get(`/`, (request,response) => {
    response.send(`<h1> Home Page </h1> <a href="/api/products">products</a>`)
})

app.get(`/api/products`, (request,response) => {
    const newProducts = products.map(product => {
        const {id, name, image}= product;
        return {id, name, image}
    })

    response.json(newProducts);
})

app.get(`/api/products/:productID`, (request,response) => {
    const {productID} = request.params;
    const singleProduct = products.find((product) => product.id === Number(productID))

    if (!singleProduct) {return response.status(404).send(`Product Does Not Exist`)}

    response.json(singleProduct)
})

app.get('/api/v1/query', (request, response) => {
    const {search, limit} = request.query
    let sortedProducts = [...products]

    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search)
        })
    }

    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }

    if (sortedProducts.length < 1) {
        return response.status(200).json({success: true, data: []})
    }

    response.status(200).json(sortedProducts)
})

app.listen(8000, () => {
    console.log(`Server is listen on port 8000...`)
})