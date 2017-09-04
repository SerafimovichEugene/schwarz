"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productsDocumentSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.model('ProductsDocument', productsDocumentSchema);
