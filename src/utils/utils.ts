export const configurePathToMLab = () : string => {
    const {
        MONGO_USERNAME,
        MONGO_PASSWORD,
        MONGO_HOST,
        MONGO_PORT,
        MONGO_DATABASE_NAME } = process.env;
    return `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE_NAME}`;
};


export const configStrategyFactory = (type): object => {
    const {
        TWITTER_CLIENT_ID,
        TWITTER_CLIENT_SECRET,
        TWITTER_CALLBACK_URL,
        FACEBOOK_CLIENT_ID,
        FACEBOOK_CLIENT_SECRET,
        FACEBOOK_CALLBACK_URL,
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        GOOGLE_CALLBACK_URL,
        VK_CLIENT_ID,
        VK_CLIENT_SECRET,
        VK_CALLBACK_URL
    } = process.env;
    let configuration = {};
    if (type === 'google') {
        configuration.clientID = GOOGLE_CLIENT_ID;
        configuration.clientSecret = GOOGLE_CLIENT_SECRET;
        configuration.callbackURL = GOOGLE_CALLBACK_URL;
    } else if (type === 'facebook') {
        configuration.clientID = FACEBOOK_CLIENT_ID;
        configuration.clientSecret = FACEBOOK_CLIENT_SECRET;
        configuration.callbackURL = FACEBOOK_CALLBACK_URL;
    } else if (type === 'twitter') {
        configuration.consumerKey = TWITTER_CLIENT_ID;
        configuration.consumerSecret = TWITTER_CLIENT_SECRET;
        configuration.callbackURL = TWITTER_CALLBACK_URL;
    } else if (type === 'vkontakte') {
        configuration.clientID = VK_CLIENT_ID;
        configuration.clientSecret = VK_CLIENT_SECRET;
        configuration.callbackURL = VK_CALLBACK_URL;
    } else if (type === 'local') {
        configuration.usernameField = 'email';
        configuration.passwordField = 'password';
    }
    return configuration;
};


export const parseQuery = (querystring) => {
  // remove any preceding url and split
  if (querystring.indexOf('?') < 0) {
      return null;
  }
  querystring = querystring.substring(querystring.indexOf('?') + 1).split('&');
  var params = {}, pair, d = decodeURIComponent;
  // march and parse
  for (var i = querystring.length - 1; i >= 0; i--) {
    pair = querystring[i].split('=');
    params[d(pair[0])] = d(pair[1] || '');
  }

  return params;
};



export const updateQuery = (query, type, chunk) => {
    let regexp;
    let result;
    switch (type) {
        case 'page':
            regexp = /page=\d{0,}/gi;
            break;
        case 'currency':
            regexp = /currency=[A-Z]{3,}/gi;
            break;
        case 'priceFrom':
            regexp = /priceFrom=\d{0,}/gi;
            break;
        case 'priceTo':
            regexp = /priceTo=(\d|[A-Za-z]){0,}/gi;
            break;
        case 'productType':
            const startIndex = query.indexOf(type);
            const endIndex = query.indexOf('&', startIndex);
            result = endIndex !== -1 ?
                query.slice(0, startIndex).concat(chunk).concat(query.slice(endIndex)) :
                query.slice(0, startIndex).concat(chunk);
            break;
    }
    if (query.indexOf(type) < 0) {
        result = query.concat(`&${chunk}`);
    } else {
        if (regexp) {
            result = query.replace(regexp, chunk);
        }
    }
    return result;
};
