"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
    }
});
exports.default = mongoose_1.model('Product', productSchema);
