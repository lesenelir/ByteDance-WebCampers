# 理解CSS



### CSS

>  CSS 全称： Cascading Style Sheets  层叠样式表              定义元素的样式



**CSS如何工作：**

![CSS如何工作](/Users/shuuhiko/Library/Application Support/typora-user-images/image-20220116152627033.png)



**选择器：**

- 标签名

- .class（最常用）

- \#id（id在页面中唯一）

- 通配选择器，选择所有的标签

- 属性选择器 [ ]

    - 包含某种属性

    - 属性值为特定的值，或符合特定的匹配规则

      - ```CSS
        a[href^="#"] {
      	  /*选择属性href的值为#开头的a标签*/
        },
        a[href$=".jpg"] {
          /*选择属性href的值以.jpg结尾的a标签*/
        }
        ```

- 伪类选择器 :

    - 状态伪类
      - **用户与标签节点进行交互**时使元素处于不同的状态，根据不同的状态来触发
      - a:link、a:hover、a:visited、a:active
      - :focus （输入框输入状态）
    - 结构伪类
      - 根据**节点在DOM树中的位置**来决定是否选择该节点
      - li:first-child、li:last-child

- 选择器的组合 Combinators

| 名称             | 语法 | 说明                      | 示例        |
| ---------------- | ---- | ------------------------- | ----------- |
| 直接             | AB   | 同时满足A和B              | input:focus |
| 后代             | A B  | 选中B，若B是A的后代       | nav a       |
| 亲子（直接后代） | A>B  | 选中B，若B是A的直接子元素 | section>p   |
| 兄弟             | A~B  | 选中B，若B在A后且与A同级  | h2~p        |
| 相邻             | A+B  | 选中B，若B紧跟在A后       | h2+p        |

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
    - rgb(x, x, x)    对应红绿蓝的数值
    - #000000    每两位一组，取值 00 ～ ff
- HSL
    - **Hue 色相**，是色彩的基本属性，取值0~360（环）
      - hsl(20, 100%, 80%)
    - **Saturation 饱和度**，是色彩的**鲜艳**程度，取值0~100%
    - **Lightness 亮度**，是色彩的**明暗**程度，取值0~100%

- alpha透明度，取值0~1；1代表不透明，0代表完全透明
    - rgb**a**(255,0,0,0.23)
    - hsl**a**(0,100%,50%,0.66)



**字体大小 font-size:**

- 关键字

    - small, medium, large

- 长度

    - px           设置字体具体的大小

    - em          设置字体相对长度单位（弹性的布局可以用em）

      - em的值并不是固定的

      - em会继承父级元素的字体大小

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



**行高 line-height:**

- 设置行间距

- line-height 有数值则按照数值显示；line-height没有数值，则表示font-size的倍数

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



---

### 深入CSS





