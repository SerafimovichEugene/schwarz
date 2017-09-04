import { Schema, model, Document, Model } from 'mongoose';

const productsDocumentSchema = new Schema({
    Application: {
        type: String,
        required: false,
    },
    Author: {
        type: String,
        required: false,
    },
    LastAuthor: {
        type: String,
        required: false,
    },
    CreatedDate: {
        type: String,
        required: true
    },
    ModifiedDate: {
        type: String,
        required: false,
    },
    SheetNames: {
        type: Array,
        required: true
    },
    numOfSheets: {
        type: Number,
        required: true
    }
});

export default model('ProductsDocument', productsDocumentSchema);
