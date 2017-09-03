//types
import { Request, Response, Application, NextFunction, Router } from 'express';
import * as express from 'express';
import { authenticate } from 'passport';
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
        this.router.post('/signup', authenticate('local-signup', {
            successRedirect : '/',
            failureRedirect : '/signup'
        }));
        this.router.post('/signin', authenticate('local-signin', {
            successRedirect : '/',
            failureRedirect : '/signin'
        }));
    }
}
