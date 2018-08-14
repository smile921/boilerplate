# ten written java

## 我招聘初中级Java工程师的10个笔试题目

1. Integer a = 16,Integer b = 16，请输出 a == b和 a.equals(b)的结果
2. 实现String的hashcode方法
3. 实现将一个int转为byte[]
4. HashMap、LinkedHashMap、TreeMap区别
5. ConcurrentSkipListMap是做什么的
6. 列举JDK类库中用到的设计模式，列举越多越好
7. 请说出程序的运行结果
    ````java
    List<String> list = new ArrayList<>();
    list.add("1");
    list.add("2");

    for (String str : list) {
       if ("1".equals(str)) {
           list.remove(str);
       }
    }

    System.out.println(list);
    ````
8. 实现一个线程安全的单例(可写出多种实现方式，越多越好)
9. 写出ThreadPoolExecutor的构造函数
10. 伪代码实现LinkedBlockingQueue的put和take

## 简单剖析一下
1. 比较基础的问题，但是坑在于'IntegerCache' (true,true) Integer ,Short ,Long 都有类似的Cache 缓存-128~127的数据
```java
    /**
     * Returns a hash code for this string. The hash code for a
     * {@code String} object is computed as
     * <blockquote><pre>
     * s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
     * </pre></blockquote>
     * using {@code int} arithmetic, where {@code s[i]} is the
     * <i>i</i>th character of the string, {@code n} is the length of
     * the string, and {@code ^} indicates exponentiation.
     * (The hash value of the empty string is zero.)
     * 31是一个不大不小的质数，是作为 hashCode 乘子的优选质数之一
     * 31可以被 JVM 优化，31 * i = (i << 5) - i
     * 可以降低哈希算法的冲突率,太大会出现int溢出 int 类型表示哈希值，结果会溢出
     *
     * 选择数字31是因为它是一个奇质数，如果选择一个偶数会在乘法运算中产生溢出，
     * 导致数值信息丢失，因为乘二相当于移位运算。选择质数的优势并不是特别的明显，
     * 但这是一个传统。同时，数字31有一个很好的特性，即乘法运算可以被移位和减法运算取代，
     * 来获取更好的性能：31 * i == (i << 5) - i，现代的 Java 虚拟机可以自动的完成这个优化。
     * @return  a hash code value for this object.
     * 参考 https://segmentfault.com/a/1190000010799123
     */
    public int hashCode() {
        int h = hash;
        if (h == 0 && value.length > 0) {
            char val[] = value;

            for (int i = 0; i < value.length; i++) {
                h = 31 * h + val[i];
            }
            hash = h;
        }
        return h;
    }
```
2. 一个基础扎实的Java程序员如果不知道经典的String的hashcode实现，那真得应该去补补effective Java了
3. 这个考察程序员对于底层的'位运算基础'
4. 考察Java基本的数据结构
5. 这个很多程序员可能没用过，如果用过或者了解，那么是加分项
6. 这个和编程相关了，是否对于oop和模式有一定的了解
7. 这个问题看似简单，其实有坑，是否能彻底理解`ConcurrentModificationException`
   ````java
    List<String> list = new ArrayList<>();
    list.add("1");
    list.add("2");

    for (String str : list) {
       if ("1".equals(str)) {
           list.remove(str);
       }
    }

    System.out.println(list); // [2]
    System.out.println(list);
		ArrayList<Integer> list1 = new ArrayList<Integer>();
        list1.add(2);
        Iterator<Integer> iterator = list1.iterator();
        while(iterator.hasNext()){
            Integer integer = iterator.next();//第二次执行异常
            if(integer==2)
                list1.remove(integer);
        }
    list = new ArrayList<Integer>();
        list.add(2);
        Iterator<Integer> iterator = list.iterator();
        while(iterator.hasNext()){
            Integer integer = iterator.next();
            if(integer==2)
                iterator.remove();   //注意这个地方，单线程下没问题
            // 多线程下
            // 1）在使用iterator迭代的时候使用synchronized或者Lock进行同步；
        　　//  2）使用并发容器CopyOnWriteArrayList代替ArrayList和Vector。
        }
    ````
    1. cursor：表示下一个要访问的元素的索引，从next()方法的具体实现就可看出
    2. lastRet：表示上一个访问的元素的索引
    3. expectedModCount：表示对ArrayList修改次数的期望值，它的初始值为modCount。
    4. modCount是AbstractList类中的一个成员变量

    分析第一段执行，先取到 1 字符串1与之内容相等，从list中remove成功，第二次hasNext 方法 `cursor =1, size =1 hasNext = false`
    直接return 了 ,并不会发生 ConcurrentModificationException
    第二段执行，第一次hasNext = true ，取出2 ，remove ok ，第二次 hasNext = false 因为 此时 cursor =1 ，size =0
    接着 iterator.next() 检查checkForComodification 不相等跑出异常 ConcurrentModificationException

8. 比较基础，但是能看出很多东西，如‘double-checked’，enum，static holder
9. 多线程的基础，需要了解线程池的实现原理和建议使用方式
10. 多线程的一个运用，线程之间同步、锁分离等

## 我的评分和评价
1. 我出的这些题目主要考察Java基础，因为一个好的程序员，基础是非常重要的
2. 如果10个题目能拿60分，那说明及格了；如果80分以上，那很优秀，如果全部都答的不错，那么说明你非常不错了
