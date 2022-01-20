#  前端与HTML



### 前端

产品中前端关注的内容：

- 功能
- 美观
- 安全
- 性能
- 兼容
- 用户体验
- 无障碍 Accessibility



前端的边界

- node.js开发服务器端应用
- electron开发客户端应用
- WebGL开发3D游戏
- React Native
- WebRTC

---



### HTML

> HTML 全称：HyperText Markup Language               HyperText包含：图片、标题、链接、表格



DOM树：

- HTML描述了一个页面的结构，浏览器会把HTML结构字符串解析转换DOM树形结构



a标签：

```HTML
<a href="http://www.google.com" target="_blank">`
```

- target=“_blank” 意味在新页面中打开该链接



媒体标签：

```HTML
<img src="" alt="" width="" />
<audio src="" controls> </audio>
<video src="" controls> </video>
```

- alt属性： 以文字的形式去形容img



输入： 表单类控件

- placeholder属性： 默认值

-  <input> 标签中type属性：

    - text、password

    - range、number、date

    - checkbox 多选框

        - ```HTML 
          <p>
            <label>
              <input type="checkbox" >
            </label> 篮球
            <label>
              <input type="checkbox" checked>
            </label> 足球
          </p>
          ```

    - radio 单选框

        - ```HTML
          <p>
            <label for="1">
              <input type="radio" name="sex" id="1" checked>男
            </label>
            <label for="2">
              <input type="radio" name="sex" id="2">女
            </label>
          </p>
          ```

    - 不同radio 单选框的内容由name属性进行关联
    - <label>属性可以通过设置for属性进行关联对应<input>标签中的id属性

-  <select>  下拉标签



常见页面整体的划分：

![理解HTML](https://raw.githubusercontent.com/lesenelir/ByteDance-WebCampers/master/01-HTML/pic/pic01.png)




语义化标签：

- 定义：HTML中的元素、属性及属性值都拥有某些含义。开发者应该遵循语义来编写HTML
- 好处：
    - 代码可读性
    - 可维护性
    - 搜索引擎优化
    - 提升无障碍性



src和href的区别：

- 嵌入页面内部，用 src
- 访问外部链接，用 href

