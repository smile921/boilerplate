SSH 及SSD配置

### 一、服务器端配置
SSHD配置位置:/etc/ssh/sshd_config 

用户登录公钥存放路径：
/opt/usere/.ssh

该目录下存放文件：
authorized_keys  id_rsa  id_rsa.pub  known_hosts
其中authorized_keys  中配置的是 可以凭借公钥登录的公钥信息 多个公钥分行显示

```
ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAvSi4dSdZ3K1Qw4nbYq26iLC6ieq/B6Mue36vaCSJHbo9xuSw4gUbhAeLT0YjWLA3RTLsuudUHalb0jlpm1gpP2A04Usi0ivHa5Px/V8f3iK9xnbeo9Lkmpm+3KbvXlSRg4E9aCXpvQpdmpiEB3aUBlZi/z/HC3j1UwSuQ8ykKBIy6dOcQXOu7Y7TMYQv8uj9w5y4yGpMi5ILrYcB3+1A/Q4QOaURgC6/GP1YA4XpogF3MXPYrq1+Av9Rz7g4OjB8jcDDTuAClhYGx8CSpkYHxVe5n/bVTb2GgzH+8Zns5KwfNzZxmY55/mwcWJpRE40MckxtGigfV3jMHNMPOJJfsw== a@b.net
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCmvso6PZ0wv5yZ4pwqCLk6H21rym0HFJ1E1D9bc8432YU4XV8BYpN8Pjc4aiv3kSOdEYLzHI/iBTWq9WnxHg7C6rXnYIXCUfYg1zq3fcZ0z0Ey4jwE3dF+YXw1T8tzOLPM+lxssxMXQZdaT2aycC1Y+udKC6CGFDVTbtAt+4bVhItWLdg/DZHZXPO2AS5HKKBUq/UhUALK8l7JZKNsy69ak/atE73yfSvCpbmZD4e0Hc+umJDcV2S8+mQXn7/nzAcGq6oH8jY94UAIs/4jrChhXK5EBA1rCB/JpGPULm84gtQPH4NzHJ7SDmE4mDe+MhnFcgpvw19AkFU9nGE+J5PT a@b.net
```

### 二、linux 为ssh客户端
linux & GitBash
首先生成本机的公钥  ssh-keygen  -t rsa，在这过程中输入 passphrase。
-t type     Specify type of key to create.
在.ssh 目录下会生成两个文件id_rsa和id_rsa.pub，把id_rsa.pub内容拷贝到authorized_keys中就可以了


[ssh服务器配置](http://www.cnblogs.com/ggjucheng/archive/2012/08/19/2646032.html)