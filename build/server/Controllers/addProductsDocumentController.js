"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductsDocument_1 = require("../models/ProductsDocument");
const addProductsDocumentController = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { Application, Author, LastAuthor, CreatedDate, ModifiedDate, SheetNames, Worksheets, } = req.body.Props;
        const documentParams = {
            Application,
            Author,
            LastAuthor,
            CreatedDate,
            ModifiedDate,
            SheetNames,
            numOfSheets: Worksheets,
        };
        let productsDocument = new ProductsDocument_1.default(documentParams);
        yield productsDocument.save();
        res.status(200).end();
    }
    catch (error) {
        console.log('FROM addProductsDocumentController error', error);
        res.status(500).end();
    }
});
exports.default = addProductsDocumentController;
