"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const AuthRouter_1 = require("./Routers/AuthRouter");
const indexController_1 = require("./Controllers/indexController");
class RouterConfiguration {
    static factory() {
        if (!this.instance) {
            this.instance = new RouterConfiguration();
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
        this.router.use('/auth', AuthRouter_1.default.factory().router);
        this.router.get('*', indexController_1.default);
    }
}
exports.default = RouterConfiguration;
