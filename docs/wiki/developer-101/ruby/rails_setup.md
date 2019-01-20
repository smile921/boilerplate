# Rails 开发环境安装

本文介绍如何在 Ubuntu 16.04 下搭建 [Rails](http://rubyonrails.org/) 开发环境。使用 [Rbenv](https://github.com/rbenv/rbenv) 安装和管理 [Ruby](https://www.ruby-lang.org), 由于国内网络的原因我们使用了 [RubyGems 镜像 - 淘宝网](https://ruby.taobao.org/) 和 [RubyGems 镜像 - Ruby China](https://gems.ruby-china.org/) 来加快安装速度。 开发教程请参考 [Rails圣经](https://ihower.tw/rails4/) 和 [Ruby on Rails 教程](https://railstutorial-china.org/)


### Rbenv 安装

此步骤需要使用 <code>sudo su -</code>切换到管理员后执行。

	apt-get -yq install autoconf bison build-essential libssl-dev libyaml-dev \
	                    libreadline6-dev zlib1g-dev libncurses5-dev libffi-dev \
	                    libgdbm3 libgdbm-dev
	git clone https://github.com/sstephenson/rbenv.git /usr/local/rbenv
	git clone https://github.com/sstephenson/ruby-build.git \
	          /usr/local/rbenv/plugins/ruby-build
	
	echo '# rbenv setup' >> /etc/profile.d/rbenv.sh
	echo 'export RBENV_ROOT=/usr/local/rbenv'  >> /etc/profile.d/rbenv.sh
	echo 'export PATH="$RBENV_ROOT/bin:$PATH"' >> /etc/profile.d/rbenv.sh
	echo 'eval "$(rbenv init -)"' >> /etc/profile.d/rbenv.sh
	
	chgrp -R adm /usr/local/rbenv
	chmod -R g+rwx /usr/local/rbenv
	
	
	
### Ruby 安装

	source /etc/profile.d/rbenv.sh
	export RUBY_BUILD_MIRROR_URL=https://ruby.taobao.org/mirrors/ruby/ruby-2.3.1.tar.bz2#
	export RUBY_CONFIGURE_OPTS="--disable-install-doc"
	rbenv install 2.3.1
	rbenv global 2.3.1
	rbenv shell 2.3.1
	
### Rails 安装

	gem sources --add https://gems.ruby-china.org/ --remove https://rubygems.org/ -V
	echo 'gem: --no-document' >> ~/.gemrc
	gem install rails -V
	bundle config mirror.https://rubygems.org https://gems.ruby-china.org
	
	
### 数据库

可以选择一个或多个多个数据库进行实验。

**sqlite**

	apt-get -yq install sqlite3 libsqlite3-dev
	
**mysql**

	apt-get -yq install mysql-server mysql-client libmysqlclient-dev
	
	# 解决 Ubuntu 16.04 上不能直接用 root 用户登录
	mysql -u root -e "update mysql.user set plugin='mysql_native_password' WHERE User='root'; FLUSH PRIVILEGES;"
	
**postgresql**

	apt-get -yq install postgresql libpq-dev
	
	
### JS 执行环境

[Could not find a JavaScript runtime.](https://ruby-china.org/topics/692)


	apt-get -yq install nodejs nodejs-dev

	
	
	


