## Data Types

There are several data types that is used everywhere in vert.x:

1. **Buffer** : for network communication
1. **Message** : for event bus communication
1. **JsonObject**/**JsonArray** : for JSON support

See details here: [[Data Types| vert.x-data]]

Theses 3 types, together with basic data types such as **Integer**, **Double**, **String**, etc. Are all that we need in data communication in vert.x.

## Verticle

In the vert.x universe, there are only one kind of entity: the **Verticle**.

**Verticle** means *Particle* and *Vertex* in the context of **Vert.x**. It's a unit of functionality that is actually independent in code and deployment. 

Usually a verticle does only two things:

1. Do its **work**, what ever it is designed to be.
1. Communicate with other verticles with *Messages* send via the **Event Bus**.

## Event Bus

Verticles communicate via **Event Bus**, by sending and receiving messages on it.

The model is very simple:

* There are many **Address**es in the EventBus, each is identified by a string. You can view it as mailboxes with names. 

* Verticles can listen on an address, by registering a handler method with that address. 

* When a message is sent to that address, registered handlers are invoked to deal with this message. 

**Note**: All verticles have access to the EventBus, you can call it with `verticle.eventBus()`.


#### Some details:

1. Each message has a *replyAddress* property and a bunch of `reply(..)` methods, that could be used to reply a message to the sender.

1. Verticles can listen to multiple addresses, each with a handler. To listen on an address, call verticle.registerHandler("address", handler) method. You can see that this is async.

1. There are two modes of communication: Pub/Sub and Point-to-Point

    To use Pub/Sub, call `eb.publish("address", message)`, to use Point-to-Point, call `eb.send("address", message)`.

    In Pub/Sub mode, all listening verticles are invoked at the same time; while in Point-to-Point mode, only one verticle is selected and invoked. 

    Usually we need only one verticle listening a Point-to-Point mode. But if we want multiple verticles to do the same work for performance, we can register multiple verticles to one address, then these verticles are dispatched in a round-robin fashion. It looks like a load-balancing mechanism.

1. Send/Reply is implemented by generating a random/unique address and send it within the message, and on the receiver side, replying is actually sending a message to this unique address.

### Handler

Handler is just a function. We don't have function type in Java, so vert.x use a universal type `Handler` to mimic a function. 

A Handler is a one parameter function, to invoke it, call `apply(T arg)`, which is Handler's only interface.

Handler is used every where in vert.x:

1. Responding to network requests.

1. Responding to event bus messages.

1. Used as call backs (implementation wise, it's the same with #2)

**Note**: In Java SE 8, vert.x may change Handler to lambda implementation for better performance.
