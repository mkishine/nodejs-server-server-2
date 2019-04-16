const Swagger = require('swagger-client');
const Validator = require('swagger-model-validator');
const validator = new Validator();

Swagger('http://localhost:3000/api-docs').then(client => {
    client.apis.greeter.getGreeting({name: "bobby"}).then(result => {
        console.log(result.body);
        const validationResults = validator.validate(result.body, client.spec.definitions.Greeting);
        if (!validationResults.valid) {
            console.log(`Validation failed. ${validationResults.errorCount} error(s) found.`);
            console.log(validationResults.GetErrorMessages());
        }
    })
});