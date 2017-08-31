//types
import { Application, Request, Response, NextFunction } from 'express';

import * as express from 'express';
import { join } from 'path';
import { config } from 'dotenv';
import RouterConfiguration from './routes';

//dotenv configuration:
config();

interface ServerInterface {
    app: Application;
    port: number;
}

interface Options {
    port: number;
}


class Server implements ServerInterface {
    public static factory(opts: Options): Server {
        let { port } = opts;
        if (!this.instance) {
            this.instance = new Server(port);
            return this.instance;
        } else {
            return this.instance;
        }
    }
    public app: Application;
    private static instance: Server;
    constructor(public port: number) {
        this.app = express();
        this.configureServer();
        this.setRouting();
        this.runServer();
    }
    private setRouting(): void {
        this.app.use('/', RouterConfiguration.factory().router);
    }
    private configureServer(): void {
        //static config:
        this.app.use(express.static(join(__dirname, './../public')));
        // view engine setup:
        this.app.set('view engine', 'pug');
        this.app.set('views', __dirname + './../src/server/views');
        //error handler:
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            err.status(404);
            next(err);
        });
    }
    private runServer(): void {
        this.app.listen(this.port, () => {
            console.log(`listen on ${this.port}`);
        });
    }
}
let port: number = +process.env.PORT;
Server.factory({port});
