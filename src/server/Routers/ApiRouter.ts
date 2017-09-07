//types
import { Request, Response, Application, NextFunction, Router } from 'express';
import MiddlewareFactory from '../Middleware/MiddlewareFactory';
import getProductsController from '../Controllers/getProductsController';
import getDocumentsController from '../Controllers/getDocumentsController';
import updateProductsController from '../Controllers/updateProductsController';
import addProductsDocumentController from '../Controllers/addProductsDocumentController';
import * as express from 'express';

interface ApiRouterInterface {
    router: Router;
}

export default class ApiRouter implements ApiRouterInterface {
    public router: Router;
    private static instance: ApiRouter;
    public static factory(): ApiRouter {
        if (!this.instance) {
            this.instance = new ApiRouter();
            return this.instance;
        } else {
            return this.instance;
        }
    }
    constructor() {
        this.router = express.Router();
        this.configuration();
    }

    private configuration(): void {
        const guardMiddleware = new MiddlewareFactory().guard();
        this.router.get('/who', (req, res) => {
            if (req.user) {
                res.status(200).json(req.user).end();
            } else {
                res.status(200).json({ 'message': 'you must sign in first' }).end();
            }
        });
        this.router.get('/products', getProductsController);
        this.router.get('/documents', getDocumentsController);
        this.router.post('/products', guardMiddleware, updateProductsController);
        this.router.post('/documents', guardMiddleware, addProductsDocumentController);
    }
}
