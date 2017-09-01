export const configurePathToMLab = () : string => {
    const {
        MONGO_USERNAME,
        MONGO_PASSWORD,
        MONGO_HOST,
        MONGO_PORT,
        MONGO_DATABASE_NAME } = process.env;
    return `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE_NAME}`;
};
