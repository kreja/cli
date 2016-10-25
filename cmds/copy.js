#!/usr/bin/env node

/**
 * copy filename
 */
/**
 * copy ls
 */

require('shelljs/global');
var path = require('path');
var fs = require('fs');
var copiedDir = path.resolve(__dirname, '../copys');
var LETS = require('../lets');

Object.assign(exports, {
    command: 'copy <filename>',
    aliases: ['cp'],
    desc: '复制文件到当前目录',
    handler: (argv) => {
        if (!argv.filename) {
            LETS.fail('必须输入文件名');
        }

        var copiedFile = path.resolve(copiedDir, argv.filename);
        fs.stat(copiedFile, (err, stat) => {
            if (stat && stat.isFile()) {
                cp(copiedFile, process.cwd());
                LETS.done();
            } else { // 找不到文件就返回
                LETS.fail('该文件不存在，输入 lets copy ls 查看文件列表');
            }
        });
    },
    builder: (yargs) => {
        yargs
            .example('lets copy .gitignore')
            .command({
                command: 'ls',
                desc: '列出可复制的文件列表',
                builder: {},
                handler: (yargs) => {
                    ls('-A', copiedDir).map(f => {
                        if (f == '.DS_Store') return;
                        echo(f);
                    });
                    exit(1);
                }
            });
    }
});
