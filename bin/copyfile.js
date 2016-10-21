#!/usr/bin/env node

require('shelljs/global');
var path = require('path');
var fs = require('fs');
var copiedDir = path.resolve(__dirname, '../copys');

// 获取数据
var argv = require('yargs')
	.option('n', {
		alias: 'name',
		demand: true,
		default: (function() {
			var argv2 = process.argv[2];
			return argv2 && argv2.indexOf('-') != 0 ? argv2 : '';
		})(),
		describe: '文件名',
		type: 'string'
	})
	.usage('Usage: copyfile [-f] [name]')
	.example('copyfile -f ".gitignore"')
	.example('copyfile .gitignore')
	.help('h')
	.alias('h', 'help')
	.command("ls", "列出可复制的文件列表", function (yargs) {
	    ls('-A', copiedDir).map(function(f){
	    	if(f == '.DS_Store') return;
	    	echo(f);
	    });
	})
	.argv;

// todo::修改成 类似 git  的 命令
if(process.argv[2] == 'ls'){
	exit(1);
}

if (!argv.n) {
	echo('必须输入文件名');
	exit(1);
}

var copiedFile = path.resolve(copiedDir, argv.n);
// 找不到文件就返回
fs.stat(copiedFile, function(err, stat) {
	if (stat && stat.isFile()) {
		cp(copiedFile, process.cwd());
		echo('=============== (;´▽`)y-~~ DONE! ===============');
	} else {
		echo('该文件不存在，请输入 copyfile ls 查看可复制文件列表');
		exit(1);
	}
});
