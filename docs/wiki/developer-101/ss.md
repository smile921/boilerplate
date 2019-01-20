## 翻墙入门


### 快速入门

SwitchyOmega: 您可以在[谷歌应用商店][SwitchyOmega_Chrome]安装，或者在[发布页面][SwitchyOmega_Release]下载一份离线   
GFWList: `https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt`



### 服务器配置



### 服务端安装

	# bbr
	echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
	echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
	sysctl -p
	sysctl net.ipv4.tcp_available_congestion_control

	# shadowsocks
	sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list
	curl --show-error --retry 5 https://bootstrap.pypa.io/get-pip.py | python
	pip install shadowsocks
	
	# ubuntu
	apt install shadowsocks-libev
	
	# config
	
	{
		"server": "0.0.0.0",
		"method": "aes-256-cfb",
		"timeout": 1000,
		"port_password": {
		 
	  	}
	}
启动服务器

	ssserver --fast-open  -k <password> -d start
	
启动客户端

	sslocal -s <ip> -k <password> --fast-open -b 0.0.0.0 -d start
	
	
### 参考资料

* [wiki](https://github.com/shadowsocks/shadowsocks/wiki)
* [SwitchyOmega][SwitchyOmega_Home]
* [GFWList][gfwlist]
* [shadowsocks][shadowsocks]
* [一键安装最新内核并开启 BBR 脚本](https://teddysun.com/489.html)
* [安装 Google BBR 加速VPS网络](http://blog.leanote.com/post/quincyhuang/google-bbr)
* [Shadowsocks_archlinux](https://wiki.archlinux.org/index.php/Shadowsocks_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
* [如何启用 Shadowsocks 的多端口](https://teddysun.com/532.html)
* [Linux 使用iptables进行shadowsocks流量统计](http://zengwei.top/index.php/archives/8.html)


[SwitchyOmega_Home]: https://github.com/FelisCatus/SwitchyOmega
[SwitchyOmega_Chrome]: https://chrome.google.com/webstore/detail/padekgcemlokbadohgkifijomclgjgif
[SwitchyOmega_Release]: https://github.com/FelisCatus/SwitchyOmega/releases
[gfwlist]: https://github.com/gfwlist/gfwlist
[shadowsocks]: https://shadowsocks.org/en/index.html






