//Database URL's//
require('dotenv').config();
exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       'mongodb://localhost/mxs-content-app-db';
exports.TEST_DATABASE_URL = (
                       process.env.TEST_DATABASE_URL ||
                      'mongodb://localhost/mxs-content-app-test-db');

//Server listen port//
exports.PORT = process.env.PORT || 8080;

//JWT secret and expiration time//
exports.SECRET = process.env.SECRET;
exports.EXPIRATIONTIME = process.env.EXPIRATIONTIME;

//AWS s3 configuration keys//
exports.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
exports.AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
exports.AWS_BUCKET = process.env.AWS_BUCKET;
