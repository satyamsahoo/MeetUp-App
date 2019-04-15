const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const app = express();
const fs = require('fs'); 
var helmet = require('helmet')
const appConfig = require('./config/appConfig');
const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser');

const globalErrorMiddleware = require('./app/middlewares/appErrorHandler')
const routeLoggerMiddleware = require('./app/middlewares/routeLogger')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//app.use(cookieParser);

app.use(globalErrorMiddleware.globalErrorHandler)
app.use(routeLoggerMiddleware.logIp)
app.use(helmet())
let logger = require('./app/libs/loggerLib');

let routePath = './app/routes';
let modelsPath = './app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        console.log('Including following Model file.')
        console.log(modelsPath+'/'+file)
        require(modelsPath + '/' + file)
    }
})

fs.readdirSync(routePath).forEach(function(file){
    if(~file.indexOf('.js')){
        console.log('Including following route file.')
        console.log(routePath+'/'+file)
        let route = require(routePath+'/'+file)
        route.setRouter(app);
    }
});

app.use(globalErrorMiddleware.globalNotFoundHandler)



const server = http.createServer(app);
// start listening to http server
console.log(appConfig);
server.listen(appConfig.port,function(){
    console.log('App connected successfully on port 3000');

});
server.on('error', onError)
server.on('listening', onListening)

// end server listening code

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
        throw error
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        case 'EADDRINUSE':
            logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        default:
            logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10)
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    ('Listening on ' + bind)
    logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10)
    let db = mongoose.connect(appConfig.db, { useNewUrlParser: true })
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
    // application specific logging, throwing an error, or other logic here
})


// handling mongoose connection error
mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err)

}); // end mongoose connection error

// handling mongoose success event
mongoose.connection.on('open', function (err) {
    if (err) {
        console.log("database error");
        console.log(err);

    } else {
        console.log("database connection open success");
    }

}); // end mongoose connection open handler
