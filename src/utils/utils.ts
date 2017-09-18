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


export const serealizeDataToLocalStorage = (key, value) => {
    try {
        let stringVal = JSON.stringify(value);
        localStorage.setItem(key, stringVal);
    } catch (e) {
        console.log('From serealizeDataToLocalStorage', e);
    }
};


export const openURL = (url, title, w, h) => {
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    const left = ((width / 2) - (w / 2)) + dualScreenLeft;
    const top = ((height / 2) - (h / 2)) + dualScreenTop;
    const newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    if (window.focus) {
        newWindow.focus();
    }
};

export const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const validatePhone = (phone) => {
    const re = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;
    return re.test(phone);
};

export const produceHumanReadableDate = (date) => {
    const produce = (value) => value > 9 ? value : `0${value}`;
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = produce(month);
    let day =  date.getDate();
    day = produce(day);
    let hours = date.getHours();
    hours = produce(hours);
    let minutes = date.getMinutes();
    minutes = produce(minutes);
    return `${hours}:${minutes} ${day} ${month} ${year}`;
};
