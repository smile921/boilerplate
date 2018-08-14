# Topics

### [**Thread Group**](#thread-group)
  * [_**Constructors**_](#thread-group-constructors)
  * [_**Important Methods**_](#thread-group-methods)
### [**java.util.concurrent Package**](#con-pack)
* [_**Lock Interface**_](#lock)
* [_**Reentrant Lock**_](#reentrant)
### [**Thread Pool(Executor Framework)**](#pool)
* [_**Callable and Future**_](#callfuture)

### [**Difference between Callable and Runnable?**](#difcalrun)

### [**Thread Local**](#local)

### [**Thread Local vs Inheritance**](#inheritance)

***

# <a id="thread-group"></a>Thread Group

Based on functionality we can group threads into a single unit which is nothing but a Thread Group. That is Thread Group contains a group of threads.In addition to threads, Thread Group can also contains sub Thread Groups.<br/>

The main advantage of maintaining threads in a form of Thread Group is we can perform common operations very easily. Every thread in java belongs to some group. Main thread belongs to Main Group. Every Thread Group in java is a child thread of System Group either directly or indirectly hence System Group acts as root for all Thread Groups in Java. System Group contains several system level threads like **Finalizer**, **Reference Handler**, **Single Dispatcher**, **Attach Listener** etc.

## Example

```java

public class Example1 {

	public static void main(String[] args) {

		System.out.println(Thread.currentThread().getThreadGroup().getName());// Main
		System.out.println(Thread.currentThread().getThreadGroup().getParent().getName());// system

	}

}

```

**ThreadGroup** is a java class present in **java.lang package** and it is direct child of Object.

## <a id="thread-group-constructors"></a>Constructors

* **ThreadGroup g=new ThreadGroup(String groupName);**
It creates a new ThreadGroup with the specified group name. The parent of this new group is the ThreadGroup of currently executing thread.
* **ThreadGroup g=new ThreadGroup(ThreadGroup parentGroup, String groupName);**
It creates a new ThreadGroup with the specified group name. The parent of this new ThreadGroup is specified parent group.

## Example

```java
public class Example2 {

	public static void main(String[] args) {

		ThreadGroup g1 = new ThreadGroup("First Group");
		System.out.println(g1.getParent().getName());// Main
		ThreadGroup g2 = new ThreadGroup(g1, "Second Group");
		System.out.println(g2.getParent().getName());// First Group

	}

}
```

## <a id="thread-group-methods"></a>Important methods

1. **String getName();** - It returns name of the ThreadGroup.
1. **int getMaxPriority();** - It returns max priority of ThreadGroup.
1. **void setMaxPriority(int p);** - It set max priority of ThreadGroup. The default max priority is 10. Threads in the ThreadGroup that already has higher priority won't be affected but for newly added threads this max priority is applicable. 
1. **ThreadGroup getParent();** - It returns the parent group of current ThreadGroup.
1. **void list();** - It prints information about ThreadGroup on the console.
1. **int activeCount();** - It returns number of active threads in current ThreadGroup.
1. **int activeGroupCount();** - It returns number of active groups present in the current ThreadGroup.
1. **int enumerate(Thread[] t);** - It copy all the active threads of current ThreadGroup into provided thread array. In this case sub ThreadGroup threads will also considered.
1. **int enumerate(ThreadGroup[] g);** - It copy all active sub ThreadGroups into ThreadGroup array.
1. **boolean isDaemon();** - It checks whether ThreadGroup is daemon or not.
1. **void setDaemon(boolean b);**
1. **void interrupt();** - To interrupt all waiting or sleeping threads present in the ThreadGroup.
1. **void destroy();** - To destroy ThreadGroup and its sub ThreadGroup.

## Example
1) 

```java
public class Example3 {

	/*
	 * Threads in the ThreadGroup that already have higher priority won't be
	 * affected but for newly added threads this max priority is applicable.
	 * 
	 */
	public static void main(String[] args) {

		ThreadGroup g1 = new ThreadGroup("Thread Group");
		Thread t1 = new Thread(g1, "Thread1");
		Thread t2 = new Thread(g1, "Thread2");
		g1.setMaxPriority(3);
		Thread t3 = new Thread(g1, "Thread3");
		System.out.println(t1.getPriority());// 5
		System.out.println(t2.getPriority());// 5
		System.out.println(t3.getPriority());// 3

	}

}

```

2) 

```java

public class Example4 {


	public static void main(String[] args) throws InterruptedException {
		
		ThreadGroup pg=new ThreadGroup("Parent Group");
		ThreadGroup cg=new ThreadGroup(pg,"Child Group");
		MyThread t1=new MyThread(pg,"Child Thread1");
		MyThread t2=new MyThread(pg, "Child Thread2");
		t1.start();
		t2.start();
		System.out.println(pg.activeCount());//2
		System.out.println(pg.activeGroupCount());//1
		pg.list();
		Thread.sleep(10000);
		System.out.println(pg.activeCount());//0
		System.out.println(pg.activeGroupCount());//1
		pg.list();
	}

}

class MyThread extends Thread{
	
	public MyThread(ThreadGroup g,String name) {
		super(g,name);
	}
	
	public void run(){
		System.out.println("Child Thread");
		try{
			Thread.sleep(5000);
		}catch(InterruptedException exception){
			
		}
	}
	
}

```

3)

```java
//Write a program to display all active thread names belong to system group.
public class Example5 {

	public static void main(String[] args) {

		ThreadGroup systemGroup=Thread.currentThread().getThreadGroup().getParent();
		Thread[] t=new Thread[systemGroup.activeCount()];
		systemGroup.enumerate(t);
		for(Thread t1:t){
			System.out.println(t1.getName()+" is Daemon Thread -> "+t1.isDaemon());
		}
		
	}

}
```

# <a id="con-pack"></a>java.util.concurrent package

The problem with traditional synchronized keyword.

1. We are not having any flexibility to try for a lock without waiting.
1. There is no way to specify maximum waiting time for a thread to get lock so that thread will wait until getting the lock which may creates performance problems which may cause deadlock.
1. If a thread releases a lock then which waiting thread will get that lock we are not having any control on this.
1. There is no API to list out all waiting threads for a lock.
1. Synchronized keyword compulsory we have to used either at method level or within the method and it is not possible to use across multiple methods.

To overcome these problems sun people introduced java.util.concurrent.locks package in 1.5 version. It also provides several enhancement to the programmer to provide more control on concurrency.

## <a id="lock"></a>Lock Interface

Lock object is similar to implicit lock acquired by a thread to execute synchronized method or synchronized block. Lock implementation provide more extensive operations than traditional implicit locks.

### Important methods
1. **void lock();** - We can use this method to acquired a lock. If lock is already available then immediately current thread will get that lock. if lock is not already available then it will wait until getting the lock. It is exactly same behavior of synchronized keyword.
1. **boolean tryLock();** - To acquired the lock without waiting. If the lock is available then thread will get that lock and return true. If the lock is not available then this method returns false and can continue its execution without waiting. In this case thread never be entered into waiting state.
1. **boolean tryLock(long time, TimeUnit unit);** - If lock is available then thread will get the lock and continue its execution. If the lock is not available then the thread will wait until specified amount of time. Still if the lock is not available then thread can continue its execution.<br/>
_**TimeUnit**_ -  It is an enum present in java.util.concurrent package.
1. **void lockInterruptibly();** - Acquires the lock if it is available and returns immediately. If the lock is not available then it will wait. While waiting if the the thread is interrupted then thread won't get the lock.
1. **void unlock();** - To release the lock. To call this methods compulsory current thread should be owner of the lock otherwise we will get runtime exception saying illegalMonitorStateException.

## <a id="reentrant"></a>Reentrant lock

It is the implementation class of Lock Interface and it is the direct child class of Object. Reentrant means a thread can acquire same lock multiple times without any issue. Internally reentrant lock increments threads personal count whenever we call lock() method and decrements count value whenever thread calls unlock() method and lock will be released whenever count reaches zero.

### Constructors

* **ReentrantLock l=new ReentrantLock();** It creates an instance of Reentrant lock.
* **ReentrantLock l=new ReentrantLock(boolean fairness);** - It creates Reentrant lock with the given fairness policy. If the fairness is true then longest waiting thread can acquire the lock if it is available ie it follows first come first serve policy. If the fairness is false then which waiting thread will get the chance we can't expect. The default value for the fairness is false.

### Important methods

1. **void lock();**
1. **boolean tryLock();**
1. **boolean tryLock(long l, TimeUnit t);**
1. **void lockInterruptibly();**
1. **void unlock();**
1. **int getHoldCount();** - It returns number of holds on this lock by current thread.
1. **boolean isHeldByCurrentThread();** - It returns true if only if lock is hold by current thread.
1. **int getQueueLength()l** - It returns number of threads waiting for the lock.
1. **Collection getQueuedThreads();** - It returns collections of threads which are waiting to get the lock. 
1. **boolean hasQueuedThreads();** - It returns true if any thread waiting to get the lock.
1. **boolean isLocked();** - It returns true if the lock is acquired by same thread.
1. **boolean isFair();** - It returns true if the fairness policy is set with true value.
1. **Thread getOwner();** - It returns the thread which acquires the lock.

### Example 

1)
```java
public class Example1 {

	public static void main(String[] args) {

		ReentrantLock l = new ReentrantLock();
		l.lock();
		l.lock();
		System.out.println(l.isLocked());// true
		System.out.println(l.isHeldByCurrentThread());// true
		System.out.println(l.getQueueLength());// 0
		l.unlock();
		System.out.println(l.getHoldCount());// 1
		System.out.println(l.isLocked());// true
		l.unlock();
		System.out.println(l.isLocked());// false
		System.out.println(l.isFair());// false

	}

}

```
2)
```java
public class Example2 {

	public static void main(String[] args) {

		Display d=new Display();
		MyThread1 t1=new MyThread1(d, "Dhoni");
		MyThread1 t2=new MyThread1(d, "Yuvraj");
		t1.start();
		t2.start();
                /*
		 * If we will comment Line1 and Line2 then both the threads will be executed
		 * simultaneously and we will get irregular output.If we are not
		 * commenting Line1 and Line2 then the thread will be executed one by
		 * one and we will get regular output.
		 * 
		 */

	}

}

class Display{
	
	ReentrantLock l=new ReentrantLock();
	public void wish(String name){
		l.lock();
		for(int i=0;i<10;i++){
			System.out.print("Good Morning : ");
			try{
				Thread.sleep(2000);
			}catch(InterruptedException exception){
				
			}
			System.out.println(name);
		}
		l.unlock();
	}
	
}

class MyThread1 extends Thread{
	
	Display d;
	String name;
	public MyThread1(Display d,String name) {
	
		this.d=d;
		this.name=name;
	}
	public void run(){
		d.wish(name);
	}
}
```
3)
```java
public class Example3 {

	public static void main(String[] args) {

		MyThread t1 = new MyThread("First Thread");
		MyThread t2 = new MyThread("Second Thread");
		t1.start();
		t2.start();

	}

}

class MyThread extends Thread {

	static ReentrantLock l = new ReentrantLock();

	public MyThread(String name) {
		super(name);
	}

	public void run() {
		if (l.tryLock()) {
			System.out.println(Thread.currentThread().getName() + " got lock and performing safe operation.");

			try {
				Thread.sleep(2000);
			} catch (InterruptedException exception) {
			}
			l.unlock();

		} else {
			System.out.println(Thread.currentThread().getName()
					+ " unable to get the lock and hence performing alternative operation.");
		}
	}

}

```

4)
```java
public class Example4 {

	public static void main(String[] args) {

		MyThread2 t1 = new MyThread2("First Thread");
		MyThread2 t2 = new MyThread2("Second Thread");
		t1.start();
		t2.start();

	}

}

class MyThread2 extends Thread {

	static ReentrantLock l = new ReentrantLock();

	public MyThread2(String name) {
		super(name);
	}

	public void run() {
		try {
			do {
				if (l.tryLock(5000, TimeUnit.MILLISECONDS)) {
					System.out.println(Thread.currentThread().getName() + " got lock and performing safe operation.");
					Thread.sleep(30000);
					l.unlock();
					System.out.println(Thread.currentThread().getName() + " released lock.");
					break;
				} else {
					System.out.println(Thread.currentThread().getName() + " unable to get the lock and will try again.");
				}
			} while (true);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

}
```
# <a id="pool"></a>Thread Pools(Executor Framework)

Creating a new thread for every job may create performance and memory problem. To overcome this we should go for thread pool. Thread pool is a pool of already created threads ready to do our job. Java 1.5 version introduces **Thread Pool Framework** to implement thread pool. Thread Pool Framework also known as Executor Framework. We can create a thread pool as follows.

```java
ExecutorService service=Executors.newFixedThreadPool(3);
```
We can submit a Runnable job by try using submit method.

```java
service.submit(job);
```
We can shutdown executor service by using shutdown() method.

```java
service.shutdown();
```

## Example

```java
public class Example1 {

	public static void main(String[] args) {

		PrintJob[] jobs = {

				new PrintJob("Rohit"), 
				new PrintJob("Bhavna"), 
				new PrintJob("Shivani"), 
				new PrintJob("Javamultiplex"),
				new PrintJob("Sumit") };

		ExecutorService service = Executors.newFixedThreadPool(3);
		for (PrintJob job : jobs) {
			service.submit(job);
		}
		service.shutdown();

	}
}

class PrintJob implements Runnable {

	String name;

	public PrintJob(String name) {
		this.name = name;
	}

	@Override
	public void run() {
		System.out.println(name + " job started by Thread : " + Thread.currentThread().getName());
		try {
			Thread.sleep(5000);
		} catch (InterruptedException exception) {

		}
		System.out.println(name + " job completed by Thread : " + Thread.currentThread().getName());
	}

}
```
In above example three threads are responsible to execute 5 jobs so that a single thread can be reused for multiple jobs.

_**Note - While developing web servers and Application servers we can use Thread Pool concept.**_

## <a id="callfuture"></a>Callable and Future

In the case of Runnable job thread won't return anything after completing the job. If a thread is required to return some result after execution then we should go for Callable. Callable interface contains only one method.

```java
public Object call() throws Exception
```
If we submit a callable object to executor then after completing the job, thread return an object of the type Future ie Future object can be used to retrieve the result from Callable job.

## Example

```java
public class Example2 {

	public static void main(String[] args) throws InterruptedException, ExecutionException {

		MyCallable[] jobs={
				
			
				new MyCallable(10),
				new MyCallable(20),
				new MyCallable(30),
				new MyCallable(40),
				new MyCallable(50),
				new MyCallable(60)
				
		};
		
		ExecutorService service=Executors.newFixedThreadPool(3);
		for(MyCallable job:jobs){
			Future<Object> f=service.submit(job);
			System.out.println(f.get());
		}
		service.shutdown();
		
	}

}

class MyCallable implements Callable<Object> {

	int num;

	public MyCallable(int num) {
		this.num = num;
	}

	public Object call() throws Exception {
		System.out.println(Thread.currentThread().getName() + " is resposible to find sum of first " + num + " numbers");
		int sum = 0;
		for (int i = 1; i <= num; i++) {
			sum += i;
		}
		return sum;
	}

}

```

# <a id="difcalrun"></a>Difference between Runnable and Callable?

Runnable | Callable
---|---
If a thread is not required to return anything after completing the job then we should go for Runnable. | If a thread is required to return something after completing the job then we should go for Callable.
Contains only one method run() | Contains only one method call()
Runnable job not required to return anything and hence return type of run() method is void | Callable job is required to return something and hence return type of call() method is Object
Within the run() method if there is any chance of raising checked exception compulsory we should handle by using try catch because we can't use throws keyword for run() method|Inside call() method if there is any chance of raising checked exception then we are not required to handle by using try catch because call() method already throws Exception
Present in java.lang package| Present in java.util.concurrent package
Introduced in 1.0 version | Introduced in 1.5 version

# <a id="local"></a>Thread Local

ThreadLocal class provides Thread Local variables. ThreadLocal class maintains values per thread basis. Each ThreadLocal object maintains a separate value like user id, transaction id etc for each thread that access that object. Thread can access its local value, can manipulate its value and even can remove its value. In every part of the code which is executed by the thread we can access its local variable.

**Example**- Consider a servlet which invokes some business methods. We have a requirement to generate a unique transaction id for each and every request and we have to pass this transaction id to the business methods. For this requirement we can use ThreadLocal class to maintain a separate transaction id for every request ie for every thread.

### Note

1. ThreadLocal class introduced in 1.2v and enhanced in 1.5v.
1. ThreadLocal can be associated with thread scope.
1. Total code which is executed by the thread has access to corresponding ThreadLocal variable.
1. A thread can access its own local variable and can't access other ThreadLocal variables.
1. One thread entered into dead state all its local variables are by default eligible for garbage collection.

## Constructor

* **ThreadLocal tl=new ThreadLocal();** - Creats a ThreadLocal variable.

## Methods

1. **Object get();** - Returns the value of ThreadLocal variable associated with every thread.
1. **Object initialValue();** - Returns initial value of ThreadLocal variable associated with current thread. The default implementation of this method returns null. To customize our own initial value we have to override this method.
1. **void set(Object newValue);** - To set a new value.
1. **void remove();** - To remove the value of ThreadLocal variable associated with current thread. It is newly added method in 1.5 version. After removal If we are trying to access it will be reinitialized once again by invoking its initial value method.

## Example

1)

```java
public class Example1 {

	public static void main(String[] args) {
		
		ThreadLocal<String> tl=new ThreadLocal<String>();
		System.out.println(tl.get());//null
		tl.set("Durga");
		System.out.println(tl.get());//Durga
		tl.remove();
		System.out.println(tl.get());//null
		
	}
	
}

```

2)

```java
public class Example2 {

	
	public static void main(String[] args) {
		
		ThreadLocal<Object> tl=new ThreadLocal<Object>(){
			
			public Object initialValue(){
				return "abc";
			}
			
		};
		
		System.out.println(tl.get());//abc
		tl.set("Durga");
		System.out.println(tl.get());//Durga
		tl.remove();
		System.out.println(tl.get());//abc
		
	}
	
}

```

3)

```java
public class Example3 {

	public static void main(String[] args) {
		
		Customer c1=new Customer("One");
		Customer c2=new Customer("Two");
		Customer c3=new Customer("Three");
		c1.start();
		c2.start();
		c3.start();
		
	}
	
}

class Customer extends Thread {

	static Integer custId = 0;
	private static ThreadLocal<Object> tl = new ThreadLocal<Object>() {

		protected Integer initialValue() {
			return ++custId;
		}
	};

	public Customer(String name) {
		super(name);
	}

	public void run() {
		System.out.println(Thread.currentThread().getName() + " executing with customer id : " + tl.get());
	}

}

```
# <a id="inheritance"></a>ThreadLocal vs Inheritance

* Parent threads ThreadLocal variables by default not available to the child thread. If we want to make parent threads thread local variable value available to the child thread then we should go for **InheritableThreadLocal** class.
* By default child thread value is exactly same as parent thread value but we can provide customize value for child thread by overriding childValue() method.

## Constructor

* **InheritableThreadLocal tl=new InheritableThreadLocal();**

## Methods

InheritableThreadLocal is the child class of ThreadLocal and hence all methods present in ThreadLocal by default available to InheritableThreadLocal. In addition to these methods it contains only one method.

**public Object childValue(Object parentValue);**

## Example

```java
public class Example1 {

	
	public static void main(String[] args) {
		ParentThread pt=new ParentThread();
		pt.start();
	}
}

class ParentThread extends Thread {

	public static InheritableThreadLocal<Object> tl = new InheritableThreadLocal<Object>() {

		public Object childValue(Object p) {
			return "CC";
		}

	};

	public void run() {
		tl.set("PP");
		System.out.println("Parent Thread Value = " + tl.get());
		ChildThread ct=new ChildThread();
		ct.start();
	}

}

class ChildThread extends Thread{
	
	public void run(){
		System.out.println("Child thread value = "+ParentThread.tl.get());
	}
	
}

```

In above program output is as follows.

_**Parent thread value=PP<br/>**_
_**Child thread value=CC**_

If we replace InheritableThreadLocal with ThreadLocal and if we are not overriding childValue() method then the output is as follows.

_**Parent thread value=PP<br/>**_
_**Child thread value=null**_

If we are maintaining InheritableThreadLocal and not overriding childValue() method then output is as follows.

_**Parent thread value=PP<br/>**_
_**Child thread value=PP**_
