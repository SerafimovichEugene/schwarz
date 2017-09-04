//types
import { Request, Response, Application, NextFunction, Router } from 'express';
import * as express from 'express';
import AuthRouter from './Routers/AuthRouter';
import ApiRouter from './Routers/ApiRouter';
import indexController from './Controllers/indexController';

interface RouterConfigurationInterface {
    router: Router;
}

export default class RouterConfiguration implements RouterConfigurationInterface {
    public router: Router;
    private static instance: RouterConfiguration;
    public static factory(): RouterConfiguration {
        if (!this.instance) {
            this.instance = new RouterConfiguration();
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
        this.router.use('/auth', AuthRouter.factory().router);
        this.router.use('/api/v1.0.0', ApiRouter.factory().router);
        this.router.get('*', indexController);
    }
}
