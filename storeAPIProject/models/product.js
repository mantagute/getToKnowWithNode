const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please, provide product name"]
    },
    price: {
        type: Number, 
        required: [true, "Please, provide product price"]
    },
    feature: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number, 
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported',
        }
        // enum: ['ikea', 'liddy', 'caressa', 'marcos'],
    }
});

module.exports = mongoose.model('Product', productSchema);