#  Docker 新手入门


### 安装

**Mac**

	brew cask install docker
	
**Linux**

	curl -fsSL get.docker.com -o get-docker.sh
	sudo sh get-docker.sh --mirror Aliyun
	
	sudo usermod -aG docker $USER
	
	# docker-compose: https://github.com/docker/compose/releases

		
### 镜像加速器

**Mac**

`Preferences` -> `Daemon` -> `Basic` -> `Registry mirrors`

`https://docker.mirrors.ustc.edu.cn/`

**Ubuntu**

	sudo tee /etc/docker/daemon.json << EOD
	{
		"registry-mirrors": ["https://docker.mirrors.ustc.edu.cn/"]
	}
	EOD
	
Ubuntu 16.04、Debian 8 Jessie、CentOS 7

	sudo systemctl daemon-reload
	sudo systemctl restart docker
	
	

### 常用命令

* `docker info`: 检查 Docker 安装

#### 镜像(Images)

* 获取: `docker pull`
* 列出本地: `docker images`
* 删除: `docker rmi`
* 保存: `docker save`
* 加载: `docker load`
* 上传: `docker push`
* 标签: `docker tag`
* 通过Dockerfile生成镜像: `docker build`
* 查看镜像历史: `docker history`

#### 容器(Containers)

**选项**

* `-t` : 分配一个伪终端
* `-i` : 让容器的标准输入保持打开
* `-d` : 在后台运行
* `--name`:  定义容器名字
* `--link`: 容器互联
* `-P` : 随机映射 49000~49900 的端口到内部容器开放的网络端口
* `-p` : 映射指定端口
* `-v` : 数据卷
* `-m`: 指定内存

**命令**

* 新建并启动: `docker run`
* 启动: `docker start`
* 终止: `docker stop`
* ---: `docker restart`
* 通过容器创建镜像: `docker commit`
* 列出: `docker ps`
* 获取容器的日志信息: `docker logs`
* 进入: `docker attach`
* 导出: `docker export`
* 导入: `docker import`
* 删除: `docker rm`
* 查看端口: `docker port`
* 查看容器修改: `docker diff`
* `docker kill`
* `docker events`
* `docker wait`


#### Dockerfile

* `#` 注释
* `FROM` : 指定镜像
* `MAINTAINER`: 作者
* `RUN` 运行命令
* `ADD`: 复制本地文件到镜像
* `EXPOSE`: 向外部开放端口
* `CMD`: 容器启动后于行的程序
* `ENTRYPOINT`: 配置给容器一个可执行的命令
* `WORKDIR`: 指定 `cmd`、`run`、 `entrypoint` 工作目录
* `ENV`: 设置环境变量
* `USER`: 镜像正在运行时设置一个UID
* `VOLUME`: 授权访问从容器内到主机上的目录



### Dockerfile 替换安装源

	# alpine
	sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

	# debian
	sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list
	
	# ubuntu
	RUN sed -i 's/archive.ubuntu.com/mirrors.aliyun.com/g' /etc/apt/sources.list
	
	RUN apt-get update && apt-get install -y --no-install-recommends \
	
				&& rm -rf /var/lib/apt/lists/*
	

#### 推荐资料

* [Docker 官方网站](https://www.docker.com/)
* [Docker — 从入门到实践](https://www.gitbook.com/book/yeasy/docker_practice/details)
* [Docker Hub 源使用帮助](http://mirrors.ustc.edu.cn/help/dockerhub.html)

