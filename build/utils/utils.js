"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePathToMLab = () => {
    const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DATABASE_NAME } = process.env;
    return `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE_NAME}`;
};
exports.configStrategyFactory = (type) => {
    const { TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET, TWITTER_CALLBACK_URL, FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, FACEBOOK_CALLBACK_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL, VK_CLIENT_ID, VK_CLIENT_SECRET, VK_CALLBACK_URL } = process.env;
    let configuration = {};
    if (type === 'google') {
        configuration.clientID = GOOGLE_CLIENT_ID;
        configuration.clientSecret = GOOGLE_CLIENT_SECRET;
        configuration.callbackURL = GOOGLE_CALLBACK_URL;
    }
    else if (type === 'facebook') {
        configuration.clientID = FACEBOOK_CLIENT_ID;
        configuration.clientSecret = FACEBOOK_CLIENT_SECRET;
        configuration.callbackURL = FACEBOOK_CALLBACK_URL;
    }
    else if (type === 'twitter') {
        configuration.consumerKey = TWITTER_CLIENT_ID;
        configuration.consumerSecret = TWITTER_CLIENT_SECRET;
        configuration.callbackURL = TWITTER_CALLBACK_URL;
    }
    else if (type === 'vkontakte') {
        configuration.clientID = VK_CLIENT_ID;
        configuration.clientSecret = VK_CLIENT_SECRET;
        configuration.callbackURL = VK_CALLBACK_URL;
    }
    else if (type === 'local') {
        configuration.usernameField = 'email';
        configuration.passwordField = 'password';
    }
    return configuration;
};
