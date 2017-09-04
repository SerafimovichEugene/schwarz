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
const passport_twitter_1 = require("passport-twitter");
const passport_facebook_1 = require("passport-facebook");
const passport_google_oauth2_1 = require("passport-google-oauth2");
const passport_local_1 = require("passport-local");
const passport_vkontakte_1 = require("passport-vkontakte");
const jwt_simple_1 = require("jwt-simple");
const utils_1 = require("../../utils/utils");
const User_1 = require("../models/User");
const Mailer_1 = require("../Mailer/Mailer");
class Auth {
    static factory() {
        if (!this.instance) {
            this.instance = new Auth();
            return this.instance;
        }
        else {
            return this.instance;
        }
    }
    constructor() {
        this.strategies = null;
    }
    _produce() {
        const verifyUser = (provider, accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
            let user = null;
            try {
                user = yield User_1.default.findOne({ providerId: profile.id });
                if (user) {
                    return done(null, user);
                }
                else {
                    user = new User_1.default();
                    user.isVerifed = true;
                    user.providerId = profile.id;
                    user.provider = provider;
                    user.login = profile.displayName || profile.username;
                    user.isAdmin = false;
                    user.photo = profile.photos ? profile.photos[0].value : '/avatar.png';
                    yield user.save();
                    return done(null, user);
                }
            }
            catch (error) {
                return done(error);
            }
        });
        this.strategies = [
            new passport_twitter_1.Strategy(utils_1.configStrategyFactory('twitter'), verifyUser.bind(null, 'twitter')),
            new passport_facebook_1.Strategy(utils_1.configStrategyFactory('facebook'), verifyUser.bind(null, 'facebook')),
            new passport_google_oauth2_1.Strategy(utils_1.configStrategyFactory('google'), verifyUser.bind(null, 'google')),
            new passport_vkontakte_1.Strategy(utils_1.configStrategyFactory('vkontakte'), verifyUser.bind(null, 'vkontakte')),
        ];
        this.strategies.options = {
            google: {
                scope: ['https://www.googleapis.com/auth/plus.login'],
            },
            vkontakte: {
                scope: ['email'],
            },
        };
        this._local();
        return this.strategies;
    }
    _local() {
        const verifyUserLocal = (email, password, done) => __awaiter(this, void 0, void 0, function* () {
            let user = null;
            try {
                user = yield User_1.default.findOne({ email: email });
                if (user) {
                    return done(null, user);
                }
                else {
                    user = new User_1.default();
                    user.isVerifed = false;
                    user.email = email;
                    user.password = user.generateHash(password);
                    user.provider = 'local';
                    user.isAdmin = false;
                    user.photo = '/avatar.png';
                    user.login = email;
                    yield user.save();
                    const url = '/auth/verify';
                    const token = jwt_simple_1.encode(user, process.env.JWT_SECRET);
                    yield new Mailer_1.default().sendEmail(Mailer_1.default.from, 'verefy your email', email, Mailer_1.default.generateTemplate(url, token));
                    return done(null, user);
                }
            }
            catch (error) {
                return done(error);
            }
        });
        const verifyUserSignInLocal = (email, password, done) => __awaiter(this, void 0, void 0, function* () {
            let user = null;
            try {
                user = yield User_1.default.findOne({ email: email });
                if (!user) {
                    return done(null, false);
                }
                else if (!user.validatePassword(password)) {
                    console.log('DONT MATHC');
                    return done(null, false);
                }
                else {
                    return done(null, user);
                }
            }
            catch (error) {
                return done(error);
            }
        });
        this.strategies.push({
            strategyName: 'local-signup',
            strategyBody: new passport_local_1.Strategy(utils_1.configStrategyFactory('local'), verifyUserLocal.bind(null)),
        });
        this.strategies.push({
            strategyName: 'local-signin',
            strategyBody: new passport_local_1.Strategy(utils_1.configStrategyFactory('local'), verifyUserSignInLocal.bind(null)),
        });
    }
}
exports.default = Auth;
