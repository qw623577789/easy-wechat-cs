const walk = require('klaw-sync');
const path = require('path');

const { toBigCamelCase, toSmallCamelCase } = require('../lib');

module.exports = {
    getHandlers,
};

function getHandlers(schemaPath, serviceName, projectBigCamelName) {
    console.info('schemaPath' + schemaPath);
    console.info('serviceName' + serviceName);

    console.info('projectBigCamelName' + projectBigCamelName);

    return walk(schemaPath, { nodir: true }).map(({ path: filePath }) => {
        let { request, response, info = {} } = require(filePath);
        let name = path.basename(filePath, '.js');
        let methodName = toSmallCamelCase(name);
        let bigCamelMethodName = toBigCamelCase(name);

        return {
            name,
            methodName,
            request,
            response,
            info,
            requestClass: projectBigCamelName + serviceName + bigCamelMethodName + 'Request',
            responseClass: projectBigCamelName + serviceName + bigCamelMethodName + 'Response',
        };
    });
}
