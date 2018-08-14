# Need of Concurrent Collection

1. Traditional collection object(like ArrayList, HashMap etc) can be accessed by multiple threads simultaneously and there may be chance of data inconsistency problem and hence these are not thread safe.
1. Already existing thread safe collections(Vector, Hashtable, synchronizedList(), synchronizedSet(), synchronizedMap()) performance wise not up to the mark.
1. Because of every operation even for read operation also, total collection will be loaded by only one thread at a time and it increases waiting time of threads.
1. Another big problem with traditional collections is while one thread iterating collection, the other threads are not allowed to modify collection object simultaneously. If we are trying to modify then we will get **ConcurrentModificationExceptio**n.
1. Hence these traditional collection objects are not suitable for scalable multithreaded applications.
1. To overcome these problems sun people introduced Concurrent Collections in 1.5 version. 

## Example

```java
package com.javamultiplex.concurrentcollection;

import java.util.ArrayList;
import java.util.Iterator;

public class Example1 implements Runnable{
	
	public static ArrayList<String> list=new ArrayList<>();
	public void run() {
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println("Child thread updated");
		list.add("D");
	}
	
	public static void main(String[] args) throws Exception{
		
		list.add("A");
		list.add("B");
		list.add("C");
		Runnable runnable=new Example1();
		Thread thread=new Thread(runnable);
		thread.start();
		
		Iterator<String> iterator=list.iterator();
		while(iterator.hasNext()) {
			String string=iterator.next();
			System.out.println("Main thread iterating list and current object is "+string);
			Thread.sleep(3000);
		}
		
	}
	
}

``` 
# Difference between Traditional and Concurrent Collections

Traditional | Concurrent
---|---
Not Thread Safe | Thread Safe
Performance wise low | Performance wise high because different type of locking mechanism.
**ConcurrentModificationException** thrown when one thread is iterating and other thread trying to update collection. | **CocurrentModificationException** never come.

# Concurrent Collection Classes

1. **ConcurrentHashMap**
1. **CopyOnWriteArrayList**
1. **CopyOnWriteArraySet**

## ConcurrentMap(I)

### Important Methods
1. **Object putIfAbsent(Object key,Object value)** - To add entry to the map if the specified key is not already available.

_**Method Defination**_

```java
Object putIfAbsent(Object key,Object value) {
		if(!map.containsKey(key)) {
			map.put(key,value);
		}else {
			return map.get(key);
		}
	}
	
```

put() | putIfAbsent()
---|---
If key is already present old value will be replaced with new value and return old value|If the key is present then entry won't be added and return value associated with key. If key is not present then only entry will be added.

_**Example**_

```java
public class Example2 {

	public static void main(String[] args) {
		
		ConcurrentHashMap<Integer, String> map=new ConcurrentHashMap<>();
		map.put(101, "Rohit");
		map.put(101, "Raman");
		System.out.println(map);//{101=Raman}
		map.putIfAbsent(101, "javamultiplex");
		System.out.println(map);//{101=Raman}
		
	}
}
```