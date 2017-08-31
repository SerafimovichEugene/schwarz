//types
import { Request, Response, Application, NextFunction, Router } from 'express';

import * as express from 'express';
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
        this.router.get('*', indexController);
    }
}
