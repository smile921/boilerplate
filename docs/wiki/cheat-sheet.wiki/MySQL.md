
## 花式更新 (重复插入时更新)

REPLACE INTO feeds (p_id,p_name) VALUES (1,'Olle');

- [ON DUPLICATE KEY UPDATE重复插入时更新](http://lobert.iteye.com/blog/1604122)
- [深入mysql "ON DUPLICATE KEY UPDATE" 语法的分析](http://www.jb51.net/article/39255.htm)

### ON DUPLICATE KEY UPDATE 的坑

是用该语句当使用innoDB时会产生gap，及自增ID会空跳

- [insert-on-duplicate-key-update-with-two-contitions](http://stackoverflow.com/questions/39006858/insert-on-duplicate-key-update-with-two-contitions?noredirect=1)
- [https://bugs.mysql.com/bug.php?id=24432](https://bugs.mysql.com/bug.php?id=24432) 06年报的bug至今未解