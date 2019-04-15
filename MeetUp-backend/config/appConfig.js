let appConfig =  {};

appConfig.port = 3001;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    uri : 'mongodb://127.0.0.1:27017/meetUpAppDB',
}
appConfig.version = '/api/v1';

module.exports = {
    port : appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    env : appConfig.env,
    db : appConfig.db.uri,
    version : appConfig.version
}