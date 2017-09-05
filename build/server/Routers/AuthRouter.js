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
const express = require("express");
const passport_1 = require("passport");
const jwt_simple_1 = require("jwt-simple");
const User_1 = require("../models/User");
const Auth_1 = require("../Auth/Auth");
class AuthRouter {
    static factory() {
        if (!this.instance) {
            this.instance = new AuthRouter();
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
        const authenticateMiddle = (req, res, next) => {
            const { provider } = req.params;
            console.log('FROM authenticateMiddle', provider);
            const options = Auth_1.default.factory()._produce().options[provider] || null;
            const authenticator = passport_1.authenticate(provider, options);
            authenticator(req, res, next);
        };
        const authRedirect = (req, res, next) => {
            // console.log('FROM CALLBACK', req.user);
            // console.log('SESSION', req.session);
            if (req.originalUrl.indexOf('callback')) {
                res.cookie('canFetchUser', true);
            }
            addJWTTokenForAdmin(req, res, next);
        };
        const logOut = (req, res) => {
            req.logout();
            res.clearCookie('token');
            res.clearCookie('canFetchUser');
            res.redirect('/');
        };
        const verify = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            let incomeUser = jwt_simple_1.decode(token, process.env.JWT_SECRET);
            let dbuser = null;
            try {
                dbuser = yield User_1.default.findOneAndUpdate({ email: incomeUser.email }, { isVerifed: true });
                res.redirect('/');
            }
            catch (error) {
                console.log(error);
                res.redirect('/');
            }
        });
        const addJWTTokenForAdmin = (req, res, next) => {
            if (req.user.isAdmin) {
                const token = jwt_simple_1.encode(req.user, process.env.JWT_SECRET_ADMIN);
                res.cookie('token', token);
            }
            if (req.cookies.fromUrl) {
                res.redirect(req.cookies.fromUrl);
            }
            else {
                res.redirect('/');
            }
        };
        this.router.get('/logout', logOut);
        this.router.get('/:provider', authenticateMiddle);
        this.router.get('/:provider/callback', authenticateMiddle, authRedirect);
        this.router.get('/verify/:token', verify);
        this.router.post('/signup', passport_1.authenticate('local-signup', {
            // successRedirect : '/',
            failureRedirect: '/signup'
        }), (req, res, next) => {
            res.cookie('canFetchUser', true);
            next();
        }, addJWTTokenForAdmin);
        this.router.post('/signin', passport_1.authenticate('local-signin', {
            // successRedirect : '/',
            failureRedirect: '/signin'
        }), (req, res, next) => {
            res.cookie('canFetchUser', true);
            next();
        }, addJWTTokenForAdmin);
    }
}
exports.default = AuthRouter;
