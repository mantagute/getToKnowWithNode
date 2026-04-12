const Product = require('../models/product');

const getAllProductsStatic = async (request, response) => {


    const products = await Product.find({
        name: '2',
    });
    response.status(200).json({products, nbHits: products.length});
}

const getAllProducts = async (request, response) => {
    const {featured, company, name, sort} = request.query; 
    
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

    let result = Product.find(queryObject);

    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    else {
        result = result.sort('createdAt');
    }

    const products = await result;

    response.status(200).json({products, nbHits: products.length});
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}