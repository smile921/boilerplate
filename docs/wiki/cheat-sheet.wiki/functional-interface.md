## Java8 函数式接口

### 概述
在rt.jar 下面的  **java.util.function** 包下面
```
BiConsumer
BiFunction
BinaryOperator
BiPredicate
BooleanSupplier
Consumer
DoubleBinaryOperator
DoubleConsumer
DoubleFunction
DoublePredicate
DoubleSupplier
DoubleToIntFunction
DoubleToLongFunction
DoubleUnaryOperator
Function
IntBinaryOperator
IntConsumer
IntFunction
IntPredicate
IntSupplier
IntToDoubleFunction
IntToLongFunction
IntUnaryOperator
LongBinaryOperator
LongConsumer
LongFunction
LongPredicate
LongSupplier
LongToDoubleFunction
LongToIntFunction
LongUnaryOperator
ObjDoubleConsumer
ObjIntConsumer
ObjLongConsumer
Predicate
Supplier
ToDoubleBiFunction
ToDoubleFunction
ToIntBiFunction
ToIntFunction
ToLongBiFunction
ToLongFunction
UnaryOperator

```

### Runnable  执行一个没有参数和返回值的操作
``` java
@FunctionalInterface
public interface Runnable {
    public abstract void run();
}
```

### `Supplier<T>` 提供一个 T 类型的值 (供应商)
``` java
@FunctionalInterface
public interface Supplier<T> {
    /**
     * Gets a result.
     *
     * @return a result
     */
    T get();
}
```

### `Consumer<T>` 处理一个T类型的值 （消费者）
``` java
@FunctionalInterface
public interface Consumer<T> {
    void accept(T t);
    default Consumer<T> andThen(Consumer<? super T> after) {
        Objects.requireNonNull(after);
        return (T t) -> { accept(t); after.accept(t); };
    }
}
```
### `BiConsumer<T, U>` 处理T类型和U类型
``` java
@FunctionalInterface
public interface BiConsumer<T, U> {
    void accept(T t, U u);
    default BiConsumer<T, U> andThen(BiConsumer<? super T, ? super U> after) {
        Objects.requireNonNull(after);

        return (l, r) -> {
            accept(l, r);
            after.accept(l, r);
        };
    }
```

### `Function<T, R>` 接收一个参数为T 的函数，返回类型为R
```java
@FunctionalInterface
public interface Function<T, R> {
    R apply(T t);

    default <V> Function<V, R> compose(Function<? super V, ? extends T> before) {
        Objects.requireNonNull(before);
        return (V v) -> apply(before.apply(v));
    }

    default <V> Function<T, V> andThen(Function<? super R, ? extends V> after) {
        Objects.requireNonNull(after);
        return (T t) -> after.apply(apply(t));
    }

    /**
     * 返回一个函数，返回值为传入的参数.
     */
    static <T> Function<T, T> identity() {
        return t -> t;
    }
}
```

###  `BiFunction<T, U, R>` 接受两个参数，返回 R类型
```java
@FunctionalInterface
public interface BiFunction<T, U, R> {

    /**
     * 接受两个参数，返回 R类型.
     */
    R apply(T t, U u);

    /**
     * 返回一个函数
     */
    default <V> BiFunction<T, U, V> andThen(Function<? super R, ? extends V> after) {
        Objects.requireNonNull(after);
        return (T t, U u) -> after.apply(apply(t, u));
    }
}
```

### `UnaryOperator<T>`
```java
@FunctionalInterface
public interface UnaryOperator<T> extends Function<T, T> {
    /**
     * 返回输入参数.
     */
    static <T> UnaryOperator<T> identity() {
        return t -> t;
    }
}
```

### `BinaryOperator<T>`
```java
@FunctionalInterface
public interface BinaryOperator<T> extends BiFunction<T,T,T> {
    /**
     * 返回较小元素
     */
    public static <T> BinaryOperator<T> minBy(Comparator<? super T> comparator) {
        Objects.requireNonNull(comparator);
        return (a, b) -> comparator.compare(a, b) <= 0 ? a : b;
    }

    /**
     * 返回较大元素
     */
    public static <T> BinaryOperator<T> maxBy(Comparator<? super T> comparator) {
        Objects.requireNonNull(comparator);
        return (a, b) -> comparator.compare(a, b) >= 0 ? a : b;
    }
}
```

### `Predicate<T>` 谓词
```java
@FunctionalInterface
public interface Predicate<T> {

    /**
     * 使用传入的参数计算.
     */
    boolean test(T t);

    /**
     * 返回一个组合谓词
     */
    default Predicate<T> and(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) && other.test(t);
    }

    /**
     * 返回一个否定的结果
     */
    default Predicate<T> negate() {
        return (t) -> !test(t);
    }

    /**
     * 返回组合谓词，或 关系
     */
    default Predicate<T> or(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) || other.test(t);
    }

    /**
     * 返回一个谓词判定是否相等
     */
    static <T> Predicate<T> isEqual(Object targetRef) {
        return (null == targetRef)
                ? Objects::isNull
                : object -> targetRef.equals(object);
    }
}
```

### `BiPredicate<T, U>`
```java
@FunctionalInterface
public interface BiPredicate<T, U> {

    /**
     * 使用两个参数计算结果
     */
    boolean test(T t, U u);

    /**
     * 返回组合谓词，与 关系
     */
    default BiPredicate<T, U> and(BiPredicate<? super T, ? super U> other) {
        Objects.requireNonNull(other);
        return (T t, U u) -> test(t, u) && other.test(t, u);
    }

    /**
     * 返回否定的结果
     */
    default BiPredicate<T, U> negate() {
        return (T t, U u) -> !test(t, u);
    }

    /**
     * 返回【或】的结果
     */
    default BiPredicate<T, U> or(BiPredicate<? super T, ? super U> other) {
        Objects.requireNonNull(other);
        return (T t, U u) -> test(t, u) || other.test(t, u);
    }
}
```
