# Composer

[Composer](https://getcomposer.org/) / [Composer 中文](https://getcomposer.org/)  是 PHP 用来管理依赖（dependency）关系的工具。你可以在自己的项目中声明所依赖的外部工具库（libraries），Composer 会帮你安装这些依赖的库文件。

[](https://packagist.org/)

### Install

	curl -sS https://getcomposer.org/installer | php
	sudo mv composer.phar /usr/local/bin/composer
	
### Packagist

[Packagist](https://packagist.org/) / [Packagist中国全量镜像](http://pkg.phpcomposer.com/)


系统全局配置

	composer config -g repo.packagist composer https://packagist.phpcomposer.com
	
单个项目配置

	composer config repo.packagist composer https://packagist.phpcomposer.com