"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport_1 = require("passport");
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
            console.log('FROM CALLBACK', req.user);
            console.log('SESSION', req.session);
            const returnUrl = '/';
            res.redirect(returnUrl);
        };
        const logOut = (req, res) => {
            console.log('LOGOUT');
            req.logout();
            res.redirect('/');
        };
        this.router.get('/logout', logOut);
        this.router.get('/:provider', authenticateMiddle);
        this.router.get('/:provider/callback', authenticateMiddle, authRedirect);
        this.router.post('/signup', passport_1.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/signup'
        }));
        this.router.post('/signin', passport_1.authenticate('local-signin', {
            successRedirect: '/',
            failureRedirect: '/signin'
        }));
    }
}
exports.default = AuthRouter;
