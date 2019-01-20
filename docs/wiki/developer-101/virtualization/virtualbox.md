# Oracle VirtualBox 新手入门

### 介绍

[Oracle VirtualBox][virtualbox]  是一款开源虚拟机软件。由德国 Innotek 公司开发，Sun Microsystems 公司出品。使用Qt编写，在 Sun 被 Oracle 收购后正式更名成 Oracle VM VirtualBox。采用 GPL 协议开源



### 安装

**Ubuntu**

本例以Ubuntu 16.04为例，其他 Linux 版本 请参照[VirtualBox 镜像使用帮助][tsinghua]

	sudo apt-get update
	sudo apt-get install -y apt-transport-https wget curl

	wget -q https://www.virtualbox.org/download/oracle_vbox_2016.asc -O- | sudo apt-key add -
	echo  "deb https://mirrors.tuna.tsinghua.edu.cn/virtualbox/apt/ xenial contrib" | sudo tee -a /etc/apt/sources.list.d/virtualbox.list
	
	sudo apt-get update
	sudo apt-get install -y virtualbox-$(curl -fsSL  https://mirrors.tuna.tsinghua.edu.cn/virtualbox/LATEST.TXT)
	
安装 [VirtualBox Extension Pack][extension] 获得更多功能支持(USB、RDP、PXE)。


	version=`echo $(VBoxManage -v) | awk '{split($0, version, "r"); print version[1]}'`
	release=`echo $(VBoxManage -v) | awk '{split($0, version, "r"); print version[2]}'`
	extpack=Oracle_VM_VirtualBox_Extension_Pack-$version-$release.vbox-extpack
	curl -o /tmp/$extpack https://mirrors.tuna.tsinghua.edu.cn/virtualbox/$version/$extpack
	VBoxManage extpack install --replace /tmp/$extpack



**Mac**


	brew cask install virtualbox virtualbox-extension-pack

	
[virtualbox]: https://www.virtualbox.org/
[extension]: https://www.virtualbox.org/wiki/Downloads
[tsinghua]: https://mirrors.tuna.tsinghua.edu.cn/help/virtualbox/