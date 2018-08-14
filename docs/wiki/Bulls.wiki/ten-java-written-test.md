## 我招聘初中级Java工程师的10个笔试题目

1. Integer a = 16,Integer b = 16，请输出 a == b和 a.equals(b)的结果
2. 实现String的hashcode方法
3. 实现将一个int转为byte[]
4. HashMap、LinkedHashMap、TreeMap区别
5. ConcurrentSkipListMap是做什么的
6. 列举JDK类库中用到的设计模式，列举越多越好
7. 请说出程序的运行结果
    ```
    List<String> list = new ArrayList<>();
    list.add("1");
    list.add("2");
   
    for (String str : list) {
       if ("1".equals(str)) {
           list.remove(str);
       }
    }
   
    System.out.println(list);
    ```
8. 实现一个线程安全的单例(可写出多种实现方式，越多越好)
9. 写出ThreadPoolExecutor的构造函数
10. 伪代码实现LinkedBlockingQueue的put和take

## 简单剖析一下
1. 比较基础的问题，但是坑在于'IntegerCache'
2. 一个基础扎实的Java程序员如果不知道经典的String的hashcode实现，那真得应该去补补effective Java了
3. 这个考察程序员对于底层的'位运算基础'
4. 考察Java基本的数据结构
5. 这个很多程序员可能没用过，如果用过或者了解，那么是加分项
6. 这个和编程相关了，是否对于oop和模式有一定的了解
7. 这个问题看似简单，其实有坑，是否能彻底理解‘ConcurrentModificationException’
8. 比较基础，但是能看出很多东西，如‘double-checked’，enum，static holder
9. 多线程的基础，需要了解线程池的实现原理和建议使用方式
10. 多线程的一个运用，线程之间同步、锁分离等

## 我的评分和评价
1. 我出的这些题目主要考察Java基础，因为一个好的程序员，基础是非常重要的
2. 如果10个题目能拿60分，那说明及格了；如果80分以上，那很优秀，如果全部都答的不错，那么说明你非常不错了

ps:欢迎大家给我提issues