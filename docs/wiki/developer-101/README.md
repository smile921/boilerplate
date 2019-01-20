# Introduction



[developer-100在线阅读](https://guxiaobai.gitbooks.io/developer-101/content/)


**相关工具与平台**


*  [石墨文档](https://shimo.im/)
*  [磨刀原型](https://modao.cc/)
*  [Charles 代理工具分享](https://github.com/gzrichard/charles-share)


**常用镜像网站**

* [阿里巴巴开源镜像站](https://opsx.alibaba.com/)
* [清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/)
* [中国科学技术大学开源软件镜像](http://mirrors.ustc.edu.cn/)


### 常用命令

**Ubuntu**


	sed -i 's/archive.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
	sed -i 's/security.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
	
	
**Debian**

	sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
	sed -i 's/security.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
	
**alpine**

	echo 'http://dl-cdn.alpinelinux.org/alpine/edge/community' | tee -a /etc/apk/repositories
	sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories