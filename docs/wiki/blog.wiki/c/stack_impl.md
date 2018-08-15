## 堆栈的实现

### 堆栈的头文件stack.h

```c
/**
 * 堆栈模块接口
 */

//堆栈存储类型
#define STACK_TYPE int

/**
 * push
 * 把一个元素压入堆栈中
 */
void push(STACK_TYPE value);

/**
 * pop
 * 从堆栈中弹出一个值
 */
STACK_TYPE pop(void);

/**
 * top
 * 返回堆栈顶部的元素，但不对其进行修改
 */
STACK_TYPE top(void);

/**
 * is_empty
 * 堆栈是否为空
 */
int is_empty(void);

/**
 * is_full
 * 堆栈是否已满
 */
int is_full(void);


/**
 * 动态数组方式实现堆栈
 */

/**
 * create_stack
 * 创建堆栈，参数可以指定多少个元素
 */
void create_stack(size_t size);

/**
 * destroy_stack
 * 销毁堆栈，释放堆栈所使用的内存
 */
void destroy_stack(void);
```

### 静态数组方式的实现

```c
/**
 * 静态数组实现方式，数组的长度只能通过修改#define定义
 */

#include "stack.h"
#include <assert.h>

//堆栈中值的最大限制
#define     STACK_SIZE      100

//堆栈数组
static      STACK_TYPE      stack[STACK_SIZE];
//堆栈顶部元素指针
static      int             top_element = -1;          

/**
 * push
 */
void push(STACK_TYPE value){
    assert(!is_full());
    stack[++top_element] = value;
}

/**
 * pop
 */
STACK_TYPE pop(void){
    assert(!is_empty());
    return stack[top_element--];
}

/**
 * top
 */
STACK_TYPE top(void){
    return static[top_element];
}

/**
 * is_empty
 */
int is_empty(void){
    return top_element == -1;
}

/**
 * is_full
 */
int is_full(void){
    return top_element == STACK_SIZE - 1;
}
```

### 动态数组的实现方式

```c
/**
 * 一个用动态数组实现的堆栈
 */

#include "stack.h"
#include <stdio.h>
#include <stdlib.h>
#include <malloc.h>
#include <assert.h>

//指向堆栈的指针
static      STACK_TYPE      *stack;
//堆栈大小
static      size_t          stack_size;
//堆栈头元素指针
static      int             top_element = -1;

/**
 * create_stack
 */
void create_stack(size_t size){
    assert(stack_size == 0);
    stack_size = size;
    stack = malloc(stack_size * sizeof(STACK_TYPE));
    assert(stack != NULL);
}

/**
 * destroy_stack
 */
void destroy_stack(void){
    assert(stack_size > 0);
    stack_size = 0;
    free(stack);
    stack = NULL;
}

/**
 * push
 */
void push(STACK_TYPE value){
    assert(!is_full());
    stack[++top_element] = value;
}

/**
 * pop
 */
STACK_TYPE pop(void){
    assert(!is_empty());
    return stack[top_element--];
}

/**
 * top
 */
STACK_TYPE top(void){
    assert(!is_empty());
    return stack[top_element];
}

/**
 * is_empty
 */
int is_empty(void){
    assert(stack_size > 0);
    return top_element == -1;
}

/**
 * is_full
 */
int is_full(void){
    assert(stack_size > 0);
    return top_element == stack_size -1;
}
```

### 链表的实现方式

```c
/**
 * 一个用链表实现的堆栈，这个堆栈没有长度限制
 */

#include "stack.h"
#include <stdio.h>
#include <stdlib.h>
#include <malloc.h>
#include <assert.h>

#define FALSE 0

/**
 * 定义堆栈元素结构
 */
typedef struct stack_node{
    STACK_TYPE  value;
    struct  struct_node *next;
} StackNode;

//指向第一个结点的指针
static  StackNode   *stack;

/**
 * create_stack
 */
void create_stack(size_t size){}

/**
 * destroy_stack
 */
void destroy_stack(void){
    while(!is_empty()){
        pop();
    }
}

/**
 * push
 */
void push(STACK_TYPE value){
    StackNode *node = malloc(sizeof(StackNode));
    assert(node != NULL);
    node->value = value;
    node->next = stack;
    stack = node;
}

/**
 * pop
 */
STACK_TYPE pop(void){
    assert(!is_empty());
    StackNode *first = stack;
    stack = first->next;
    STACK_TYPE res = fisrt->value;
    return res;
}

/**
 * top
 */
STACK_TYPE top(void){
    assert(!is_empty());
    return stack->value;
}

/**
 * is_empty
 */
int is_empty(void){
    return stack == NULL;
}

/**
 * is_full
 */
int is_full(void){
    return FALSE;
}
```
