import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as FacebookStategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as VkStrategy } from 'passport-vkontakte';
import { configStrategyFactory } from '../../utils/utils';
import User from '../models/User';

export default class Auth {
    public static factory(): Auth {
        if (!this.instance) {
            this.instance = new Auth();
            return this.instance;
        } else {
            return this.instance;
        }
    }
    private static instance: Auth;
    public strategies: any;
    constructor() {
        this.strategies = null;
    }
    public _produce() {
        const verifyUser = async (provider, accessToken, refreshToken, profile, done) => {
            let user = null;
            try {
                user = await User.findOne({providerId: profile.id});
                if (user) {
                    return done(null, user);
                } else {
                    user = new User();
                    user.isVerifed = true;
                    user.providerId = profile.id;
                    user.provider = provider;
                    user.login = profile.displayName || profile.username;
                    user.isAdmin = false;
                    user.photo = profile.photos ? profile.photos[0].value : '/avatar.png';
                    await user.save();
                    return done(null, user);
                }
            } catch (error) {
                return done(error);
            }
        };
        this.strategies = [
            new TwitterStrategy(configStrategyFactory('twitter'), verifyUser.bind(null, 'twitter')),
            new FacebookStategy(configStrategyFactory('facebook'), verifyUser.bind(null, 'facebook')),
            new GoogleStrategy(configStrategyFactory('google'), verifyUser.bind(null, 'google')),
            new VkStrategy(configStrategyFactory('vkontakte'), verifyUser.bind(null, 'vkontakte')),
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
    private _local() {
        const verifyUserLocal = async (email, password, done) => {
            let user = null;
            try {
                user = await User.findOne({ email :  email });
                if (user) {
                    return done(null, user);
                } else {
                    user = new User();
                    user.isVerifed = false;
                    user.email = email;
                    user.password = user.generateHash(password);
                    user.provider = 'local';
                    user.isAdmin = false;
                    user.photo = '/avatar.png';
                    user.login = email;
                    await user.save();
                    return done(null, user);
                }
            } catch (error) {
                return done(error);
            }
        };
        const verifyUserSignInLocal = async (email, password, done) => {
            let user = null;
            try {
                user = await User.findOne({ email: email });
                if (!user) {
                    return done(null, false);
                } else if (!user.validatePassword(password)) {
                    console.log('DONT MATHC');
                    return done(null, false);
                } else {
                    return done(null, user);
                }
            } catch (error) {
                return done(error);
            }
        };
        this.strategies.push({
            strategyName: 'local-signup',
            strategyBody: new LocalStrategy(configStrategyFactory('local'), verifyUserLocal.bind(null)),
        });
        this.strategies.push({
            strategyName: 'local-signin',
            strategyBody: new LocalStrategy(configStrategyFactory('local'), verifyUserSignInLocal.bind(null)),
        });
    }
}
