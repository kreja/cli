#!/usr/bin/env node

require('shelljs/global');
var fs = require('fs');

// 获取数据
var argv = require('yargs')
  .option('m', {
    alias : 'msg',
    demand: false,
    default: (function(){
      var argv2 = process.argv[2];
      return argv2 && argv2.indexOf('-') != 0 ? argv2 : 'update';
    })(),
    describe: '提交信息',
    type: 'string'
  })
  .usage('Usage: push [-m] [options]')
  .example('push -m "update"')
  .example('push "update"')
  .help('h')
  .alias('h', 'help')
  .argv;
var branch = (function(){
  var b = '';
  fs.readFile('.git/HEAD', 'utf8', function (err, data) {
      if (err) {
          echo('Error: Unable to read .git/HEAD', err);
          exit(1);
      } else {
          b = data.split(': ').pop().trim().substring(11);
      }
  });
  return b;
})();
var msg = argv.m || 'update';

// 执行 git
if (!which('git')) {
  echo('Sorry, this script requires git');
  exit(1);
}
echo('adding...');
if (exec('git add .').code !== 0) {
  echo('Error: Git add failed');
  exit(1);
}
echo('committing...');
if (exec('git commit -am "' + msg + '"').code !== 0) {
  echo('Error: Git commit failed');
  exit(1);
}
echo('pushing...');
if (exec('git push origin ' + branch).code !== 0) {
  echo('Error: Git push failed');
  exit(1);
}
echo('=============== (;´▽`)y-~~ DONE! ===============');
