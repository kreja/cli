#!/usr/bin/env node

/**
 * push xx
 * 相当于
 *  git add .
 *  git commit -m 'xx'
 *  git push origin xxx
 */

require('shelljs/global');
var fs = require('fs');
var KK = require('../kk');

Object.assign(exports, {
  command: 'push [msg]',
  desc: 'git 提交',
  builder: (yargs) => {
    yargs
      .default('msg', 'update')
      .example('push "update"');
  },
  handler: (argv) => {
    var branch = (function() {
      var b = '';
      fs.readFile('.git/HEAD', 'utf8', function(err, data) {
        if (err) {
          echo('Unable to read .git/HEAD', err);
          exit(1);
        } else {
          b = data.split(': ').pop().trim().substring(11);
        }
      });
      return b;
    })();
    var msg = argv.msg || 'update';

    if (!which('git')) {
      KK.fail('Sorry, this script requires git');
    }
    echo('adding...');
    if (exec('git add .').code !== 0) {
      KK.fail('Git add failed');
    }
    echo('committing...');
    if (exec('git commit -am "' + msg + '"').code !== 0) {
      KK.fail('Git commit failed');
    }
    echo('pushing...');
    if (exec('git push origin ' + branch).code !== 0) {
      KK.fail('Git push failed');
    }
    KK.done();
  }
});