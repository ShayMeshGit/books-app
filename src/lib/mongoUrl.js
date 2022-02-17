const DB_PREFIX = process.env.MONGO_PREFIX;
const DB_HOST = process.env.MONGO_HOST;
const DB_PORT = process.env.MONGO_PORT;
const DB_COLLECTION = process.env.MONGO_COLLECTION;
const DB_USERNAME = process.env.MONGO_USERNAME;
const DB_PASSWORD = process.env.MONGO_PASSWORD;
exports.MONGO_URI = `${DB_PREFIX}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_COLLECTION}?authSource=admin`;
