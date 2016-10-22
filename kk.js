/**
 * kk 通用库
 */
require('shelljs/global');

module.exports = {
	done: () => echo('=============== (;´▽`)y-~~ DONE! ==============='),
    // todo:: KK.fail 怎么接受多参数
	fail: (msg) => {
		echo('Error:', msg || '╥﹏╥... 执行失败，退出命令');
		exit(1);
	},
	const: {}
};