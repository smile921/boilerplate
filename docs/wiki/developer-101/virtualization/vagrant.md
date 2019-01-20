#  Vagrant 新手入门


### 介绍

[Vagrant](https://www.vagrantup.com/)是一款用来构建虚拟机的命令行工具。 继续进行之前先参考 [Oracle VirtualBox 新手入门](virtualbox.md) 完成虚拟的安装

### 安装

**Ubuntu**

速度快最高支持VirtualBox 5.0(Ubuntu 16.04 / 2016-10-28)

	sudo apt-get update
	sudo apt-get install -y nfs-kernel-server nfs-common vagrant
		
速度慢支持最新版VirtualBox

	sudo apt-get update
	sudo apt-get install -y nfs-kernel-server nfs-common
	
	wget -O /tmp/vagrant_1.8.6_x86_64.deb \
	      https://releases.hashicorp.com/vagrant/1.8.6/vagrant_1.8.6_x86_64.deb
	
	sudo dpkg -i /tmp/vagrant_1.8.6_x86_64.deb
	
**Mac**

	brew cask install vagrant

### Vagrant Boxes 介绍

Boxes 是预先制作的虚拟机模板用于快速生成虚拟机，由于网络的原因在后续的操作中会毕较慢，可以使用下载工具预先下载 ( [ubuntu/trusty64][trusty64] / [ubuntu/xenial64][xenial64] )，访问[Vagrant Boxes下载平台](https://atlas.hashicorp.com/boxes/search) 获取更多的模板。


**获取下载地址**

找到你需要的Boxes页面地址， 使用 `curl` 访问即可。以 `ubuntu/xenial64` 为例

	curl https://atlas.hashicorp.com/ubuntu/boxes/xenial64
	

### 相关命令

* `vagrant box list`: 列出已加载的Box
* `vagrant box add` : 加载新的Box
* `vagrant box remove`: 移除加载的box
* `vagrant init` : 初始化虚拟机，并产生Vagrantfile文件
* `vagrant up` :启动虚拟机
* `vagrant ssh`: 进入虚拟机
* `vagrant halt` : 关闭虚拟机
* `vagrant reload` : 重启虚拟机
* `vagrant status` : 查看虚拟机的运行状态
* `vagrant destroy` : 销毁虚拟机
* `vagrant package` :打包虚拟机


**vagrant 相关文章及资源**

* [使用Vagrant打造跨平台开发环境](https://segmentfault.com/a/1190000000264347)
* [开启 NFS 文件系统提升 Vagrant 共享目录的性能](https://segmentfault.com/a/1190000000270453)



[trusty64]: https://mirrors.tuna.tsinghua.edu.cn/ubuntu-cloud-images/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box
[xenial64]:https://mirrors.tuna.tsinghua.edu.cn/ubuntu-cloud-images/xenial/current/xenial-server-cloudimg-amd64-vagrant.box
