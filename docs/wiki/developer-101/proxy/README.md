# 代理服务器


### 参考资料

* [透明代理、匿名代理、混淆代理、高匿代理有什么区别？](https://blog.csdn.net/a19860903/article/details/47146715)
* [爬虫和IP代理](https://journal.ethanshub.com/post/category/gong-cheng-shi/-python-pa-chong-dai-li)
* [自己搭建亿级爬虫IP代理池](http://www.xnathan.com/2017/03/02/squid-proxy-pool/)
* `google tinyproxy vs squid vs polipo`


### 相关软件


* [Squid](http://www.squid-cache.org/)
* [Squid中文权威指南](http://zyan.cc/book/squid/index.html)

### 技术要点


类型 | REMOTE_ADDR | HTTP_VIA| HTTP_X_FORWARDED_FOR
----| ----------- | -------- | -------------------
通明代理| Proxy| Proxy| Your
匿名代理| Proxy| Proxy| Proxy
混淆代理| Proxy| Proxy| Random
高匿代理| Proxy | not | not

### 重要支持

* [V2Ray](https://www.v2ray.com/)