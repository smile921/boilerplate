# Homebrew 新手入门

**准备工作**

* `xcode-select --install`
* `sudo spctl --master-disable` - [OS X：关于 Gatekeeper](https://support.apple.com/zh-cn/HT202491)

**安装**

	/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	brew tap caskroom/cask
	
	echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile
	echo "export HOMEBREW_NO_AUTO_UPDATE=1" | tee -a ~/.bash_profile
	source ~/.bash_profile
	
**常用命令**

* `brew search <keyword>`: 根据关键词搜索命令行软件
* `brew install <name>`: 安装命令行软件
* `brew cask search <keyword>`: 根据关键词搜索带界面的软件
* `brew cask install <name>`:  安装带界面的软件

**常用软件**

* [QQ](https://im.qq.com/macqq/) - `qq`
* [EIM - 企业QQ](http://b.qq.com/eim/main.html) - `eim`
* [DingTalk - 钉钉](https://www.dingtalk.com/) - `dingtalk`
* [Ali Wangwang - 阿里旺旺](https://alimarket.taobao.com/markets/qnww/portal-group/ww/index) - `aliwangwang`
* [Baidu Cloud - 百度云](https://pan.baidu.com/) - `baiducloud`
* [Baidu Input - 百度输入法](https://srf.baidu.com/input/mac.html) - `baiduinput`
* [Sogou Input - 搜狗输入法](https://pinyin.sogou.com/mac/) - `sogouinput`
* [NetEase cloud music - 网易音乐](https://music.163.com/) - `neteasemusic`
* [qqmusic - QQ音乐](https://y.qq.com/) - `qqmusic`
* [The Unarchiver - 解压缩](https://theunarchiver.com/) - `the-unarchiver`
* [LibreOffice - 办公软件](https://www.libreoffice.org) - `LibreOffice`
* [IINA - 视频播放器](https://lhc70000.github.io/iina/) - `iina`
* [Folx - 下载工具](https://mac.eltima.com/download-manager.html) - `Folx`
* [迅雷](http://mac.xunlei.com/) - `thunder`
* [Google Chrome - 谷歌浏览器](https://www.google.com/chrome/) - `google-chrome`
* [Mozilla Firefox - 火狐浏览器](https://www.mozilla.org/firefox/) - `firefox`
* [PDF Expert - PDF阅读 - 收费](https://pdfexpert.com/) - `pdf-expert`


**开发相关**

* [Insomnia - API调试](https://insomnia.rest/) - `insomnia`
* [Charles - HTTP抓包 - 收费](https://www.charlesproxy.com/) - `charles`
* [Wireshark - 网络抓包](https://www.wireshark.org/) - `wireshark`
* [GNS3 - 网络模拟软件](https://www.gns3.com/) - `gns3`
* [dash - 开发文档](https://kapeli.com/dash) - `dash`
* [wechat web devtools - 微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html) - `wechatwebdevtools`
* [Github Atom - 编辑器](https://atom.io/) - `atom`
* [Sublime Text - 编辑器](https://www.sublimetext.com/3) - `sublime-text`
* [MacDown - Markdown编辑器](https://macdown.uranusjr.com/) - `macdown`
* [GIMP - 位图处理](https://www.gimp.org/) - `gimp`
* [Sketch - 矢量设计 - 收费](https://www.sketchapp.com/) - `sketch`
* [XMind - 思维导图](https://www.xmind.net/) - `xmind`
* [ShadowsocksX-NG - Cocks5 Client](https://github.com/shadowsocks/ShadowsocksX-NG/) - `shadowsocksx-ng`
* [KeePassX - 密码管理](https://www.keepassx.org/) - `keepassx`
* [iTerm2 - 命令行终端](https://www.iterm2.com/) - `iterm2`
* [Sequel Pro - MySQL管理](http://www.sequelpro.com/) - `sequel-pro`
* [LICEcap - 屏幕录制](https://www.cockos.com/licecap/) - `licecap`
* [LaunchRocket - 服务启动管理](https://github.com/jimbojsb/launchrocket) - `launchrocket`
* [Oracle VirtualBox - 虚拟机](https://www.virtualbox.org/) - `virtualbox` - `virtualbox-extension-pack`
* [Vagrant](https://www.vagrantup.com/) - `vagrant`
* [Docker CE](https://www.docker.com/community-edition) - `docker`
* [XQuartz - X11](https://www.xquartz.org/) - `xquartz`



**参考资料**

* [Homebrew](https://brew.sh/)
* [Homebrew - Cask](https://caskroom.github.io/)
* [Homebrew Bottles 源使用帮助](http://mirrors.ustc.edu.cn/help/homebrew-bottles.html)



