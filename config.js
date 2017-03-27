//Database URL's//
exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       'mongodb://localhost/mxs-content-app-db';
exports.TEST_DATABASE_URL = (
                       process.env.TEST_DATABASE_URL ||
                      'mongodb://localhost/mxs-content-app-test-db');

//Server listen port//
exports.PORT = process.env.PORT || 8080;

//JWT secret and expiration time//
exports.SECRET = process.env.SECRET || 'supersecretlullullul';
exports.EXPIRATIONTIME = process.env.EXPIRATIONTIME || 60*60*24;

//AWS s3 configuration keys//
exports.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY || 'AKIAJPEDYIGKCR7DABXQ';
exports.AWS_SECRET_KEY = process.env.AWS_SECRET_KEY || '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';
exports.AWS_BUCKET = process.env.AWS_BUCKET || 'mxs-db-uploads';
