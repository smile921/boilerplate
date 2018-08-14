
### 1. Buffer

Vert.x Buffer is just a wrapper around [netty Buffer](http://static.netty.io/3.5/api/index.html?org/jboss/netty/buffer/ChannelBuffer.html). I don't see it providing any additional functionality yet. Have to make sure why it exists.

**Update**: the `getBuffer(int start, int end)` and similar copy slicing methods are not directly supported by netty Buffer.


### 2. Message

The interface of a Message is simple:

```java

public abstract class Message<T>  {
  /**
   * The body of the message
   */
  public T body;

  /**
   * The reply address (if any)
   */
  public String replyAddress;

  /**
   * Same as {@code reply(T message)} but with an empty body
   */
  public void reply() {
    reply(null);
  }

  /**
   * Reply to this message. If the message was sent specifying a reply handler, that handler will be
   * called when it has received a reply. If the message wasn't sent specifying a receipt handler
   * this method does nothing.
   */
  public void reply(T message) {
    reply(message, null);
  }

  /**
   * The same as {@code reply(T message)} but you can specify handler for the reply - i.e.
   * to receive the reply to the reply.
   */
  public abstract void reply(T message, Handler<Message<T>> replyHandler);

}
```

There is :

1. The `body` of the message, usually a JsonObject or other elementary data types like Integer.

1. The `replyAddress`, for replying messages

1. A bunch of `reply` methods

**Question**: Is there a simpler message type that has no reply? It will save some memory

### 3. JsonObject and JsonArray

JsonObject is a wrapper of `Map<String, Object>` that adds getXXX() and putXXX() methods for convenience.

JsonArray is a wrapper of `List<Object>`

They are designed for interface integrity and user efficiency.
