# Java HashMap非线程安全
HashMap的实现里没有锁的机制，因此它是线程不安全的
* 多个线程同时操作一个hashmap就可能出现不安全的情况
* HashMap 扩容的时候，会发生转移，可能会不安全甚至严重是出现死循环
* 构造entry<K,V>单链表时，也会出现不安全的情况。
ConcurrentHashMap 是线程安全的

## ref
[ JAVA HASHMAP的死循环 ](https://coolshell.cn/articles/9606.html)
[ HASH COLLISION DOS 问题 ](https://coolshell.cn/articles/6424.html)
