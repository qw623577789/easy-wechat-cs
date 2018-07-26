const process = require('child_process');
const mkdirp = require('mkdirp');
const ejs = require('ejs');
const walk = require('klaw-sync');
const path = require('path');
const fs = require('fs');
const PROJECT_ROOT = `${__dirname}/../`;

let schemas = walk(`${__dirname}/../node_modules/easy-wechat/src/schema`, {nodir: true});
let newSchemas = schemas.filter(({path: filePath}) => !fs.existsSync(`${__dirname}/../src/server/handler/${path.basename(filePath, '.js')}/index.js`));


console.log('copy schema from lib...');
for (let {path: filePath} of newSchemas) {
    let fileName = path.basename(filePath);
    process.execSync(`cp ${__dirname}/../node_modules/easy-wechat/src/schema/${fileName} ${__dirname}/../src/server/schema/${fileName}`);
}


console.log('build handler...');
let handlerTpl = ejs.fileLoader(`${PROJECT_ROOT}/toolchain/handler.tpl`).toString();
newSchemas.map(({path: filePath}) => {
    let fileName = path.basename(filePath, '.js');
    let functionName = fileName.split('.').map(_ => _.replace(/_(\w)/g, ($0, $1) => $1.toUpperCase())).join('.');
    mkdirp.sync(`${__dirname}/../src/server/handler/${fileName}`);
    fs.writeFileSync(
        `${__dirname}/../src/server/handler/${fileName}/index.js`, 
        ejs.render(handlerTpl, {functionName})
    )
})

console.log('build client ...');

let clientTpl = ejs.fileLoader(`${PROJECT_ROOT}/toolchain/client.tpl`).toString();
mkdirp.sync(`${__dirname}/../src/client`);
fs.writeFileSync(
    `${__dirname}/../src/client/index.js`, 
    ejs.render(clientTpl, {
        functionObj: schemas.reduce((prev, {path: filePath}) => {
            let fileName = path.basename(filePath, '.js');
            let splitArray = fileName.split('.').map(_ => _.replace(/_(\w)/g, ($0, $1) => $1.toUpperCase()));
            splitArray.reduce((obj, key, index) => {
                if (index == splitArray.length - 1) {
                    if (obj[key] == undefined) {
                        let request = require(filePath).request;
                        obj[key] = {
                            hasParams: request == null || (typeof request == 'object' && typeof request._schema == 'object' && request._schema.type == "null") ? false : true,
                            name: fileName
                        };
                    }
                }
                else {
                    if (obj[key] == undefined) {
                        obj[key] = {};
                    }
                }
                return obj[key];
            }, prev)
                
            return prev;
        }, {})
    })
)

console.log('done');