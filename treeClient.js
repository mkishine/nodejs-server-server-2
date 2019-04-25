const Swagger = require('swagger-client');
const Validator = require('swagger-model-validator');
const TreeNode = require('./TreeNode');

const validator = new Validator();

Swagger('http://localhost:3000/api-docs').then(client => {
    client.apis.tree.getTree({name: "bobby"}).then(result => {
        console.log(JSON.stringify(result.body));
        const validationResults = validator.validate(result.body, client.spec.definitions.IntegerTreeNode);
        if (!validationResults.valid) {
            console.log(`Validation failed. ${validationResults.errorCount} error(s) found.`);
            console.log(validationResults.GetErrorMessages());
        } else {
            const node = TreeNode.fromObject(result.body);
            console.log(JSON.stringify(node));
        }
    })
});