# HTTP 实用指南

### 01 初始



**初识HTTP：**

![01](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/08-Http/pic/01.png)

- HTTP协议名为：超文本传输协议
- HTTP协议是应用层协议，在底层是基于TCP作为传输协议（传输层协议有TCP和UDP）
- 请求 响应
- 简单可扩展
- 无状态



---

### 02 协议分析



**02-1 协议发展：**

![02](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/08-Http/pic/02.png)

> 其中HTTP/1.1版本是公认的标准版本，且使用最久的版本



**02-2 报文分析：**

![03](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/08-Http/pic/03.png)

- 上图是req和res的报文，包含：起始行、请求头、实体行
- Req起始行
  - 重要包含：req请求的method方法、
- req起始行
  - 重要包含：状态码



![04](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/08-Http/pic/04.png)

- GET请求：获取数据
- POST请求：提交数据
- 安全的（safe）Method：不会修改服务器的数据的方法：GET、HEAD、OPTIONS
- 幂等的（idempotent）Method：同样的请求被执行一次与连续执行多次效果是一样的，服务器的状态也是一样的，所有 safe 的方法都是 idempotent 的：GET、HEAD、OPTIONS、DELETE、PUT



![05](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/08-Http/pic/05.png)



![06](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/08-Http/pic/06.png)



![07](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/08-Http/pic/07.png)

- HTTP请求是一个无状态的请求，但在实际生活中，希望HTTP请求可以带一些状态信息，比如用户是否登陆
- 浏览器会把已有权限的cookie默认带上



![08](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/08-Http/pic/08.png)



![09](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/08-Http/pic/09.png)

缓存：

- 强缓存：如果本地有，则直接使用
  - Cache-Control:
    - no-cache 协商缓存验证
    - no-store 不实用任何缓存
    - Max-age 存储的最大周期
-  协商缓存：本地有缓存，但缓存是不是最新的要根据Server端通信验证，进行协商





![10](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/08-Http/pic/10.png)

- cookie可以获得用户的相关信息
- response中的set-cookie 是 server返回浏览器设置的信息
- cookie是以一组 name value 键值对形式存在



**02-3 协议发展**

- HTTP/2
  - 更快、更稳定、更简单
  - 帧是 HTTP/2 通信的最小单位，每个帧都包含帧头，也会标识出当前帧所属的数据流
  - 二进制编码（HTTP1.x 的解析是基于文本的）
  - HTTP/2 是基于TCP
  - header 压缩，HTTP/2使用 encoder 来减少需要传输的header大小，通讯双方各自 cache 一份 header fields 表，既避免了重复header的传输，又减小了需要传输的大小
  - 交错发送，接收方重组织
  - 消息：与逻辑请求或响应消息对应的完整的一系列帧
  - 数据流：已建立的连接内的双向字节流，可以承载一条或多条消息
  - HTTP/2 连接都是永久的，而且仅需要每个来源一个连接
  - 流控制：阻止发送方向接收方发送大量数据的机制



- HTTPS：Hypertext Transfer Protocol Secure
  - 经过 TSL/SSL 加密
  - 对称加密：加密和解密都是使用同一个密钥；非对称加密：加密和解密需要使用公钥和私钥两个不同的密钥
  - HTTPS 协议使用对称加密和非对称加密混用的加密方法



---

### 03 常见场景



**03-1 静态资源：**

- 静态资源部署方案：缓存 + CDN + 文件名hash
- CDN（Content Delivery Network）：通过用户就近性和服务器负载的判断，CDN 确保内容以一种极为高效的方式为用户的请求提供服务（更快拿到资源的一种方式）
- 文件名hash 为了防止因缓存而出现的静态资源不更新的问题



**03-2 跨域：**

当有跨域时，Client 首先发出一个 OPTIONS 请求，然后 Server 会做出判断并返回给 Client 自己允许跨域请求的策略是什么，与 Client 的请求进行匹配。如果可以匹配上，那么 Client 将会发出真实的请求。

- 跨域解决方案：
  - CORS
    - ![11](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/08-Http/pic/11.png)
  - 代理服务器
    - 同源策略是浏览器的安全策略，不是HTTP的
    - ![12](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/08-Http/pic/12.png)
  -  Iframe（较少使用）



**03-3 网站登陆，记住用户的状态信息：（鉴权）**

>HTTP 无状态请求，给请求带上状态

![13](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/08-Http/pic/13.png)

- Cookie + Session ：
  - 登陆成功会发起一个提交的请求，把账户名、密码提交给server
  - server 处理提交后的请求，查看是否正确，如果正确则server会生成一个session并进行存储
  -  并在步骤一请求的response里，把session由set-cookie种到浏览器相应的域名地址下
  - 下一次请求时，浏览器自动携带cookie的策略
  - server会将request携带的cookie和本地的session进行比较，正确识别用户状态信息
- JWT：
  - 浏览器请求，server会生成一个token
  - server生成的token会通过response返回给浏览器
  - 浏览器下次请求时，server会解析当前存储的token
  - server返回



**03-4 ：子应用如何做到自动登录：**

- 单点登录（SSO）

![14](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/08-Http/pic/14.png)



---

### 04 实际应用



**04-1 浏览器 AJAX之XHR**

![15](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/08-Http/pic/15.png)



**04-2 浏览器 AJAX之Fetch**

![16](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/08-Http/pic/16.png)



**04-3 Node标准库之HTTP、HTTPS**

- 默认模块，无需安装其他依赖
- 功能有限/不是十分友好



**04-4 axios请求库**

![17](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/08-Http/pic/17.png)





---

### 05 了解更多



**通信方式：**

- WebSocket
  - 浏览器和服务器进行全双工通讯的网络技术
  - 典型场景：实时性要求高，例如聊天室



- QUIC

  ![18](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/08-Http/pic/18.png)
