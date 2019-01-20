# 基础安装


## Node.js


**Mac**

	brew install node
	
**Linux**

	curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
	sed -i 's,https://deb.nodesource.com/node/,http://mirrors.ustc.edu.cn/nodesource/deb/'  /etc/apt/sources.list.d/nodesource.list
	sudo apt-get install -y nodejs


## Yarn


**Mac**

	brew install yarn
	
**Linux**

	curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
	echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
	sudo apt-get update && sudo apt-get install yarn
	
**相关配置**

	yarn config set registry 'https://registry.npm.taobao.org'
	yarn config set sass_binary_site "http://cdn.npm.taobao.org/dist/node-sass"
	
	
## 参考资料

* [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager/)
* [Nodesource 镜像使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/nodesource/)
* [Yarn install](https://yarnpkg.com/lang/en/docs/install/)
* [在中国，安装 & 升级 npm 依赖的正确方法](https://sebastianblade.com/the-truly-way-to-install-upgrade-npm-dependency-in-china/)
* [nodesource/distributions](https://github.com/nodesource/distributions)

