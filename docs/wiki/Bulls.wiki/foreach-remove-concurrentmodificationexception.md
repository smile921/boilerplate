## 关于foreach-remove和ConcurrentModificationException关系
1. 并非foreach-remove一定抛出ConcurrentModificationException
2. 主要看hasNext和next方法(cursor和size是关键),比如是删除倒数第二个元素的时候,cursor和size正好相等，遍历结束则成功给删除倒数第二个元素

### 例子1
```
List<String> list = new ArrayList<>();
list.add("1");
list.add("2");

for (String str : list) {
    if ("1".equals(str)) {
        list.remove(str);
    }
}

```

1. 这个业务逻辑正常，不会抛出异常
2. ArrayList#Itr#hasNext return cursor != size
3. cursor = 0;size = 2;
4. ArrayList#Itr#next checkForComodification 此时modCount == expectedModCount == 2;cursor = i + 1;cursor = 1;
5. if ("1".equals(str) == true
6. ArrayList#remove(Object o)#fastRemove#modCount++,modCount变为3,--size,size变为1
7. 继续hasNext,cursor = 1,size = 1,跳出,结束


### 例子2

```
List<String> list2 = new ArrayList<>();
list2.add("1");
list2.add("2");

for (String str : list) {
    if ("2".equals(str)) {
        list2.remove(str);
    }
}
```

1. 这个却抛出了java.util.ConcurrentModificationException,为什么二者结果不同呢?
2. ArrayList#Itr#hasNext return cursor != size
3. cursor = 0;size = 2
4. ArrayList#Itr#next checkForComodification 此时modCount == expectedModCount == 2;cursor = i + 1;cursor = 1;
5. 继续hasNext/next,cursor = 2
6. ArrayList#remove(Objecto)#fastRemove#modCount++,modCount变为3,--size,size变为1
7. 继续hasNext,cursor = 2,size = 1,cursor!=size,继续next,此时checkForComodification,则modCount=3,而expectedModCount =2,则抛出异常



