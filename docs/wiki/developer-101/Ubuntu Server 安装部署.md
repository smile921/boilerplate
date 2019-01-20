# Ubuntu Server 安装部署

**准备工作**

* 鼠标/键盘
* 网络畅通(`安装时拔掉`)
* 选择U盘启动(`TOSHIBA`)

**configure the network**

* (选择) `Do not configure the network at this time`

**set up users and passwords**

* Fullname....: `thrive`
* Choose a password....: `thrive2018`
* Re-enter password....: `thrive2018`


**partion disks**

* (可选)`umount` --- `yes`
* `use enter disk`
* `write` ---------- `yes`

**Software Select**

* `OpenSSH`


## 重启


### 配置网络

* `lshw -class network|grep name`
* `sudo vi /etc/network/interfaces`


**固定ip(推荐)**

```
auto eno1 
iface eno1 inet static 
address 192.168.1.192 
netmask 255.255.255.0 
gateway 192.168.1.1
```

**自动ip**

```
auto eno1 
iface eno1 inet dhcp 
```

**检查ip地址**

* `ifconfig | grep addr`(需要记录)


**更换安装源(可选)**

* `cp /etc/apt/sources.list{,.default}`
* `sed -i 's/archive.ubuntu.com/mirrors.aliyun.com/' /etc/apt/sources.list`
* `sudo apt-get update`


**网络配置**





## 调试方案

* 自带笔记本一台
* [TeamViewer Host](https://download.teamviewer.com/download/TeamViewer_Host_Setup.exe)
* [PuTTY/32-bit](https://the.earth.li/~sgtatham/putty/latest/w32/putty.exe)  -  [PuTTY/64-bit](https://the.earth.li/~sgtatham/putty/latest/w64/putty.exe)