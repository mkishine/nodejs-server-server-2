'use strict';


const fs = require('fs'),
    path = require('path'),
    http = require('http');

// enable validation tracing, see swagger-tools/middleware/swagger-validator.js
process.env.DEBUG='swagger-tools:middleware:validator';

const app = require('connect')();
const swaggerTools = require('swagger-tools');
const jsYaml = require('js-yaml');
const serverPort = 3000;


// swaggerRouter configuration
const options = {
    swaggerUi: path.join(__dirname, '/swagger.json'),
    controllers: path.join(__dirname, './controllers'),
    useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8');
const swaggerDoc = jsYaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata(), null);

    // Validate Swagger requests
    app.use(middleware.swaggerValidator({validateResponse: false}), null);

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options), null);

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi(), null);

    // Start the server
    http.createServer(app).listen(serverPort, function () {
        console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
        console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    });

});
