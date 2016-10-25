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
var LETS = require('../lets');

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
      LETS.fail('Sorry, this script requires git');
    }
    echo('adding...');
    if (exec('git add .').code !== 0) {
      LETS.fail('Git add failed');
    }
    echo('committing...');
    if (exec('git commit -m "' + msg + '"').code !== 0) {
      LETS.fail('Git commit failed');
    }
    echo('pushing... git push origin ' + branch);
    if (exec('git push origin ' + branch).code !== 0) {
      LETS.fail('Git push failed');
    }
    LETS.done();
  }
});