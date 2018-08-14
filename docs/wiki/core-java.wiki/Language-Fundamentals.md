# Agenda

1. ### Identifiers
2. ### Reserved Words
3. ### Data Types
4. ### Literals
5. ### Arrays
6. ### Types of Variables
7. ### Var-arg method
8. ### Main method
9. ### Command line arguments
10. ### Java coding standards


***


1.  ## Identifiers:

A name in java program is called identifier which can be used for identification purpose. It can be a method name, variable name, class name or label name.

**Example - How many identifiers are presents in the following program.**

``` java
class Test{

public static void main(String[] args){

int x=10;

}

}
```
 
**Answer - There are 5 identifiers present Test, main, String, args, x.**

### Rules for defining java identifiers.

* The only allowed characters in Java identifiers are a to z, A to Z, 0 to 9, $, _. If we are using any other character we will get compile time error.
Ex - Total_number - Valid , Total# - Invalid

* Identifiers can't start with a digit.
Ex - Total123 - Valid, 123Total - Invalid

* Java Identifiers are case sensitive because Java language itself is treated as case sensitive programming language.

Ex

``` java
class Test{

//Differentiated w.r.t case
int number = 10;
int Number = 10;
int NUMBER = 20;

}
```
