## 队列的实现

### 队列头文件queue.h

```c
/**
 * 一个队列模块的接口
 */

#include <stdlib.h>

//队列元素类型
#define QUEUE_TYPE  int

/**
 * create_queue
 * 创建一个队列，参数指定队列的最大数量
 */
void create_queue(size_t size);

/**
 * destroy_queue
 * 销毁一个队列，这个函数只适用于链式和动态分配数组的队列
 */
void destroy_queue(void);

/**
 * insert
 * 向队列插入一个元素
 */
void insert(QUEUE_TYPE value);

/**
 * delete
 * 删除一个元素
 */
void delete(void);

/**
 * first
 * 返回第一个元素
 */
QUEUE_TYPE first(void);

/**
 * is_empty
 * 是否为空
 */
int is_empty(void);

/**
 * is_full
 * 是否已满
 */
int is_full(void);
```

### 队列的静态数组实现

```c
/**
 * 一个用静态数组实现的队列，数组长度通过#define来调整
 */

#include "queue.h"
#include <stdio.h>
#include <assert.h>

//队列中元素的最大数量
#define QUEUE_SIZE  100
//数组的长度
#define ARRAY_SIZE  (QUEUE_SIZE + 1)

//存储队列元素的数组
static  QUEUE_TYPE  queue[ARRAY_SIZE];
//队头指针
static  size_t  front = 1;
//队尾指针
static  size_t  rear = 0;

/**
 * insert
 */
void insert(QUEUE_TYPE value){
    assert(!is_full());
    rear = (rear + 1) % ARRAY_SIZE;
    queue[rear] = value;
}

/**
 * delete
 */
void delete(void){
    assert(!is_empty());
    front = (front + 1) % ARRAY_SIZE;
}

/**
 * first
 */
QUEUE_TYPE first(void){
    assert(!is_empty());
    return queue[front];
}

/**
 * is_empty
 */
int is_empty(void){
    return (rear + 1) % ARRAY_SIZE == front;
}

/**
 * is_full
 */
int is_full(void){
    return (rear + 2) % ARRAY_SIZE == front;
}
```
