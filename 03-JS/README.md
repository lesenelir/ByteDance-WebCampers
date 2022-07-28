# 跟着月影学JavaScript - 如何写好JS



**写好JavaScript的一些原则：**

1. 各司其职
   - HTML CSS JS职能分离
2. 组件封装
   - UI组件进行的封装
3. 过程抽象
   - 应用函数式编程范式，使得代码具有扩展性



---

### 各司其职

- HTML 负责页面的架构（结构）
- CSS 负责页面的样式（表现）
- JS 负责页面的交互（行为）



> 应当避免不必要的由JS直接操作**样式**
>
> 可以用class表示状态
>
> 纯展示类交互寻求零JS方案



---

### 组件封装

> 组件定义： Web页面上抽出来一个个包含HTML、CSS、JS的单元。好的组件具备封装性、正确性、可复用性



**轮播图：**

- HTML 结构
    - 列表结构、使用ul无序列表

- CSS 表现
    - 使用CSS绝对定位将图片重叠到同一个位置（绝对定位：相对于父级有定位的元素）
    - 轮播图切换的状态使用修饰符（modifier）
    - 轮播图的切换动画使用CSS transition
- JS  行为
    - "API"设计保证原子结构，职责单一，满足灵活性
    - "Event" 控制流



组件封装

- 原则：封装性、正确性、扩展性、复用性
- 实现组件的步骤：结构设计、展现效果、行为设计
- 三次重构：
  - 插件化
  - 模版化
  - 抽象化（组件框架）



---

### 过程抽象

> 用来处理局部细节控制的一些方法
>
> 函数式编程思想的基础应用
>
> React Hooks 是一种典型的过程抽象的应用



**once:**

- 为了能够让“只执行一次”的需求覆盖不同的事件处理，可以把这个需求剥离出来。这个过程称为过程抽离

- ```js
  function once(fn) {
  	return function(...args) {
  		if (fn) {
  			const ret = fn.apply(this, args)
  			fn = null
  			return ret
  		}
  	}
  }
  ```

  

**高阶函数HOF：**

- 以函数作为参数
- 或者以函数作为返回值
- 高阶函数常用于函数装饰器
- 常见的高阶函数HOF：

  - Once

  - Throttle（mouseover、鼠标滚动；注册事件，事件触发频率很高，会带来性能开销）

  - Debounce

  - Consumer / 2

    ```js
    function consumer(fn, time) {
    	let tasks = [],
    			timer
    	return function(...args) {
    		tasks.push(fn.bind(this, ...args))
    		if (timer === null) {
    			timer = setInterval(() => {
    				tasks.shift().call(this)
    				if (tasks.length <= 0) {
    					clearIntercal(timer)
              timer = null	
    				}
    			}, time)
    		}
    	}	
    }
    ```

  - iterative




 **代码编写风格**

- 命令式
  - 面向过程
  - 面向对象
- 声明式
  - 逻辑式
  - 函数式

---

### 如何写好JS



**代码关注点：**

- 风格
- 效率
- 约定
- 设计
- 使用场景
