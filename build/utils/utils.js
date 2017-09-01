"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePathToMLab = () => {
    const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DATABASE_NAME } = process.env;
    return `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE_NAME}`;
};
