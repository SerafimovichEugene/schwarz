"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path_1 = require("path");
const dotenv_1 = require("dotenv");
const esession = require("express-session");
const passport_1 = require("passport");
const Auth_1 = require("./Auth/Auth");
const routes_1 = require("./routes");
const utils_1 = require("../utils/utils");
//dotenv configuration:
dotenv_1.config();
class Server {
    constructor(port) {
        this.port = port;
        this.app = express();
        this.configureDataBase();
        this.configureServer();
        this.configurePassport();
        this.setRouting();
        this.runServer();
    }
    static factory(opts) {
        let { port } = opts;
        if (!this.instance) {
            this.instance = new Server(port);
            return this.instance;
        }
        else {
            return this.instance;
        }
    }
    configurePassport() {
        Auth_1.default.factory()._produce().forEach(strategy => {
            if (strategy.strategyName) {
                // console.log('USE', strategy);
                passport_1.use(strategy.strategyName, strategy.strategyBody);
            }
            else {
                passport_1.use(strategy);
            }
        });
        passport_1.serializeUser((user, cb) => {
            cb(null, user);
        });
        passport_1.deserializeUser((user, cb) => {
            cb(null, user);
        });
    }
    setRouting() {
        this.app.use('/', routes_1.default.factory().router);
    }
    configureDataBase() {
        // mongoose.Promise = Promise;
        mongoose_1.connect(utils_1.configurePathToMLab())
            .then(() => console.log('succesfully connected to mlab'))
            .catch(console.log);
    }
    configureServer() {
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cookieParser());
        //static config:
        this.app.use(express.static(path_1.join(__dirname, '/../../public')));
        // view engine setup:
        this.app.set('view engine', 'pug');
        this.app.set('views', __dirname + '/../../src/server/views');
        this.app.use(esession({
            secret: process.env.SESSION_SECRET,
            saveUninitialized: true,
            resave: true,
        }));
        this.app.use(passport_1.initialize());
        this.app.use(passport_1.session());
        //error handler:
        this.app.use((err, req, res, next) => {
            err.status(404);
            next(err);
        });
    }
    runServer() {
        this.app.listen(this.port, () => {
            console.log(`listen on ${this.port}`);
        });
    }
}
let port = +process.env.PORT;
Server.factory({ port });
