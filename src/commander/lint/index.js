/**
 * 默认找cwd下的lint文件，找不到，走包里的。
 * 找到后，调用lint-staged
 */
const fs = require('fs');
const path = require('path');
const lintStaged = require('lint-staged');

const defaultConfig = {
    allowEmpty: false,
    concurrent: true,
    config: {
        '*.js': 'eslint --config ' + path.join(__dirname, '../../', 'template', '.eslintrc.js'),
    },
    cwd: process.cwd(),
    debug: false,
    maxArgLength: null,
    quiet: false,
    relative: false,
    shell: false,
    stash: true,
    verbose: false,
};

const readFile = (path, options) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, options, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

const lint = async () => {
    const cwd = process.cwd();
    let customConfig = {};

    try {
        customConfig = await readFile(path.join(cwd, '.whalelintrc.js'), 'utf-8');
    } catch (e) {}

    try {
        await lintStaged({
            ...defaultConfig,
            ...customConfig,
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

module.exports = lint;
