# Web开发的安全之旅



### 攻击篇



**Crorss- Site Scripting   XSS**

- 跨站脚本攻击

- 开发者盲目信任用户提交的内容

- 前端工程师直接把用户提交的字符串转换成为DOM

- XSS特点：

  - 通常难以在UI上感知（暗地执行脚本）
  - 窃取用户信息（cookie / token）

  - 绘制UI，诱骗用户点击/填写表单

- XSS分类：

  - Stored XSS 存储性XSS：恶意脚本被存储在数据库中
  - Reflected XSS 反射性XSS：从URL上进行攻击
  - Dom- based XSS：不需要服务器的参与，攻击发起、执行全在浏览器端
  - Mutation- based XSS：按照不同浏览器渲染DOM特性，进行攻击



**Cross-Site request forgery (CSRF)**

- 跨站伪造请求
- CSRF特点：
  - 在用户不知情下
  - 利用用户权限 cookie
  - 构造执行HTTP请求，窃取或修改用户敏感信息



**SQL Injection**

- sql 注入攻击
- sql参数恶意注入



**Denial of Service (Dos)**

- 服务拒绝
- 通过某种方式（构造特定请求），导致服务器资源被显著消耗，来不及响应更多请求，导致请求挤压，进而雪崩效应



**Distributed Dos(DDos)**

- 短时间内，来自大量僵尸设备的请求流量，服务器不能及时完成全部请求，导致请求堆积，进而雪崩效应，无法响应新请求
- 攻击特点：
  - 直接访问IP
  - 任意API
  - 消耗大量带宽





### 防御篇

- 永远不信任用户提交的内容
- 不要将用户提交的内容直接转换为DOM（转换为String）



**Same-origin Policy 同源策略**

- 协议
- 域名
- 端口

源确保两个URL上的协议、域名、端口号统统相等

> 一般而言，HTTP请求，同源之间是没有问题的，跨域之间是有问题的



**Content Security Policy （CSP）**

- 哪些源（域名）被认为是安全的
- 来自安全源的脚本可以执行，否则直接抛错



**CSRF ----- token**

![01](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/10-WebSecurity/pic/01.png)

