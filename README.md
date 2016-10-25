# lets-cli

命令行工具


# todo
- 改成 lets 
lets push
lets copy


# push

相当于

```
git add .
git commit -m 'xx'
git push origin [branch]
```

Usage: push [msg]

选项：
  --msg   提交信息                 [字符串] [默认值: "update"]

示例：
  push "update"


# copy
复制某常用文件（如 .gitignore）到当前目录

Usage: copy <filename>

命令：
  ls  列出可复制的文件列表

示例：
  copy .gitignore
  