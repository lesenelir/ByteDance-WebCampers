# Nodejs与前端开发实战

### Node.js的应用场景 （why）



**前端工程化：**

- Bundle:webpack,vite,esbuild,parcel
- Uglify:uglifyjs
- Transpile:bablejs,typescript
- 其他语言加入竞争:esbuild（基于golang实现）,parcel,prisma
- 现状:难以替代



**Web服务端应用：**

- 学习曲线平缓，开发效率较高
- 运行效率接近常见的编译语言
- 社区生态丰富及工具链成熟
- 与前端结合的场景会有优势
- 现状：竞争激烈，Node.js有自己独特的优势



**Electron跨端桌面应用：**

- 商业应用：vscode, slack, discord, zoom

- 大型公司内的效率工具

- 现状：大部分场景在选型时，都值得考虑



**Node.js在字节：**

- BFF应用、SSR应用，举例：Modern.js
- 服务端应用，例如：头条搜索，西瓜视频，懂车帝
- Electron应用：飞连，飞书
- 每年新增1000+ Node.js应用



---

### Node.js运行时结构 （what）

> Node.js由什么组成，这些组成造就了node.js特点



![nodejs运行时结构](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/09-NodeJs/pic/01.png)



**Node.js特点：**

- 异步IO

  ```javascript
  setTimeout(() => {
   console.log('B');
  })

  console.log('A');
  ```

  - 当 Node.js 执行IO操作时，**会在响应返回后恢复操作**，而不是阻塞线程并占用额外内存等待

    ![02](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/09-NodeJs/pic/02.png)

- 单线程

  - javascript中的主线程是单线程的

  - 实际：JS 线程 + uv 线程池 + V8 任务线程池 + V8 Inspector 线程

    **优点：** 不用考虑多线程状态同步问题，也就不需要锁；同时还能比较高效地利用系统资源

    **缺点：** 阻塞会产生更多负面影响（解决方法：多进程或多线程）

- 跨平台

  - 跨平台(大部分功能，api)
  - Node.js跨平台+JS无需编译环境(+Web跨平台+诊断工具跨平台)
    - =开发成本低(大部分场景无需担心跨平台问题)，整体学习成本低



---

### 编写Http Server （how）



**http_server**

```javascript
const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
  res.end('hello')
})

server.listen(port, () => {
  console.log('listening on: ', port)
})

```

代码监听本地的3000端口，获得数据



**JSON**

```js
const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
  const bufs = []
  req.on('data', data => {
    bufs.pust(data)
  })
  req.on('end', () => {
    let reqData = {}
    try {
      reqData = JSON.parse(Buffer.concat(bufs).toString())
    } catch (err) {
    }
    res.setHeader('Content-type', 'applicaiton/json')
    res.end(JSON.stringify({
      echo: reqData.msg || 'Hello',
    }))
  })
})

server.listen(port, () => {
  console.log('listening on: ', port)
})

```



**http_client**

```js
const http = require('http')

const body = JSON.stringify({msg: 'hello from my client'})

const req = http.request('http://127.0.0.1:3000', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': body.length
  }
}, res => {
  const bufs = []
  res.on('data', data => {
    bus.push(data)
  })

  res.on('end', () => {
    const receive = JSON.parse(Buffer.concat(bufs).toString('utf8'))
    console.log('receive', receive);
  })
})

req.end(body)
```



**Promise + async await**

有很多回调函数；回调函数可以直接用，但不易于管理，不能确定回调函数什么时候被触发。

当有内容需要在回调函数中做的时候，可能会导致嵌套特别深。函数与函数之间触发不易发觉

> 将callback代码转换成Promise代码



```js
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 3000

const folderPath = path.resolve(__dirname, './static')

const server = http.createServer((req, res) => {
  const info = url.parse(req.url)
  const filePath = path.resolve(folderPath, './', info.path)
  const filestream = fs.createReadStream(filePath)
  filestream.pipe(res)
})

server.listen(port, () => {
  console.log(`server listen on: ${port}`);
})
```

与高性能、可靠的服务相比，还差什么？

- CDN：缓存+加速
- 分布式储存， 容灾



**SSR(server side rendering)**

SSR(server side rendering)特点：

- 相比传统HTML模板引擎:避免重复编写代码
  - 很少直接写HTML代码
  - 生成HTML代码的逻辑放在JavaScript中
- 相比SPA(single page application):首屏渲染更快,SEO友好
- 缺点:
  - 通常qps较低,前端代码编写时需要考虑服务端渲染情况

```js
const React = require('react');
const ReactDOMServer = require('react-dom/server')
const http = require('http');

// return <div>Hello</div>
function App(props) {
  return React.createElement('div', {}, props.children || 'Hello');
}

const server = http.createServer((req, res) => {
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>My Application</title>
    </head>
    <body>
      ${ReactDOMServer.renderToString(
        React.createElement(App, {}, 'my_content')
      )}
    </body>
    </html>
  `)
})

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
})
```

**SSR 难点：**

1. 需要处理打包代码

` require('./static/style.css')`

1. 需要思考前端代码在服务端运行时的逻辑
2. 移除对服务端无意义的副作用，或重置环境



**Debug:**

- V8 inspector：开箱即用、特性丰富强大、与前端开发一致、跨平台

​		1. **运行 node--inspect xxx.js**

​        2. **open** **[http://localhost:9229/json](https://link.juejin.cn/?target=http%3A%2F%2Flocalhost%3A9229%2Fjson)** **或者 chrome://inspect**

​        3. **之后就 inspect 连接到你要 debug 的程序**

- 场景：
  - 查看 console.log 内容
  - Breakpoint
  - 高 CPU、死循环：cpuprofile
  - 高内存占用：heapsnapshot
  - 性能分析



**部署：**

- 部署要解决的问题
  - 守护进程：当进程退出时，重新拉起
  - 多进程：cluster 便捷地利用多进程
  - 记录进程状态，用于诊断

- 容器环境
  - 通常有健康检查的手段，只需考虑多核 CPU 利用率即可



---

### 延伸话题



**Node.js贡献代码：**

- 快速了解Node.js代码
- 好处
  - 从使用者的角色逐步理解底层细节,可以解决更复杂的问题
  - 自我证明,有助于职业发展
  - 解决社区问题,促进社区发展
- 难点
  - 花时间



**编译Node.js：**

- 为什么要学习编译Node.js
  - 认知:黑盒到白盒,发生问题时能有迹可循
  - 贡献代码的第一步
- 如何编译
  - 参考:Maintaining the build files
  - ./configure && make install
  - 演示:给net模板添加自定义属性



**诊断/追踪：**

- 诊断是一个低频,重要同时也相当有挑战的方向,是企业衡量自己能否依赖一门语言的重要参考
- 技术咨询行业中的热门角色
- 难点:
  - 需要了解Node.js的底层,需要了解操作系统以及各种工具
  - 需要经验



**WASM,NAPI：**

- Node.js(因为V8)是执行WASM代码的天然容器,和浏览器WASM是同一运行时,同时Node.js支持WASI
- NAPI执行C接口的代码(C/C++/Rust/...),同时能保留原生代码的性能
- 不同编程语言间通信的一种方案



---

总结：多研究底层
