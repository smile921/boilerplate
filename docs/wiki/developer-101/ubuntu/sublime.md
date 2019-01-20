# Sublime Text 3

* [Sublime Text](https://www.sublimetext.com/)
* [Sublime Text 2/3 输入法修复](https://github.com/lyfeyaj/sublime-text-imfix)


#### 下载软件

	curl -o /tmp/sublime.tar.bz2 https://download.sublimetext.com/sublime_text_3_build_3124_x64.tar.bz2
	
#### 安装软件

	sudo tar jxvf /tmp/sublime.tar.bz2 -C /opt
	sudo mv /opt/sublime_text_3 /opt/sublime_text
	sudo ln -s /opt/sublime_text/sublime_text /usr/bin/subl
	
#### 中文输入法修复

	cd /tmp
	git clone https://github.com/lyfeyaj/sublime-text-imfix.git
	cd sublime-text-imfix
	./sublime-imfix