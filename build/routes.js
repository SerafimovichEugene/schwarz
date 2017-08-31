"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
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
        this.router.get('*', indexController_1.default);
    }
}
exports.default = RouterConfiguration;
