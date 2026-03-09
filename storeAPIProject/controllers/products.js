const getAllProductsStatic = async (request, response) => {
    response.status(200).json({message: "products testing route"});
}

const getAllProducts = async (request, response) => {
    response.status(200).json({message: "products route"});
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}