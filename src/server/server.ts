//types
import { Application, Request, Response, NextFunction } from 'express';
import { connect, connection } from 'mongoose';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { config } from 'dotenv';
import * as esession from 'express-session';
import * as MongoStore from 'connect-mongo';
import { session, initialize, use, serializeUser, deserializeUser } from  'passport';
import Auth from './Auth/Auth';
import RouterConfiguration from './routes';
import { configurePathToMLab } from '../utils/utils';

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
    private static MongoStore = MongoStore(esession);
    constructor(public port: number) {
        this.app = express();
        this.configureDataBase();
        this.configureServer();
        this.configurePassport();
        this.setRouting();
        this.runServer();
    }
    private configurePassport(): void {
        Auth.factory()._produce().forEach(strategy => {
            if (strategy.strategyName) {
                // console.log('USE', strategy);
                use(strategy.strategyName, strategy.strategyBody);
            } else {
                use(strategy);
            }
        });
        serializeUser((user, cb) => {
            cb(null, user);
        });
        deserializeUser((user, cb) => {
            cb(null, user);
        });
    }
    private setRouting(): void {
        this.app.use('/', RouterConfiguration.factory().router);
    }
    private configureDataBase(): void {
        // mongoose.Promise = Promise;
        connect(configurePathToMLab())
            .then(() => console.log('succesfully connected to mlab'))
            .catch(console.log);
    }
    private configureServer(): void {
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
        this.app.use(cookieParser());
        //static config:
        this.app.use(express.static(join(__dirname, '/../../public')));
        // view engine setup:
        this.app.set('view engine', 'pug');
        this.app.set('views', __dirname + '/../../src/server/views');
        this.app.use(esession({
         	secret: process.env.SESSION_SECRET,
            resave: true,
        	saveUninitialized: true,
          	store: new Server.MongoStore({
          	  mongooseConnection: connection
         	})
        }));
        this.app.use(initialize());
        this.app.use(session());
        //error handler:
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            res.status(404);
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
