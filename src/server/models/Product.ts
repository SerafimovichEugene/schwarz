import { Schema, model, Document, Model } from 'mongoose';

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    order: {
        type: Boolean,
        required: true,
    },
    purchasePrice: {
        type: String,
        required: true
    },
    crossPrice: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    articulCode: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    index: {
        type: Number,
        required: true,
    }
});

export default model('Product', productSchema);
