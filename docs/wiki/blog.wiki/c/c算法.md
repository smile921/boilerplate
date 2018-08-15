用C语言呈现各种算法

### 显示数组

```c
/**
 * 显示数组数据
 */
void display(int *arr, int len){
    if(len>0){
        for(int i=0; i<len; i++){
            printf("%d\t", arr[i]);
        }
        printf("\n");
    }
}
```

### 选择排序

> 循环遍历第N次选出最N大的数据放在第N个位置上

```c
/**
 * 选择排序
 * 循环遍历第N次选出最N大的数据放在第N个位置上
 */
void select_sort(int *arr, int len){
    if(len <= 0){
        return;
    }
    int index,tmp;
    for(int i=0; i<len; i++){
        index = i;
        for(int j=i+1; j<len; j++){
            if(arr[index] < arr[j]){
                index = j;
            }
        }
        tmp = arr[i];
        arr[i] = arr[index];
        arr[index] = tmp;
    }
}
```

### 冒泡排序

> 循环遍历，两两比较，把大的数往后移

```c
/**
 * 冒泡排序
 * 循环遍历，两两比较，把大的数往后移
 */
void maopao_sort(int *arr, int len){
    int tmp;
    for(int j=len; j>0; j--){
        for(int i=0; i<j; i++){
            if(arr[i] > arr[i+1]){
                tmp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = tmp;
            }
        }
    }

}
```

### 快速排序

> 针对数组arr，首先任意选取一个数据（通常先用数组的第一个数）作为关键数据，然后将所有比它小的数据都放到它前面，所有比它大的数据放到它后面

```c
/**
 * 快速排序
 * 针对数组arr，首先任意选取一个数据（通常先用数组的第一个数）作为关键数据，
 * 然后将所有比它小的数据都放到它前面，所有比它大的数据放到它后面
 */
void quick_sort(int *arr, int start, int end){
    if(start >= end){
        return;
    }
    int key = arr[start];
    
    int i = start,j = end;
    while(i<j){

        while(i<j && key <= arr[j]){
            j--;
        }
        arr[i] = arr[j];

        while(i<j && key >= arr[i]){
            i++;
        }
        arr[j] = arr[i];
    }

    arr[i] = key;
    quick_sort(arr, start, i-1);
    quick_sort(arr, i+1, end);
}
```

### 主程序

```c
#include <stdio.h>
int main(void){
    int arr[] = {1,4,6,8,0,2,3,5,9,7};
    int len = 10;
    display(arr,len);
    //select_sort(arr,len);
    //maopao_sort(arr,len);
    quick_sort(arr, 0, len-1);
    display(arr,len);
    return 0;
}
```
