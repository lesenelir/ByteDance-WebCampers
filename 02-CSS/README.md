# 理解CSS



### CSS基础

>  CSS 全称： Cascading Style Sheets  层叠样式表              定义元素的样式



**CSS如何工作：**

![CSS如何工作](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/02-CSS/pic/pic01.png)

- 浏览器加载HTML，并对HTML进行解析，解析成一个DOM树
- 解析HTML过程中加载CSS、解析CSS，解析DOM树每一个节点的CSS样式，得到一个render树（计算每一个节点的位置和样式）



**选择器：**

- 标签名

- .class（最常用）

- \#id（id在页面中唯一）

- 通配选择器，选择所有的标签

- 属性选择器 [ ]

    - 包含某种属性

    - 属性值为特定的值，或符合特定的匹配规则

    -   ```CSS
        a[href^="#"] {
          /*选择属性href的值为#开头的a标签*/
        },
        a[href$=".jpg"] {
          /*选择属性href的值以.jpg结尾的a标签*/
        }
        ```

- 伪类选择器 :

    - **状态伪类**
        - **用户与标签节点进行交互**时使元素处于不同的状态，根据不同的状态来触发
        - a:link、a:hover、a:visited、a:active
        - :focus （输入框输入状态）
    - **结构伪类**
        - 根据**节点在DOM树中的位置**来决定是否选择该节点
        - li:first-child、li:last-child

- 选择器的组合 Combinators

| 名称             | 语法 | 说明                        | 示例                     |
| ---------------- | ---- | --------------------------- | ------------------------ |
| 直接             | AB   | 同时满足A和B                | input:focus、input.error |
| 后代             | A B  | 选中B，若B是A的后代（子孙） | nav a                    |
| 亲子（直接后代） | A>B  | 选中B，若B是A的直接子元素   | section>p                |
| 兄弟             | A~B  | 选中B，若B在A后且与A同级    | h2~p                     |
| 相邻             | A+B  | 选中B，若B紧跟在A后         | h2+p                     |

> 兄弟选择器：A~B：A，B选择器是要同级，有相同的父元素，且B元素在A元素的后边【可能选择很多标签】
>
> 相邻选择器：A+B：A，B选择器是要同级的，并且B标签紧跟着A的后面，【选择的是某一个标签】

- 选择器组，用逗号分隔

    - ```CSS
      [type="checkbox"], [type="radio"] {
    		box-sizing: border-box;
    		padding: 0
      }
      ```



**颜色：**

- RGB
    - rgb(x, x, x)    对应红绿蓝的数值 0～255
    - #000000    每两位一组，取值 00 ～ ff
- HSL
    - **Hue 色相**，是色彩的基本属性，取值0~360（环）
      - hsl(20, 100%, 80%)
    - **Saturation 饱和度**，是色彩的**鲜艳**程度，取值0~100%
    - **Lightness 亮度**，是色彩的**明暗**程度，取值0~100%

- alpha透明度，取值0~1；1代表不透明，0代表完全透明
    - rgb**a**(255,0,0,0.23)
    - hsl**a**(0,100%,50%,0.66)
    - 十六进制： #ff0000**78** （78代表十六进制）



**字体 font-family**

```css
h1 {
	font-family: Optima, Georgia, serif;
}
```

- 字体family是设置多个

>字体family设置多个原因：不同终端浏览网页的设备是不同的，终端设备不可能有所有字体。									所以可以写多个字体，让终端设备自己一个一个进行匹配，进行设置字体。

- serif 和 sans-serif 和 monospace 都是通用字体族（一种字体的风格）



**字体大小 font-size:**

- 关键字

    - small, medium, large

- 长度

    - px           设置字体具体的大小

    - em          设置字体相对长度单位（弹性的布局可以用em）

        - em的值并不是固定的

        - em会继承父级元素的字体大小（相对于父级字体大小）

      ```css
      section {
      	font-size: 20px;
      }
      section h1 {
      	font-size: 2em; /*section下的h1标签设置字体大小为section字体大小的2倍  即，40px*/
      }
      ```

    - rem     设置字体相对于根元素字体的大小（常用于移动端适配）

- 百分数

    - 参照父元素的大小设置

      - ```css
        section {
      	  font-size: 20px;
        }
        section p {
      	  font-size: 80%; /*section下的h1标签设置字体大小为section字体大小的2倍*/
        }
        ```



**字重font-weight：**

- 值从100 ～ 900
- 字重和font-family有关



**行高 line-height:**

- 设置行间距（多段文字阅读）

- line-height 有数值则按照数值显示；line-height没有数值，则表示font-size的倍数（没有单位是字体大小的倍数）

    - ```CSS
      h1 {
    	  font-size: 20px;
    	  line-height: 30px;   /*行高是30px*/
      },
      p {
    	  font-size: 20px;
    	  line-height: 1.6;   /*行高是20px*1.6=32px*/
      }
      ```



**对齐方式 text-align：**

- left   左对齐
- right 右对齐
- center 居中对齐
- justify  两端对齐



**文字修饰 text-decoration:**

- none
- underline 下划线
- line-through 删除线



**CSS书写顺序：**

1. 布局定位属性

   display / position / float / clear / visibility / overflow

   （建议 display 第一个写，关系到模式）

2. 自身属性

   width / height / margin / padding / border / background

3. 文本属性

   color / font / text-decoration / text-align / vertical-align / white- space / break-word

4. 其他属性（CSS3）

   content / cursor / border-radius / box-shadow / text-shadow / background:linear-gradient …



---

### 深入CSS



**选择器的特异度 Specificity:**

- 高优先级的样式会覆盖低优先级的样式

- 可以通过CSS选择器来实现css的复用

- | 选择器           | 权重 |
  | ---------------- | ---- |
  | 通配符*、继承    | 0    |
  | 元素选择器       | 1    |
  | （伪）类选择器 . | 10   |
  | id选择器 #       | 100  |
  | 内联样式 style   | 1000 |
  | !important       | ∞    |



**继承：**

- 定义：**某些属性会自动继承其父元素的计算值**，除非显式指定一个值
- 字体相关的属性可以继承
  - font-size
  - color

- 宽高、盒子大小这些盒模型属性不可以继承



**CSS求值过程**

**![CSS求值过程](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/02-CSS/pic/pic02.png)**



**css布局 layout： **

- 布局layout 确定内容的大小位置的算法

- 依据元素、容器、兄弟结点、内容信息来计算

- 常规流

    - 块级

        - 不和其他盒子并列摆放

        - ```HTML
          <body> <article> <div> <main> <section> <ul> <li> <p>
          ```
        - ```css
          display: block
          ```

        - 块级排版上下文（block formatting context BFC）
        - 某些容器会创建一个BFC： 
          - 根元素
          - 浮动、绝对定位、inline-block
          - flex子项和grid子项
          - overflow 值不是visible 的块盒
          - display: flow-root
        - BFC 排版规则:
          - 盒子从上到下摆放
          - 垂直margin合并
          - BFC内盒子的margin 不会与BFC外的盒子进行合并（可以用于：防止margin重叠）
          - BFC不会和浮动元素重叠（用于：清除浮动）

    - 行级

       - 可以和其他盒子放在一行

       - 盒模型中的width和height不适用

        - ```html
          <span> <em> <strong> <cite> <code> 
          ```
       - ```css
         display: inline;
         ```

       - 行级排版上下文（IFC） - 排版规则：

         - 盒子在一行内水平摆放
         - 一行放不下，换行显示
         - text-align 决定一行内盒子的水平对齐
         - vertical-align 决定一个盒子在行内的垂直对齐
         - 避开float元素

    - 表格布局

    - FlexBox

       - 一种新的排版上下文

    - Grid布局

- 浮动

    - 文字环绕效果

- 绝对定位

    - 可以做到覆盖在常规流上的效果




**display属性：**

| display 属性 | 特点                                                         |
| ------------ | ------------------------------------------------------------ |
| block        | 块级盒子                                                     |
| inline       | 行级盒子 （不可以设置宽高）                                  |
| inline-block | **本身是行级**，可放在行盒中；**可设置宽高**；作为整体，**不会被拆成多行** |
| none         | 排版时被完全忽略                                             |
| flex         | CSS3新提出的**弹性**布局                                     |
| grid         | CSS3新提出的**网格**布局                                     |



**盒模型：**

- 标准盒模型的宽高属性width、height 设置的是content内容区的宽高

    - width 取值： 长度、百分数、auto

        - 百分数：相当于当前盒子所在容器的content box 宽度

    - height取值： 长度、百分数、auto

        - 百分数： 相当于盒子所在容器的content box 高度
        - >容器有指定的高度时，百分数才会生效

- box-sizing属性：
    - box-sizing: border-box;  设置这个属性后，盒子的宽高width、height设置的是整个盒子的宽高（包含padding 和 border） 【推荐】
    - box-sizing属性的默认值是content-box，即  box-sizing: content-box;
- overflow 盒子内容溢出
    - visible
    - hidden
    - scroll （没溢出也有滚动条）
    - auto  （内容溢出后才会显示滚动条）



**FlexBox 排版上下文/弹性布局:**

- flexBox是一种新的排版上下文（不会遵循BFC、IFC规则）

- display: flex;

- 它可以控制子级盒子的：

    - 摆放流向（⬆️ ⬇️ ⬅️ ➡️）    flex-direction
    - 摆放顺序   （决定flex容器内子元素的排列顺序     order属性）
    - 盒子的宽度和高度
    - 水平和垂直方向的对齐
    - 是否允许折行

- flex-direction 属性 :     决定项目的排列方向       （摆放的流向）

    - **flex-direction: row;                     从左到右       (flex-direction的默认值)**

    - **flex-direction: row-reverse;      从右到左**

    - flex-direction: column;              从上到下

    - flex-direction: colum-reverse;  从下到上

    - **规定：flex-direction指定的方向为主轴的方向，与flex-direction指定的方向垂直的方向为侧轴的方向**

    - > 一般而言，都设置主轴是水平的、侧轴是垂直的

- justify-content 属性：  决定flex盒子内项目在主轴的对齐方式     （水平方向）
    - flex-start : 按照**主轴的起点**方向摆放
    - flex-end: 按照**主轴的终点**方向摆放
    - center：按照主轴的中间摆放
    - space-between:  中间有空格
    - space-around: 中间和两边都有空格
    - space-evenly:  中间两边都有空格

**![justify-content属性](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/02-CSS/pic/pic03.png)**

- align-items  属性： 决定flex盒子内项目在侧轴的对齐方式            （垂直方向）

    - flex-start : 按照**侧轴的起点**方向摆放
    - flex-end: 按照**侧轴的终点**方向摆放
    - center
    - stretch:   把每个元素尽可能的拉伸高度
    - baseline

**![align-items属性](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/02-CSS/pic/pic04.png)**

- order 属性： 决定flex盒子内项目的排列摆放顺序

    - order 属性的值是一个数值
    - flex盒子会根据子项目的order的数值大小从小到大进行排序

- Flexibility: 可以设置子项的弹性。当容器有剩余空间，伸展；当容器空间不够，收缩

    - flex-grow        有剩余空间时伸展能力

    - flex-shrink      容器空间不足时收缩能力

    - flex-basis       没有伸展或收缩时的基础能力

    - >   以上三者属性，都是设置在子项目中， 属性值且都是数值



**Grid布局:**

- `display: grid` 使元素生成一个块级的Gride容器
- 使用 **grid-template** 相关属性将容器划分为网格
    - grid-template-columns         设置网格列
    - grid-template-rows               设置网格行
- 设置每一个子项目占据哪些网格，占据哪些的行和列



**浮动布局 Float:**

- 由于flex的出现，目前布局中，float应用于文字在图片的环绕

- 对自身的影响

    - float 会**将行元素转变成块元素**，如 span

      可以让行内元素也拥有宽和高

    - 浮动元素的位置尽量靠上

    - 尽量靠左（float:left）或右（float:right）

      如果某一行满足不了浮动元素的宽度要求，则元素会往下掉

- 对兄弟元素的影响

    - 不影响其他块级元素的位置
    - 影响其他块级元素的文本
    - 上面贴非 float 元素
    - 旁边贴 float 元素或者边框

- 对父级元素的影响

    - 从布局上 “消失”

    - 高度塌陷

        - 在文档流中，**父元素的高度默认是==被子元素撑开==的**

          也就是子元素多高，父元素就多高

        - 子元素设置浮动后，会完全脱离文档流

          导致其无法撑起父元素的高度，从而引起**父元素高度塌陷**

        - 解决办法：

            - 父元素设置 overflow: auto / hidden
            - 给父元素加一个 after 伪类



**定位布局：**

- position属性

| position 属性 | 含义                                                         |
| ------------- | ------------------------------------------------------------ |
| static        | 默认值，非定位元素                                           |
| relative      | 相对定位，相对自身原始位置偏移，**不脱离文档流**，不影响流内其他元素 |
| absolute      | 绝对定位，**脱离文档流**，相对最近有定位的祖先元素的定位     |
| fixed         | 相对于屏幕 / 视口的固定定位，**脱离文档流**                  |
| sticky        | 粘性定位，粘性定位元素依赖于用户的滚动，在relative 和 fixed 定位之间切换 |

- 偏移属性：top left bottom right
- fixed 主要运用于：导航栏固定



**学习 CSS 的建议：**

1. 充分利用 MDN 和 W3C CSS 规范
2. 保持好奇心，善用浏览器开发者工具
3. 持续学习，CSS 的新特性还在不断出现

