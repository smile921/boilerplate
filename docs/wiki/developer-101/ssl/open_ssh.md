# OpenSSH


#### 介绍

*  [RSA算法原理（一）](http://www.ruanyifeng.com/blog/2013/06/rsa_algorithm_part_one.html)
* [RSA算法原理（二）](http://www.ruanyifeng.com/blog/2013/07/rsa_algorithm_part_two.html)



#### 密钥管理

**生成密钥**

生成ssh公钥认证所需的公钥( id_rsa )和私钥文件( id_rsa.pub ), 保存在~/.ssh目录下

	ssh-keygen -t rsa -C _example_@gmail.com
	
**加载密钥**			

	ssh-add [private_key](默认加载: ~/.ssh/id_rsa)			
**查看已加载的密钥**

	ssh-add -l
	
**删除加载的密码**

	ssh-add -d <identity> 			# 卸载指定私钥
	ssh-add -D 						# 卸载所有私钥
	
	
#### 无密码登录远程服务器

上传公钥
	
	＃ 自动
	ssh-copy-id -i ~/.ssh/id_rsa.pub <user>@<ip_or_domain>
	
	# 手动
	ssh <user>@<ip_or_domain>
	echo "<public_key>" >> ~/.ssh/authorized_keys
	
测试密钥是否可用

	ssh -T root@192.168.1.1
	
	
#### 文件传输

	
	# 上传文件
	scp <file_name> <user>@<ip_or_domain>:<path>
	
	# 下载文件
	scp <user>@<ip_or_domain>:<path> <file_name>
	

	

	
