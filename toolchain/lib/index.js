const ejs = require('ejs');
const fs = require('fs');
const { compile: jsonSchemaToDefinition } = require('json-schema-to-typescript');
const { validator } = require('@qtk/schema');
const path = require('path');

global.ENV = process.env.ENV || 'dev';
global.PROJECT_ROOT = path.resolve(`${__dirname}/../..`);
global.Common = {};

/**
 * 转为大驼峰命名格式
 * @param {string} name
 */
let toBigCamelCase = name => name.replace(
    /^[a-z]|\.[a-z]|_[a-z0-9]/g,
    match => match.replace(/\.|_/, '').toUpperCase()
);

/**
 * 转为小驼峰命名格式
 * @param {string} name
 */
let toSmallCamelCase = name => name.replace(
    /\.[a-z0-9]|_[a-z0-9]/g,
    match => match.replace(/\.|_/, '').toUpperCase()
);

/**
 *
 * @param {string} tplPath 模板路径
 * @param {string} dest 目标路径
 * @param {object} params 模板替换参数
 */
function render(tplPath, dest, params) {
    let Tpl = ejs.fileLoader(tplPath).toString();
    fs.writeFile(
        dest,
        ejs.render(Tpl, params).replace(/[\s\n]+\n/g, "\n\n"),
        function (err) {
            if (err) console.log(err);
        }
    );
}

async function getTypeScriptDefinition(qtkSchema, modelClassName) {
    let jsonSchema = validator.from(qtkSchema).jsonSchema;
    let definition = await jsonSchemaToDefinition(jsonSchema, modelClassName, { bannerComment: '' });
    return definition.replace('export ', '');
}

function getDirList(path) {
    return fs.readdirSync(path).filter(item => fs.lstatSync(`${path}/${item}`).isDirectory());
}

function getScriptName(filePath) {
    return path.relative(PROJECT_ROOT, filePath);
}


function mkdir(path) { if (fs.existsSync(path) == false) fs.mkdirSync(path); }

module.exports = {
    PROJECT_ROOT,
    render,
    toBigCamelCase,
    toSmallCamelCase,
    getTypeScriptDefinition,
    getDirList,
    getScriptName,
    mkdir,
};
