# Stream
It is a channel or medium, it able to allow data in continuous flow from input devices to Java Applications and from Java Applications to output device. There are two types of stream.
1. Byte Oriented Streams
1. Character Oriented Streams

## Byte Oriented Streams
It able to allow data in the form of bytes only from input devices to java application and from java application to output devices. There are two types of Byte Oriented Streams.
1. **InputStream** – It able to allow data in the form of bytes in continuous flow from input devices to java applications.<br/>
_**Example**_ – ByteArrayInputStream,  FileInputStream, DataInputStream, ObjectInputStream, StringBufferInputStream etc
1. **OutputStream** - It able to allow data in the form of bytes in continuous flow from java applications to output devices.<br/>
_**Example**_ -  ByteArrayOutputStream, FileOutputStream, DataOutputStream, ObjectOutputStream, StringBufferOutputStream, PrintStream etc.

#### Note
* In Byte Oriented Streams each and every data length is 1 byte.
* In Byte Oriented Streams, all stream classes are ended with “Stream”.

## Character Oriented Streams
It able to allow data in continuous flow in the form of characters from input devices to java applications and from java applications to output devices. There are two types of Character Oriented Streams.
1. **Reader** - It able to carry data in the form of characters in continuous flow from input devices to java applications.<br/>
_**Example**_ – CharArrayReader, FileReader, BufferedReader, InputStreamReader, StringBufferReader etc.
1. **Writer** - It able to allow data in the form of characters in continuous flow from java applications to output devices.<br/>
_**Example**_ – CharArrayWrite, FileWriter, BufferedWriter, PrintWriter etc

#### Note
* In Character Oriented Streams, each and every data item length is ‘2’ bytes.
* In Character Oriented Streams, all stream classes are ended with either Reader or Writer.

> Java has declared all the streams in the form of predefined classes in a package “java.io” package.

# File Operations
1. **FileOutputStream**
1. **FileInputStream**
1. **FileReader**
1. **FileWriter**

## FileOutputStream

It able to carry data from java application to a particular target file.

### Example 

```java
public class FileOutputStreamDemo {

	public static void main(String[] args) {

		try (FileOutputStream fileOutputStream = new FileOutputStream("file1.txt", true)) {
			String data = "Rohit Agarwal";
			byte[] b = data.getBytes();
			fileOutputStream.write(b);
		} catch (IOException exception) {
			exception.printStackTrace();
		}
	}

}

```
## FileInputStream

It able to carry data from a particular source file to java application.

### Example 

``` Java
public class FileInputStreamDemo {

	public static void main(String[] args){

		try (FileInputStream fileInputStream = new FileInputStream("file1.txt")) {
			int size = fileInputStream.available();
			byte[] b = new byte[size];
			fileInputStream.read(b);
			String data = new String(b);
			System.out.println(data);
		} catch (FileNotFoundException exception) {
			exception.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}

```