# common goods

## lottie airbnb/lottie-web
Easily add high-quality animation to any native app.
http://airbnb.io/lottie/

Lottie is an iOS, Android, and React Native library that renders After Effects animations in real time, allowing apps to use animations as easily as they use static images.

[https://www.lottiefiles.com](https://www.lottiefiles.com) 这里是一个分享交流lottiefiles的网站
[预览lottie 效果](https://www.lottiefiles.com/preview)

## jesseduffield/lazygit
A simple terminal UI for git commands, written in Go with the gocui library.

Are YOU tired of typing every git command directly into the terminal, but you're too stubborn to use Sourcetree because you'll never forgive Atlassian for making Jira? This is the app for you!

## a copy of my .npmrc config

``` bash
registry=https://registry.npm.taobao.org/
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
electron_mirror=https://npm.taobao.org/mirrors/electron/
disturl=https://npm.taobao.org/dist
NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
NVM_IOJS_ORG_MIRROR=http://npm.taobao.org/mirrors/iojs
PHANTOMJS_CDNURL=https://npm.taobao.org/dist/phantomjs
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
SASS_BINARY_SITE=http://npm.taobao.org/mirrors/node-sass
SQLITE3_BINARY_SITE=http://npm.taobao.org/mirrors/sqlite3
PYTHON_MIRROR=http://npm.taobao.org/mirrors/python

```

## How to Run Framer JS on Windows

Since releasing the Fluent Design Toolkit, there’s been a lot of interest in the Windows Framer Toolkit. Framer is a powerful tool that we use every day here at Microsoft, which may lead some to wonder How do you run Framer on Windows?

Framer Studio is only available for Mac. But since Framer’s code is open source, you can compile and run on Windows without much hassle (ok, a little bit). There are two options to do this. Option 1 is based on node.js, uses VS Code, and Gulp. We use this method a lot, especially since we create and use a lot of modules, and it offers full module support. Option 2 is easier, uses Atom, but has some limitations, especially with modules.

### **Option 1— Framer Boilerplate**
* Install node.js
* Install Git (if you haven’t already)
* Install Gulp — Open up Command Prompt and type npm install -g gulp-cli. Gulp enables compiling a Framer project and viewing it in any browser.
* Download Framer Boilerplate to a place that you’ll remember. You’ll be coming back to this for each Framer project you create. Framer Boilerplate is what does all the Framery magic.
* Copy the Framer Boilerplate files to your working directory. I put mine at C:\src\[project-name]
* If you are using any Modules, put them in the C:\src\[project-name]\app\modules\ directory. You’ll see we’ve already included some basic modules from the Windows Framer Toolkit.
* In Command Prompt, browse to your project cd \src\[project-name]and type npm install.
* Open up your project in VS Code. Because CoffeeScript files are whitespace dependent, it’s important to make sure your code editor has the correct whitespace and tab settings.
  * Tab space: 4
  * Tab type: hard
* In Command Prompt, run a gulp server by typing gulp from the root of your project.
* Browse to http://localhost:3000 and witness the magic!

## spring boot starter config
```java

@Configuration  //指定这个类是一个配置类
@ConditionalOnXXX  //在指定条件成立的情况下自动配置类生效
@AutoConfigureAfter  //指定自动配置类的顺序
@Bean  //给容器中添加组件
@ConfigurationPropertie结合相关xxxProperties类来绑定相关的配置
@EnableConfigurationProperties //让xxxProperties生效加入到容器中
自动配置类要能加载
将需要启动就加载的自动配置类，配置在META‐INF/spring.factories
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
org.springframework.boot.autoconfigure.admin.SpringApplicationAdminJmxAutoConfiguration,\

```
**spring boot @Conditional**
```java
@ConditionalOnBean：当SpringIoc容器内存在指定Bean的条件
@ConditionalOnClass：当SpringIoc容器内存在指定Class的条件
@ConditionalOnExpression：基于SpEL表达式作为判断条件
@ConditionalOnJava：基于JVM版本作为判断条件
@ConditionalOnJndi：在JNDI存在时查找指定的位置
@ConditionalOnMissingBean：当SpringIoc容器内不存在指定Bean的条件
@ConditionalOnMissingClass：当SpringIoc容器内不存在指定Class的条件
@ConditionalOnNotWebApplication：当前项目不是Web项目的条件
@ConditionalOnProperty：指定的属性是否有指定的值
@ConditionalOnResource：类路径是否有指定的值
@ConditionalOnSingleCandidate：当指定Bean在SpringIoc容器内只有一个，或者虽然有多个但是指定首选的Bean
@ConditionalOnWebApplication：当前项目是Web项目的条件
```
以上注解都是元注解 @Conditional 演变而来的，根据不用的条件对应创建以上的具体条件注解。

**在Spring中也有一种类似与Java SPI的加载机制。它在META-INF/spring.factories文件中配置接口的实现类名称，然后在程序中读取这些配置文件并实例化。这种自定义的SPI机制是Spring Boot Starter实现的基础。**

> spring-core包里定义了SpringFactoriesLoader类，这个类实现了检索META-INF/spring.factories文件，并获取指定接口的配置的功能。在这个类中定义了两个对外的方法： ` loadFactories -> loadFactoryNames -> loadSpringFactories  `
  * loadFactories。根据接口类获取其实现类的实例，这个方法返回的是对象列表。
  * loadFactoryNames。根据接口获取其接口类的名称，这个方法返回的是类名的列表。
> 上面的两个方法的关键都是从指定的ClassLoader中获取spring.factories文件，并解析得到类名列表， 加载factories文件 从代码中我们可以知道，在这个方法中会遍历整个ClassLoader中所有jar包下的spring.factories文件。也就是说我们可以在自己的jar中配置spring.factories文件，不会影响到其它地方的配置，也不会被别人的配置覆盖

## Ligature kudakurage Symbols
[Ligature kudakurage Symbols](http://kudakurage.com/ligature_symbols/) 一个web font 库

## chrome plugins

* [CSS Peeper](#) Extract CSS and build beautiful styleguides.
* [WhatRuns](#) Discover what runs a website. Frameworks, Analytics Tools, Wordpress Plugins, Fonts - you name it.
* [Proxy SwitchyOmega](#) 轻松快捷地管理和切换多个代理设置
* [Vimium](#) The Hacker's Browser. Vimium provides keyboard shortcuts for navigation and control in the spirit of Vim.
* [StyleURL](#) StyleURL lets you export and share CSS tweaks instantly.
* [JSON-handle](#) It's a browser and editor for JSON document.You can get a beautiful view
* [Image Downloader](#) Browse and download images on a web page.
* [Ember Inspector](#) Tool for debugging Ember applications.
* [Vue.js devtools](#) Chrome and Firefox DevTools extension for debugging Vue.js applications.

## [trailofbits/algo](https://github.com/trailofbits/algo)
Algo VPN is a set of Ansible scripts that simplify the setup of a personal IPSEC VPN. It uses the most secure defaults available, works with common cloud providers, and does not require client software on most devices. See our release announcement for more information.

**Features**
* Supports only IKEv2 with strong crypto (AES-GCM, SHA2, and P-256) and WireGuard
* Generates Apple profiles to auto-configure iOS and macOS devices
* Includes a helper script to add and remove users
* Blocks ads with a local DNS resolver (optional)
* Sets up limited SSH users for tunneling traffic (optional)
* Based on current versions of Ubuntu and strongSwan
* Installs to DigitalOcean, Amazon Lightsail, Amazon EC2, Microsoft Azure, Google Compute Engine, Scaleway, OpenStack or your own Ubuntu 18.04 LTS server

## WireGuard
在 WireGuard 里，客户端和服务端基本是平等的，差别只是谁主动连接谁而已。双方都会监听一个 UDP 端口。双方都需要一对密钥。双方都需要把对方的公钥加进来。最后一步，谁主动连接，谁就是客户端
> Shadowsocks 是 Socks5 代理，WireGuard 和 GoVPN 是全局代理，走 UDP 协议，OpenVPN 支持 TCP/UDP 协议。UDP 协议很容易被宽带运营商 QoS 限速，在高峰期丢包严重，很影响速度，不过大多数翻墙软件在省际或国际出口都会收到 GFW 干扰

## tizonia

一个命令行音乐播放器，支持 Spotify, Google Play Music, YouTube 等服务
