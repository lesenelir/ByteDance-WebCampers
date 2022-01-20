# 前端调试知识

### 前端Debug特点



![前端Debug特点](/Users/shuuhiko/GitHub-Projects/ByteDance-WebCampers/05-DeBug/pic/01.png)



---

### Chrome DevTools（PC）

> Tips：shift+command+c/ 可以快速选中元素并在调试工具打开



**一、动态修改元素和样式：（Elements面板）**

- 点击.cls开启动态修改元素的class
- 输入字符串可以动态的给元素添加类名
- 勾选/取消类名可以动态的查看类名生效效果
- 点击具体的样式值（字号，颜色，宽度高度等）可以进行编辑，浏览器内容区域实现预览
- Computed下点击样式里的箭头可以跳转到styles面板中的css规则



**强制伪类：**

> 伪类并不能实时显示

- 选中具有伪类的元素，点击 `:hov`
- DOM 树右键菜单，选择 `Force State`

![强制伪类](/Users/shuuhiko/GitHub-Projects/ByteDance-WebCampers/05-DeBug/pic/02.png)



**二、console：**

- console.log
- console.warn
- console.error
- console.debug （调试）
- console.info
- console.table ：具体化的展示JSON和数组数据
- 占位符
  - 给日志添加样式，可以突出重要信息
  - %s: 字符串
  - %o: 对象
  - %c: 样式
  - %d: 数字

eg:

```CSS
console.log("welcome to my note")
console.warn("welcome to my note")
console.error("welcome to my note")
console.debug("welcome to my note")
console.info("welcome to my note")
console.log('%s %o,%c%s','hello',{name:'tom',age:18},'font-size:30px; color: red', 'welcome to my note')
```

![console](/Users/shuuhiko/GitHub-Projects/ByteDance-WebCampers/05-DeBug/pic/03.png)

**console具体用法：**

- 存在问题的代码部分使用console.log,逐步排查(小方法:自定义参数)



**三、source 面板**

> source tab 面板可以暂停程序，帮助快速定位问题

**界面：**

![sourcetab](/Users/shuuhiko/GitHub-Projects/ByteDance-WebCampers/05-DeBug/pic/04.png)



**BreakPoint 与 Watch：**

![debug](/Users/shuuhiko/GitHub-Projects/ByteDance-WebCampers/05-DeBug/pic/05.png)

![debug](/Users/shuuhiko/GitHub-Projects/ByteDance-WebCampers/05-DeBug/pic/06.png)



- 使用关键字debugger或代码预览区域的行号可以设置断点

- 执行到断点处时代码暂停执行
- Watch可以添加查看变量的值，即对变量进行控制

- 展开Breakpoints列表可以查看断点列表，勾选/取消可以激活/禁用对应断点

- 暂停状态下，鼠标hover变量可以查看变量的值



**Scope 与 Call Stack**

- Scope 可以查看作用域列表（包含闭包）
- Call Stack 可以查看当前JavaScript代码的调用栈



**四、Performance面板**

![performance](/Users/shuuhiko/GitHub-Projects/ByteDance-WebCampers/05-DeBug/pic/07.png)

区域1: 控制面板

区域2: 概览面板

- FPS：每秒帧数
- CPU：处理各个任务花费的时间
- NET：各个请求花费的时间

区域3:线程面板

- Frames：帧线程
- Main：主线程，负责执行 Javascript，解析 HTML/CSS ，完成绘制
- Raster：Raster线程，负责完成某个 layer 或者某些块（title）的绘制。



**五、Network面板**

可以查看所有页面请求的信息

![network](/Users/shuuhiko/GitHub-Projects/ByteDance-WebCampers/05-DeBug/pic/08.png)

区域一中的no throtling 可以设置网速



**六、Application面板**

浏览器本地存储面板

![application](/Users/shuuhiko/GitHub-Projects/ByteDance-WebCampers/05-DeBug/pic/09.png)





**总结：**

- Elements:查看dom结点，样式，调整样式。

- console:输出不同类型的日志，结合代码，解决不同的问题

- source:查看网页内容，通过debugger调试，查看变量值，帮助我们更好的定位问题

- Network:请求相关

- performance:性能相关

- Application:本地存储相关



---

### 移动端H5调试

真机调试｜代理调试｜常用工具

**一、真机调试**

**iOS：**

1. 使用 Lightning 数据线将 iPhone 与 Mac相连
2. iPhone 开启 Web检查器（设置一＞ Safari -> 高级 -> 开启 Web 检查器）
3. iPhone 使用 Safari 浏览器打开要调试的页面
4. Mac 打开 Safari 浏览器调试（菜单栏一＞开发 -> iPhone 设备名 -> 选择调试页面）
5. 在弹出的 Safari Developer Tools 中调试

> 没有 iPhone 设备可以在 Mac AppStore 安装xcode 使用其内置的 ios 模拟器

**Android：**

1. 使用USB 数据线将手机与电脑相连
2. 手机进入开发者模式，勾选USB 调试，井允许调试
3. 电脑打开 Chrome 浏览器，在地址栏输入：chrome://inspect/#devices 并勾选 Discover USB devices 选项
4. 手机允许远程调试，并访问调试页面
5. 电脑点击 inspect按钮
6. 进入调试界面

> 直接用手机扫码查看，体验更佳



**二、使用代理工具调试：**

原理：

- 电脑作为代理服务器
- 手机通过 HTTP 代理连接到电脑
- 手机上的请求都经过代理服务器

以 Charles 为例：

1. 安装 Charles
2. 查看电脑 IP 和 端口
3. 将 IP、端口号填入手机 HTTP 代理
4. Charles 允许授权
5. 使用SwitchHosts! 软件给 Mac 电脑配 Hosts
6. 手机访问开发环境页面

> 默认情况下，Charles 无法抓取到 HTTPS 的请求，需要安装证书。



**三、常用工具：**

Charles：适合查看、控制网络请求，分析数据

Fiddler：与 Charles 类似，适合 windows 平台

spy-debugger：远程调试手机页面，抓包

Whistle：基于 NOde 实现跨平台 Web 调试代理工具

---

### 常见开发小技巧



**一、线上及时修改 Over rides**

![overrides](/Users/shuuhiko/GitHub-Projects/ByteDance-WebCampers/05-DeBug/pic/10.png)

