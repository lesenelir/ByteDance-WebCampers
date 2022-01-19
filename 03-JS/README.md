# 跟着月影学JavaScript



**写好JavaScript的一些原则：**

1. 各司其职
2. 组件封装
3. 过程抽象



---

### 各司其职



- HTML 负责页面的架构
- CSS 负责页面的样式
- JS 负责页面的交互



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



---

### 过程抽象

> 用来处理局部细节控制的一些方法
>
> 函数式编程思想的基础应用



**once:**

- 为了能够让“只执行一次”的需求覆盖不同的事件处理，我们可以把这个需求剥离出来。这个过程称为过程抽离



**高阶函数：**

- 以函数作为参数
- 或者以函数作为返回值
- 高阶函数常用于函数装饰器



---

### 如何写好JS












