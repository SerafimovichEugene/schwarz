"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_simple_1 = require("jwt-simple");
const User_1 = require("../models/User");
class MiddlewareFactory {
    guard() {
        const guardMiddleware = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let userFromToken = jwt_simple_1.decode(req.cookies.token, process.env.JWT_SECRET_ADMIN);
                let adminUser = yield User_1.default.findOne({ login: userFromToken.login });
                if (adminUser.isAdmin) {
                    next();
                }
            }
            catch (error) {
                console.log('middleware error');
                res.status(200).json({ message: 'You cant always get what you want' }).end();
            }
        });
        return guardMiddleware;
    }
}
exports.default = MiddlewareFactory;
