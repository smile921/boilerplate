# Git 基础教程

tig 是一款用来查看 提交日志的软件


* [看日记学git](http://ody0h6rio.bkt.clouddn.com/git_tutorial.pdf)
* [git - 简明指南](http://rogerdudler.github.io/git-guide/index.zh.html)

#### 安装

	apt-get install git tig
	
	
#### 设置

	# 设置名称
	git config --global user.name "_example_"
	
	# 设置邮箱
	git config --global user.email _example_@gmail.com
	
	# 默认推送当前分支(Git 2.x)
	git config --global push.default simple
	
	
#### 基础命令

初始化版本库

	git init
	
添加到暂存区

	git add <something>
	
查看文件的修改

	git diff <something>
	
撤销文件的修改

	git checkout <file_name>
	
提交到版本库

	git commit -m "log message"
	
查看提交记录

	git log
	
清除未加入版本库的文件

	# -f: 清除文件
	# -d: 清除文件夹
	git clean -f -d
	
远程仓库

	# 添加远程仓库(origin: 默认仓库)
	git remote add <name> <url>
	
	# 查看
	git remote -v
	
	# 推送(-u 本地和远程关联，首次推送需要关联)
	git push -u <name> <branch>
	
	# 获取更新
	git pull
	
	
分支操作

	# 新建分支并切换
	git checkout -B <new_branch_name>
	
	# 查看分支
	git branch -a
	
	
#### 高级命令

* git fetch
* git rebase
* git merge
* git reset