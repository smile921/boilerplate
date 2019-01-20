# 修改安装源


#### 备份默认安装源

	sudo mv /etc/apt/sources.list{,.default}
	
#### 使用国内镜像作为安装源

	sudo tee /etc/apt/sources.list << EOD
	deb http://cn.archive.ubuntu.com/ubuntu/ xenial main multiverse restricted universe
	deb http://cn.archive.ubuntu.com/ubuntu/ xenial-backports main multiverse restricted universe
	deb http://cn.archive.ubuntu.com/ubuntu/ xenial-proposed main multiverse restricted universe
	deb http://cn.archive.ubuntu.com/ubuntu/ xenial-security main multiverse restricted universe
	deb http://cn.archive.ubuntu.com/ubuntu/ xenial-updates main multiverse restricted universe
	deb-src http://cn.archive.ubuntu.com/ubuntu/ xenial main multiverse restricted universe
	deb-src http://cn.archive.ubuntu.com/ubuntu/ xenial-backports main multiverse restricted universe
	deb-src http://cn.archive.ubuntu.com/ubuntu/ xenial-proposed main multiverse restricted universe
	deb-src http://cn.archive.ubuntu.com/ubuntu/ xenial-security main multiverse restricted universe
	deb-src http://cn.archive.ubuntu.com/ubuntu/ xenial-updates main multiverse restricted universe
	EOD