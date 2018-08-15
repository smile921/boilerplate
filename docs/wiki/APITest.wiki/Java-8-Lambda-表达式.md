1 :
`new Thread( () -> System.out.println("Thread running."));`
Lambda常用的一个用法是取代匿名内部类, 但是Lambda的作用不止于此

2:
Lambda表达式的另一个重要用法，是和Stream一起使用。Stream is a sequence of elements supporting sequential and parallel aggregate operations。Stream就是一组元素的序列，支持对这些元素进行各种操作，而这些操作是通过Lambda表达式指定的。可以把Stream看作Java Collection的一种视图，就像迭代器是容器的一种视图那样（但Stream不会修改容器中的内容）。下面例子展示了Stream的常见用法。

`List<String> list = Arrays.asList("1one", "two", "three", "4four");`
`list.stream().filter( str -> )....;`

创建Lambda表达式的5种不同形式
1: `Runnable r1=()-> sth;`
2: `Runnable r2= () -> {sth; sth;};`
3: `ActionListener oneArgument = event -> sth;`
4: `BinaryOperator<Long> add = (x,y) -> x+y;`
5: `BinaryOperator<Long> add= (Long x, Long y) -> x+y;`

3: 集合中流的使用，list.stream()
其中针对流 包含两个概念
1 惰性求值 - 如果返回的是stream 那么是惰性求值
2 及早求值 - 如果返回是另一个值或为空， 那么就是及早求值

流常用api -
collect 由流生成一个列表， 是一个及早求值操作
map 通过一个函数将一种类型转换为另一种类型，map操作就可以使用该函数，将一个流转换为一个新的流
filter 遍历数据并检查其中的元素时
flatMap 可用stream替换值，然后将多个Stream 连接成一个stream
`Stream.of(asList(1,2),asList(3,4)).flatMap(num -> num.stream()).collect(Collectors.toList());`
reduce 可以从一组值中生成一个值
```java
List<Integer> list=Stream.of(asList(1,2),asList(3,4)).flatMap(num -> num.stream()).collect(Collectors.toList());
		int min=list.stream().reduce(0, (acc,ele)-> acc+ele);
```

接口默认方法实现:
```java
public interface test
{
public default void hi() { System.out.println("hi");};
}
```
当实现类不覆盖该默认方法，则使用该接口的默认方法。

Optional 对象 java.util.Optional
Optional 是为核心类库新设计的一个数据类型，用来替换null值， 使用Optional 有两个目的：
1）鼓励适时检查变量是否为空
2）将可能为空的值文档化
```java
Optional<String> a=Optional.of("a");
a.get();
Optional opt=Optional.empty();
Optional empty=Optional.ofNullable(null);
opt.isPresent();
如果空获取其它值
empty.OrElse("b");
empty.OrElseGet(()->"c");
```
转换成值:
collect(Collectors.averagingInt( lambda ));

数据分块：
partitioningBy(Stream)

数据分组：
根据任意值对分组
.collect(groupingBy(Predicate));

Collectors.joining(",","[","]"); //1:分隔符，2:左边界 3:右边界

**数据并行化**
调用流Steam对象的parellel方法就能让其具有并行操作的能力，如果想从一个集合类创建一个集合流，parallelStream就能立即获得一个拥有并行能力的流。


**Lambda 化应用要点**
1：进进出出，摇摇晃晃
`log.debug(()->"debug info.");`

2: 使用继承，覆盖其中一个方法
`ThreadLocal<String> thisStr=ThreadLocal.withInitial(() -> "Jason");`
