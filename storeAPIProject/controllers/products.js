const Product = require('../models/product');

const getAllProductsStatic = async (request, response) => {


    const products = await Product.find({
        name: '2',
    });
    response.status(200).json({products, nbHits: products.length});
}

const getAllProducts = async (request, response) => {
    const {featured, company, name } = request.query; 
    
    queryObject = {};

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: 'i'};
    }

    console.log(queryObject);

    const products = await Product.find(queryObject);
    response.status(200).json({products, nbHits: products.length});
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}