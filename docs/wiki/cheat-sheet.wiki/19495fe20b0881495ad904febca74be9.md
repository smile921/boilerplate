
### 1. 新建Java类文件 ByteCodeSample.java

```
package com.upan.jvm.bytecode;  
  
public class ByteCodeSample {  
  
    private String msg = "hello world";  
      
    public void say() {  
        System.out.println(msg);  
    }  
      
}  
```
### 2. 编译
```
javac ByteCodeSample.java
```
### 3. 反编译

```
javap -c -l -s -verbose ByteCodeSample
```
下面是反编译后的结果
```
Classfile /F:/Code/demo/jvm/ByteCodeSample.class
  Last modified 2016-6-13; size 751 bytes
  MD5 checksum c92fa3fdff5b11edbb85590a04a34c3e
  Compiled from "ByteCodeSample.java"
public class com.an.jvm.bytecode.ByteCodeSample
  minor version: 0
  major version: 52
  flags: ACC_PUBLIC, ACC_SUPER
Constant pool:
   #1 = Methodref          #4.#26         // java/lang/Object."<init>":()V
   #2 = String             #27            // hello world
   #3 = Fieldref           #9.#28         // com/an/jvm/bytecode/ByteCodeSample.msg:Ljava/lang/String;
   #4 = Class              #29            // java/lang/Object
   #5 = Fieldref           #9.#30         // com/an/jvm/bytecode/ByteCodeSample.o:Ljava/lang/Object;
   #6 = Fieldref           #31.#32        // java/lang/System.out:Ljava/io/PrintStream;
   #7 = Methodref          #33.#34        // java/io/PrintStream.println:(Ljava/lang/String;)V
   #8 = Methodref          #33.#35        // java/io/PrintStream.println:(Ljava/lang/Object;)V
   #9 = Class              #36            // com/an/jvm/bytecode/ByteCodeSample
  #10 = Utf8               msg
  #11 = Utf8               Ljava/lang/String;
  #12 = Utf8               o
  #13 = Utf8               Ljava/lang/Object;
  #14 = Utf8               <init>
  #15 = Utf8               ()V
  #16 = Utf8               Code
  #17 = Utf8               LineNumberTable
  #18 = Utf8               say
  #19 = Utf8               test
  #20 = Utf8               StackMapTable
  #21 = Class              #36            // com/an/jvm/bytecode/ByteCodeSample
  #22 = Class              #29            // java/lang/Object
  #23 = Class              #37            // java/lang/Throwable
  #24 = Utf8               SourceFile
  #25 = Utf8               ByteCodeSample.java
  #26 = NameAndType        #14:#15        // "<init>":()V
  #27 = Utf8               hello world
  #28 = NameAndType        #10:#11        // msg:Ljava/lang/String;
  #29 = Utf8               java/lang/Object
  #30 = NameAndType        #12:#13        // o:Ljava/lang/Object;
  #31 = Class              #38            // java/lang/System
  #32 = NameAndType        #39:#40        // out:Ljava/io/PrintStream;
  #33 = Class              #41            // java/io/PrintStream
  #34 = NameAndType        #42:#43        // println:(Ljava/lang/String;)V
  #35 = NameAndType        #42:#44        // println:(Ljava/lang/Object;)V
  #36 = Utf8               com/an/jvm/bytecode/ByteCodeSample
  #37 = Utf8               java/lang/Throwable
  #38 = Utf8               java/lang/System
  #39 = Utf8               out
  #40 = Utf8               Ljava/io/PrintStream;
  #41 = Utf8               java/io/PrintStream
  #42 = Utf8               println
  #43 = Utf8               (Ljava/lang/String;)V
  #44 = Utf8               (Ljava/lang/Object;)V
{
  java.lang.Object o;
    descriptor: Ljava/lang/Object;
    flags:

  public com.an.jvm.bytecode.ByteCodeSample();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=3, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: aload_0
         5: ldc           #2                  // String hello world
         7: putfield      #3                  // Field msg:Ljava/lang/String;
        10: aload_0
        11: new           #4                  // class java/lang/Object
        14: dup
        15: invokespecial #1                  // Method java/lang/Object."<init>":()V
        18: putfield      #5                  // Field o:Ljava/lang/Object;
        21: return
      LineNumberTable:
        line 3: 0
        line 5: 4
        line 11: 10

  public void say();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=1, args_size=1
         0: getstatic     #6                  // Field java/lang/System.out:Ljava/io/PrintStream;
         3: aload_0
         4: getfield      #3                  // Field msg:Ljava/lang/String;
         7: invokevirtual #7                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
        10: return
      LineNumberTable:
        line 8: 0
        line 9: 10

  public void test();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=3, args_size=1
         0: aload_0
         1: getfield      #5                  // Field o:Ljava/lang/Object;
         4: dup
         5: astore_1
         6: monitorenter
         7: getstatic     #6                  // Field java/lang/System.out:Ljava/io/PrintStream;
        10: aload_0
        11: getfield      #5                  // Field o:Ljava/lang/Object;
        14: invokevirtual #8                  // Method java/io/PrintStream.println:(Ljava/lang/Object;)V
        17: aload_1
        18: monitorexit
        19: goto          27
        22: astore_2
        23: aload_1
        24: monitorexit
        25: aload_2
        26: athrow
        27: return
      Exception table:
         from    to  target type
             7    19    22   any
            22    25    22   any
      LineNumberTable:
        line 13: 0
        line 14: 7
        line 15: 17
        line 16: 27
      StackMapTable: number_of_entries = 2
        frame_type = 255 /* full_frame */
          offset_delta = 22
          locals = [ class com/an/jvm/bytecode/ByteCodeSample, class java/lang/Object ]
          stack = [ class java/lang/Throwable ]
        frame_type = 250 /* chop */
          offset_delta = 4
}
SourceFile: "ByteCodeSample.java"

```