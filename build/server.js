"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path_1 = require("path");
const dotenv_1 = require("dotenv");
const routes_1 = require("./routes");
//dotenv configuration:
dotenv_1.config();
class Server {
    constructor(port) {
        this.port = port;
        this.app = express();
        this.configureServer();
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
    setRouting() {
        this.app.use('/', routes_1.default.factory().router);
    }
    configureServer() {
        //static config:
        this.app.use(express.static(path_1.join(__dirname, './../public')));
        // view engine setup:
        this.app.set('view engine', 'pug');
        this.app.set('views', __dirname + './../src/server/views');
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
