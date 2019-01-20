### ssh-copy-id帮你建立信任

* `~/.ssh/authorized_keys`
* `~/.ssh/id_rsa.pub`

自动上传公钥

	ssh-copy-id nameB@machineB
	
	
指定端口

	ssh-copy-id "-p 22000 nameB@machineB"
	
指定公钥

	ssh-copy-id -i ~/.ssh/id_rsa.pub "-p 10022 user@server"

> 参考资料
 
* [ssh-copy-id帮你建立信任](http://roclinux.cn/?p=2551) 
* [ssh-copy-id](https://linux.die.net/man/1/ssh-copy-id)
	
