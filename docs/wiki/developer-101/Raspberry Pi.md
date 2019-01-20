### Raspberry Pi

[Raspberry Pi](https://www.raspberrypi.org/)
username pi
passowrd: raspberry

wlan0: c8:e7:d8:ec:45:9c

eth0: b8:27:eb:0b:10:31


http://mirrors.ustc.edu.cn/help/raspbian.html


### 安装

	diskutil list
	diskutil unmountDisk /dev/disk<disk# from diskutil>
	sudo dd bs=1m if=image.img of=/dev/rdisk<disk# from diskutil> conv=sync
	
	
sudo raspi-config


**wifi**

https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md


**ssh**

https://www.raspberrypi.org/documentation/remote-access/ssh/unix.md


**aria2**

* https://aria2.github.io/
* https://github.com/mayswind/AriaNg
* https://github.com/ngosang/trackerslist
* https://blog.augustdoit.bid/aria2/

操作步骤

	mkdir ~/.aria2
	cd ~/.aria2
	touch aria2.conf


	
	
	dir=/media/xiaomi
	
	# rpc
	enable-rpc=true
	rpc-secret=656CjCKQ0iQUB78eXgIe4TJz8V8i7OdV
	rpc-allow-origin-all=true
	rpc-listen-all=true
	rpc-listen-port=6800
	
	

	
	
	aria2c --conf-path=/home/pi/.aria2/aria2.conf -D



**you-get**

* https://github.com/soimort/you-get


**smb**

	sudo apt-get install smbclient
	smbclient -L 192.168.31.1
	sudo mount -t cifs //192.168.31.1/TDDOWNLOAD /media/xiaomi -o guest,file_mode=0777,dir_mode=0777