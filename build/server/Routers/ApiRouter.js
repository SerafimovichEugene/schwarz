"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MiddlewareFactory_1 = require("../Middleware/MiddlewareFactory");
const updateProductsController_1 = require("../Controllers/updateProductsController");
const addProductsDocumentController_1 = require("../Controllers/addProductsDocumentController");
const express = require("express");
class ApiRouter {
    static factory() {
        if (!this.instance) {
            this.instance = new ApiRouter();
            return this.instance;
        }
        else {
            return this.instance;
        }
    }
    constructor() {
        this.router = express.Router();
        this.configuration();
    }
    configuration() {
        const guardMiddleware = new MiddlewareFactory_1.default().guard();
        this.router.get('/who', (req, res) => {
            if (req.user) {
                res.status(200).json(req.user).end();
            }
            else {
                res.status(200).json({ 'message': 'you must sign in first' }).end();
            }
        });
        this.router.post('/products', guardMiddleware, updateProductsController_1.default);
        this.router.post('/documents', guardMiddleware, addProductsDocumentController_1.default);
    }
}
exports.default = ApiRouter;
