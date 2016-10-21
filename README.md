# cli

命令行工具


# todo
- 父子命令



# push

相当于

```
git add .
git commit -m 'xx'
git push origin [branch]
```

Usage: push -m [options]

选项：
  -m, --msg   提交信息                 [字符串] [默认值: "update"]
  -h, --help  显示帮助信息                                  [布尔]

示例：
  push -m "update"



# copyfile
复制某常用文件（如 .gitignore）到当前目录

Usage: copyfile [-f] [name]

命令：
  ls  列出可复制的文件列表

选项：
  -n, --name  文件名            [字符串] [必需] [默认值: ""]
  -h, --help  显示帮助信息                            [布尔]

示例：
  copyfile -f ".gitignore"
  copyfile .gitignore