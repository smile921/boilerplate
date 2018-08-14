```xml
<package namespace="/hello">
  <action name="world" class="org.apache.struts.helloworld.action.HelloWorldAction" method="execute"> 
    <result name="success">/HelloWorld.jsp</result>
  </action> 
</package>
```

```java
@Controller
class HelloWorldAction {
   @RequestMapping(value="/hello/world", method=HttpMethod.GET)
   public String helloWorld(String name) {
     return "/HelloWorld";
   }
}

```

```java
class HelloWorldController {
  public static Result helloWorld() {
    return ok("Got request " + request() + "!");
  }
}
```

```java
RouteMatcher routeMatcher = new RouteMatcher();

routeMatcher.get("/hello/world", new Handler<HttpServerRequest>() {
    public void handle(HttpServerRequest req) {
        req.response.end("Hello! " + req.params().get("name"));
    }
});
```