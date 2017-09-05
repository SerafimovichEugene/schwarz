//types
import { Request, Response, Application, NextFunction, Router } from 'express';
import * as express from 'express';
import { authenticate } from 'passport';
import { decode, encode } from 'jwt-simple';
import User from '../models/User';
import Auth from '../Auth/Auth';


interface AuthRouterInterface {
    router: Router;
}

export default class AuthRouter implements AuthRouterInterface {
    public router: Router;
    private static instance: AuthRouter;
    public static factory(): AuthRouter {
        if (!this.instance) {
            this.instance = new AuthRouter();
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
        const authenticateMiddle = (req, res, next) => {
            const { provider } = req.params;
            console.log('FROM authenticateMiddle', provider);
            const options = Auth.factory()._produce().options[provider] || null;
            const authenticator = authenticate(provider, options);
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
        const verify = async (req, res) => {
            const { token } = req.params;
            let incomeUser = decode(token, process.env.JWT_SECRET);
            let dbuser = null;
            try {
                dbuser = await User.findOneAndUpdate(
                    { email: incomeUser.email},
                    { isVerifed: true });
                res.redirect('/');
            } catch (error) {
                console.log(error);
                res.redirect('/');
            }
        };
        const addJWTTokenForAdmin = (req, res, next) => {
            if (req.user.isAdmin) {
                const token = encode(req.user, process.env.JWT_SECRET_ADMIN);
                res.cookie('token', token);
            }
            if (req.cookies.fromUrl) {
                   res.redirect(req.cookies.fromUrl);
               } else {
                   res.redirect('/');
               }
        };
        this.router.get('/logout', logOut);
        this.router.get('/:provider', authenticateMiddle);
        this.router.get('/:provider/callback', authenticateMiddle, authRedirect);
        this.router.get('/verify/:token', verify);
        this.router.post('/signup', authenticate('local-signup', {
            // successRedirect : '/',
            failureRedirect : '/signup'
        }), (req, res, next) => {
            res.cookie('canFetchUser', true);
            next();
        }, addJWTTokenForAdmin);
        this.router.post('/signin', authenticate('local-signin', {
            // successRedirect : '/',
            failureRedirect : '/signin'
        }), (req, res, next) => {
            res.cookie('canFetchUser', true);
            next();
        }, addJWTTokenForAdmin);
    }
}
