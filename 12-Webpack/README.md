# 构建Webpack知识体系

知识体系：[gitmind.cn/app/doc/fac…](https://link.juejin.cn/?target=https%3A%2F%2Fgitmind.cn%2Fapp%2Fdoc%2Ffac1c196e29b8f9052239f16cff7d4c7)



---

### 一、什么是Webpack

> webpack本质是一种前端资源编译、打包工具



![01](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/12-Webpack/pic/01.png)



---

### 二、使用Webpack

#### 2.1 示例

1. 安装webpack和webpack-cli配置文件

   `npm i -D webpack webpack-cli`

2. 编辑配置文件

```js
[webpack.config.js]

const path = require('path')

module.exports = {
  entry: './src/index.js', // 入口文件
  mode: 'development',
  devtool: false,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist')
  },
}
```

3. 执行编译命令

   `npx webpack`



#### 2.2 核心流程

1. 入口处理 ： 从entry文件开始启动编译流程
2. 依赖解析 ：根据require、import等找到依赖资源
3. 资源解析 ：根据module配置，调用资源转移器，将css等非标准js资源转译为 js 内容
4. 资源合并打包 ：将转译后的资源内容合并打包为可直接在浏览器运行的js



#### 2.3 配置项

使用 webpack 的方法：**基本围绕 “配置”展开，可分为**

- 流程类：作用于流程中某个 or 若干个环节，直接影响打包效果的配置项
  - 输入：entry、context
  - 模块解析：resolve、externals
  - 模块转译：module
  - 后处理：optimization、mode、target
  - 输出：output
- 工具类：主流程之外，提供更多工程化能力的配置项
  - 开发效率类：watch、devtool、devServer
  - 性能优化类：cache、performance
  - 日志类：stats、infrastructureLogging
  - 其他：amd、bail

配置项的使用频率：

- entry/output
- module/plugins
- mode
- watch/devServer/devtools



#### 2.4 处理CSS资源

>  需要用什么loader 就要npm 安装什么loader



1. 安装loader

   `npm add -D css-loader style-loader`

2. 添加“module”处理css

   ```js
   const path = require('path')

   module.exports = {
     entry: './src/index.js', // 入口文件
     mode: 'development',
     devtool: false,
     output: {
       filename: '[name].js',
       path: path.join(__dirname, './dist')
     },
     module: {
       rules: [{
         // test是一个过滤条件，满足test要求的才用rules处理
         test: /\.css$/,
         // 用什么样的loader去处理满足test的文件
         use: ['style-loader', 'css-loader']
       }]
     }
   }

   ```

   > 注：use中的内容是从后向前进行加载的

3. 执行运行命令

   `npx webpack`



**问题：**

- Loader 有什么作用？为什么这里需要用到 css-loader、style-loader
- 与旧时代 —— 在 HTML 文件中维护 CSS 相比，这种方式会有什么优劣处？
- Less、Sass 和 Stylus 这一类工具如何在 webpack 中接入？

**参考资料：**

[css-loader](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebpack-contrib%2Fcss-loader)

[如何编写loader](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FTPWcB4MfVrTgFtVxsShNFA)

[style-loader | webpack](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Floaders%2Fstyle-loader%2F)



#### 2.5 接入Babel

> Babel 本质上是一种JS代码转译工具



1. 安装依赖

   `npm i -D @babel/core @babel/preset-env babel-loader`

2. 声明产物出口 output

   ```js
   const path = require('path')

   module.exports = {
     entry: './src/index.js', // 入口文件
     mode: 'development',
     devtool: false,
     output: {
       filename: '[name].js',
       path: path.join(__dirname, './dist')
     },
     module: {
       // 处理器
       rules: [{
         // test是一个过滤条件，满足test要求的才用rules处理
         test: /\.js$/,
         // 用什么样的loader去处理满足test的文件序列
         use: [{
           loader: 'babel-loader',      // 用babel-loader去处理js结尾的文件
           options: {
             presets: [
                 ['@babel/preset-env']
             ]
           }
         }]
       }]
     }
   }

   ```

3. 执行运行命令

   `npx webpack`



**问题：**

- Babel 具体有什么功能？
- Babel 与 Webpack 分别解决了什么问题？为何两者能协作在一起？

**参考资料：**

[Babel · The compiler for next generation JavaScript](https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2F)

[babel-loader | webpack](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Floaders%2Fbabel-loader%2F)

[@babel/preset-env · Babel](https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-preset-env)

[@babel/preset-react · Babel](https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-preset-react)

[@babel/preset-typescript · Babel](https://link.juejin.cn/?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-preset-typescript)



#### 2.6 生成HTML

> js文件放在浏览器中运行，正常是HTML中引入js文件



1. 安装依赖 （自动生成HTML文件）

   `npm i -D html-webpack-plugin`

2. 声明产物出口 output

   ```js
   const path = require('path')
   const HtmlWebpackPlugin = require("html-webpack-plugin");

   module.exports = {
     entry: './src/index.js', // 入口文件
     mode: 'development',
     devtool: false,
     output: {
       filename: '[name].js',
       path: path.join(__dirname, './dist')
     },
     plugins: [new HtmlWebpackPlugin()]
   }

   ```

3. 执行运行命令

   `npx webpack`

> 注： 打包后，会生成一个HTML文件，该HTML文件会自动的把



**问题：**

- 相比于手工维护 HTML 内容，这种自动生成的方式有什么缺点？

**参考资料：**

[HtmlWebpackPlugin | webpack](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fplugins%2Fhtml-webpack-plugin%2F)



#### 2.7 HMR

> Hot Module Replacement   模块热替换
>
> 即：更新的代码可以立刻更新到浏览器上，而不用刷新浏览器



```js
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index',
  mode: 'development',
  devtool: false,
  watch: true,     // webpack 会持续的监听文件的变化
  devServer: {
    hot: true, // 主要 HMR
    open: true
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [new HTMLWebpackPlugin()]
}

```



开启HMR后就不能用 npx webpack 命令了，应该执行：

`npx webpack serve`



#### 2.8 Tree-Shaking

> 树摇， 用于删除Dead Code
>
> 删除，定义了但未被使用的代码



Dead Code：

- 代码没有被用到，不可到达
- 代码执行结果不会被用到
- 代码只读不写



```js
const path = require('path')

module.exports = {
  entry: './src/index',
  devtool: false,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist')
  },
  mode: 'production', // 如果是 development 可以看到 会有没有用到的代码
  optimization: {
    usedExports: true,
  }
}
```

开启Tree-Shaking 最重要的两步：

 	1. mode设置为production
 	2. optimization 中的usedExports配置项设置为true



执行运行命令：

`npx webpack`



> Tree-Shaking 对工具类，如Lodash有奇效



#### 2.9 其他工具

- 缓存 webpack5后的缓存效果才比较好

- Sourcemap

- 性能监控

- 日志

- 代码压缩

- 分包

- …



---

### 三、理解Loader

> webpack 只认识JS代码
>
> Loader 是做内容的转化，是为了处理非标准JS资源，设计出资源翻译模块
>
> Loader 核心功能是将非JS资源翻译成标准JS资源，以便webpack处理



#### 3.1 示例

1. 安装各种依赖和各种Loader

   `npm add -D css-loader style-loade less-loader`

2. 在webpack.config.js文件内配置一个‘module’配置项处理不同类型的资源

   - test属性

   - use属性

   - ```js
     const path = require('path')

     module.exports = {
       entry: './src/index',
       devtool: false,
       mode: 'development',
       output: {
         filename: '[name].js',
         path: path.join(__dirname, './dist')
       },
       module: {
         rules: [
           {
             test: /\.less$/,   // 将less文件转换为js文件
             use: [   // use 是从后往前执行
               'style-loader',
               'css-loader',
               'less-loader',
             ]
           }
         ]
       }
     }
     ```



3. 执行运行命令

   `npx webpack`



样式Loader：

![02](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/12-Webpack/pic/02.png)



这三个 loader是以一种**链式调用**的方式加载的

![03](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/12-Webpack/pic/03.png)



![04](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/12-Webpack/pic/04.png)

**特性：**

- **链式执行**
- **支持异步执行**
- **分 normal、pitch 两种模式**



#### 3.2 如何编写Loader

简单Eslint-loader源码：

![05](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/12-Webpack/pic/05.png)

怎么编写自己的Loader呢？



1. 首先编写一个没有任何功能的Loader

```js
 // 一个没有经过任何处理的 loader

module.exports = function(source) {
 console.log(source);
 return source
}
```



2. 在webpack.config.js调用这个loader.js

```js
const path = require('path')

module.exports = {
  entry: './src/index',
  mode: 'development',
  devtool: false,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [path.join(__dirname, './loader')]  // 调用loader
      }
    ]
  }
}
```

参考：[Webpack 原理系列七：如何编写loader](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FTPWcB4MfVrTgFtVxsShNFA)



#### 3.3 常用Loader

![06](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/12-Webpack/pic/06.png)

**问题：**

- loader 输入是什么？要求输出的是什么？

- loader 的链式调用是什么意思？如何串联多个 loader？

- loader 中如何处理异步场景？



---

### 四、理解插件

> 插件的精髓：对扩展开放，对修改封闭



#### 4.1 webpack中使用插件



1. 安装插件依赖

   ​	`npm i -D webpack-dashboard`

2. 导入插件

   ```js
   const DashboardPlugin = require("webpack-dashboard/plugin")
   ```

3. 添加webpack插件

   ```js
   module.exports = {
     // ...
     plugins: [new DashboardPlugin()],
     // ...
   }
   ```



#### 4.2 如何编写插件

> 插件是由 “钩子” 展开的

```js
class SomePlugin{
    apply(compiler){
        compiler.hooks.thisCompilation.tap('SomePlugin', compilation => {

        })
    }
}
```



钩子的核心信息：

1. 时机：编译过程的特定节点，Webpack 会以钩子的形式通知插件此刻正在发生什么事请
2. 上下文：通过 tapable 提供的回调机制，以参数方式传递上下文信息；
3. 交互：在上下文参数对象中附带了很多存在 side effect 的交互接口，插件可以通过这些接口改变



```js
class EntryPlugin{
    apply(compiler){
        compiler.hooks.compilation.tap( // 时机 compiler.hooks.compilation
            'EntryPlugin',
             (compilation,{ normalModuleFactory }) => {  // 参数 compilation
                 compilation.dependencyfactories.set(  // 交互 dependencyfactories.set
                 	EntryDenpendency,
                    noemalModuleFactory
                 );
             });

        compiler.hooks.make.tapAsync('EntryPlugin', (compilation, callback) => {
            const {entry,options, context } = this;
            const dep = EntryPlugin.createDependency(entry, options);
            compilation.addEntry(context, dep, options, err => {
                callback(err);
            })

        })
    }
}
```



**问题：**

- loader 与插件有什么区同点？

- ”钩子“有什么作用？如何监听钩子函数？



---

### 五、学习方法

1. 入门应用
   - 理解打包流程
   - 熟练掌握常用配置项、loader、插件的使用方法、能够灵活搭建集成 Vue、React、Babel、Eslint、Less、Sass、图片处理等工具的webpack环境
   - 掌握常见脚手架工具，例如 Vue-cli、create-react-app、@angular/cli
2. 进阶
   - 理解Loader、Plugin机制，能够自行开发 Webpack 组件
   - 理解常见性能优化手段，并能用于解决实际问题
   - 理解前端工程化概念与生态现状
3. 大师级
   - 阅读源码，理解 编译、打包原理，能参与共建



---





面试掌握程度？

- loader 有什么作用，怎么写 loader、常见的 loader有什么
- 怎么写一个 插件
- bundle、chunk、module 是什么含义？

