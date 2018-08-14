# Git基础实践

## 配置

* SSH vs Http(s)
* git config
  > gitlab/github中的git config#user.name#user.email只用来提交的日志信息，和权限没有一毛钱关系
  > 即使不配置，你有权限，也可以push等，只不过用的是自动的PC的user
  > 肯定是建议配置，可配置global也可根据项目配置
* gitlab权限验证原理
  > 对于gitlab的权限管理，最终是根据账号做权限管理的，在authorized_keys除了公钥还有对应的user(可以在gitlab#user#setttings#配置这个公钥),进而根据user去做权限验证
  > github只要ssh验证成功即有权限
  > Gitosis/Gitolite

## 仓库配置(远端仓库已通过gitlab创建)

* 本地仓库初始化并关联远端仓库
  + 编辑.gitignore 忽略如.project/.classpath等

````bash

> git init
Initialized empty Git repository in /git-sample/.git/
> git remote -v
> git remote add origin git@gitlab.playcrab-inc.com:achilles/newbie.git
> git remote -v
origin  git@gitlab.playcrab-inc.com:achilles/newbie.git (fetch)
origin  git@gitlab.playcrab-inc.com:achilles/newbie.git (push)

````

* 直接clone仓库到本地 然后本地新建工程 即自动执行了local和remote的关联

## Git基础操作

* 跟踪文件
  + git add
  + git status
  + `git diff/git diff --staged`
  + `git reset HEAD <file>`
  + `git checkout -- <file>`
* 提交到本地仓库
  + git commit -m
  + git log
  + gitk
    > git新版本
    > `mac#brew cask install tcl`
* 远程仓库
  + git remote -v
  + fork出来一个仓库 需要添加源仓库为上游
    > `git remote add kof git@gitlab.playcrab-inc.com:fucan/Revenants.git`
    > git fetch kof
    > Remote Tracking
    > `> origin/master`
    > `> kof/master`
  + git fetch [remote-name]
    > 从远程仓库抓取数据
    > fetch 命令只是将远端的数据拉到本地仓库，并不自动合并到当前工作分支
    > `git merge kof/master`
  + 默认情况下 git clone 命令本质上就是自动创建了本地的 master 分支用于跟踪远程仓库中的 master 分支（假设远程仓库确实有 master 分支）
  + `git pull`
  + `git push [remote-name] <local_branch>:<remote_branch>`
    > 推送之前 如果远程已有更新 则需要先fetch/merge 再推送

## 基础工作模式

1. 用git push origin branch-name推送自己的修改
2. 推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并
  > There is no tracking information for the current branch
  > git branch --set-upstream-to=origin/branch-name
  > git branch -u origin/branch
  > > 本地分支与远程分支关联
  > > >git push -u origin dev 推送的时候用-u参数关联
3. 如果合并有冲突，则解决冲突，并在本地提交
4. 没有冲突或者解决掉冲突后，再用git push origin branch-name推送就能成功

## 分支

* git branch
  > -r 远程分支
* git branch -vv
  > 可查看upstream分支
* git branch newBranch
  > git checkout branch 切换分支
  > git checkout -b branch 切换并创建分支
* 典型情景
  > git checkout -b hotfix 新建并切换到hotfix分支 可指定远程分支
  > vim
  > git commit -m "hotfix"
  > git checkout master 切回master分支
  > git merge hotfix 将hotfix的修改合并到master
  > git branch -d hotfix 完成使命删除分支
* git push origin :hotfix 删除远端分支

## 关于合并

* Fast-Forward
  >  快进，指针直接向右移动
* 三路合并
  + ![](https://git-scm.com/figures/18333fig0313-tn.png)
    > 有三个分支
  + ![](https://git-scm.com/figures/18333fig0314-tn.png)
    > master和hotfix合并 快进
  + ![](https://git-scm.com/figures/18333fig0315-tn.png)
    > 另外一个分支iss53做了一些修改
    > 此时无法Fast-Forward
    > > git checkout master
    > > git merge iss53
  + Git 会用两个分支的末端（C4 和 C5）以及它们的共同祖先（C2）进行一次简单的三路合并计算
  + ![](https://git-scm.com/figures/18333fig0317-tn.png)
    > 对三方合并后的结果重新做一个新的快照，并自动创建一个指向它的提交对象（C6）
* 解决冲突
  > merge提示Conflict
  > git status 查看冲突
  > Git 会在有冲突的文件里加入标准的冲突解决标记


````

<<<<<<< HEAD
......
=======
......
>>>>>>> iss53

````

## git tag

> git tag 查看当前tag
> > -n

> git tag -a v20171201 -m "20171201 for version audit"
> git show v20171201
> git push origin v20171201
>
> git checkout -b branch_name tag_name
>
> > detached HEAD 快照 无法修改
> >
> > 需要从tag创建一个分支
>

## 进阶技巧

### git stash

+ 切换分支、合并分支时通常需要我们的workspace是clean的
+ 情景
  > 在master分支开发 做了一些修改 但是还未提交到本地仓库
  > 接到一个任务需要修复一个bug
  > 不想提交一半的工作
+ 储藏栈
  > 可以获取你工作目录的中间状态——也就是你修改过的被追踪的文件和暂存的变更——并将它保存到一个未完结变更的堆栈中，随时可以重新应用
+ > git status 查看工作区状态
  > git stash 储藏当前未完结变更
  > git status 此时查看工作区则是clean的
  > git checkout bugfix 切换到另一个分支工作修复bug
  > git checkout master 切换master分支
  > git stash list 查看储藏栈
  > git stash apply 恢复
  > > git stash apply stash@{2} 指定恢复
  > > git stash pop 出栈
  > > git stash drop 删除
  > >
  > > -a/-u

### 合并禁用fast-forward

> git log查看的时候会有一个'commit' Merge branch 'merge-test'
> 如果合并是Fast-forward策略 则查看git log的时候 没有单独的commit表示曾经合并过
> 执行合并时，如果设定了non fast-forward选项，即使在能够fast-forward合并的情况下也会生成新的提交并合并
> merge后master均会有分支修改的commit记录(无论是否删除分支)
> > 经验:**分支合并**的时候禁用fast-fowrd
> > git merge --no-ff -m "merge" merge-test

### git cherry-pick

* 情景
  > master分支 新网络层新代码 3.0
  > audit分支 旧网络层新代码 2.0
  > 不能直接将两个分支合并
  > master修复了一个功能bug 需要同步到audit分支
* 测试
  > newbie-sample工程#master#HelloPlaycrab新增两个commit/增加两行代码
  > git log显示有两个最新的commit
  > 切换到git checkout merge-test
  > git cherry-pick 92a8a5e8 // 选择修改的第一个commit
  > 此时可以看到merge-test中只增了一行代码 即master的第一个commit的内容
  >
  > 线上建议修复一个bug一个commit

### git rebase

* 对比三路合并
  ![](https://git-scm.com/figures/18333fig0328-tn.png)
* 你可以把在 C3 里产生的变化补丁在 C4 的基础上重新打一遍
  ![](https://git-scm.com/figures/18333fig0329-tn.png)
* 快速合并
  ![](https://git-scm.com/figures/18333fig0330-tn.png)
* 优缺点
  > 推送之前清理提交历史的手段
  > git pull --rebase
  > 你的项目历史会非常整洁
  > 而git merge则会有大量的合并提交
  > 黄金法则-绝不要在公共的分支上使用它
  > 从**私有branch**合并（merge）代码到主干branch时rebase

### 远程分支覆盖本地

> git fetch --all
> git reset --hard origin/master

### 其他

> Eclipse#egit
> > Git Gonfiguration
> > Git Staging
> > Team

> git reflog
> > 显示整个仓库的commit包括已经撤销的commit

## 分支模型

![](http://ww3.sinaimg.cn/large/7cc829d3gw1en76ivwj9yj20vy16cdmb.jpg)

## 参考

* [廖雪峰#Git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)
* [Git-Book](https://git-scm.com/book/zh/v2)
* [git-recipes/](https://github.com/geeeeeeeeek/git-recipes/wiki)
