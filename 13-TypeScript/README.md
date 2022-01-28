## TypeScript 介绍

### 编程语言的类型

- 动态类型语言

  它是在**运行期间**进行数据类型检查的语言，可以直接执行。在使用动态类型语言的时候，不需要为变量指定数据类型，第一次为变量赋值的时候，在内部将数据类型记录下来，如 JavaScript，python。只有我们在运行的时候才能发现错误，因此可能会带来一些问题。常用的静态类型代码检查器有 ESLint，在编码期间根据规则提示问题。

- 静态类型语言

  它是在**编译期间**进行数据类型检查的语言，不可以直接执行，需要先编译。在编写程序的时候需要声明变量的数据类型，如 C，Java。

### 什么是 TypeScript？

- [TypeScript](https://link.juejin.cn/?target=https%3A%2F%2Fwww.typescriptlang.org%2Fzh%2F) 把不看重类型的动态语言变成关注类型的静态语言，是可扩展的 JavaScript、JavaScript 的超集。除了原生的 JavaScript，它还提供了类型系统。
- 提供 ES6 语法支持。
- 兼容各种浏览器和系统，开源。

### TypeScript 的优势

1. 可读性更强：想知道函数方法的参数类型时，代码就是全部的注释。
2. 效率更高：不同代码块和定义中进行跳转，代码自动补全，丰富的接口提示。
3. 可维护性更强：在编译期间能够发现大部分错误。
4. 非常好的包容性：完全兼容 JavaScript，第三方库可以单独编写类型文件，大多数项目支持 TypeScript。

### 安装 TypeScript

安装 TypeScript：

```shell
npm install -g typescript
```

查看版本：

```shell
tsc -v
```

`tsc` 是指 `TypeScript Compiler`。

创建一个 ts 文件：

```typescript
// hello.ts
// 指定 name 参数的类型为 string
const hello = (name: string) => {
  return `hello ${name}`;
}

hello('ts');
```

编译成 js 文件：

```shell
tsc hello.ts
```

生成了一个新的 js 文件：

```js
// hello.js
var hello = function (name) {
    return "hello ".concat(name);
};
hello('ts');
```

若在 ts 文件中出现问题则会报错：

```typescript
// hello.ts
const hello = (name: string) => {
  return `hello ${name}`;
}

// 123 不是字符串
hello(123);
> tsc hello.ts
hello.ts:5:7 - error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.

5 hello(123);
        ~~~


Found 1 error.
```

但仍然会生成 js 文件：

```js
// hello.js
var hello = function (name) {
    return "hello ".concat(name);
};
hello(123);
```

可以看到，`tsc` 编译时即使报错也会生成结果。

## 基本语法

### 基础数据类型

基础数据类型和 any 类型的声明：

```ts
let bool: boolean = true;
let num: number = 10;
let str: string = 'ts';
let tempStr: string = `Hello, ${str}`;
let big: bigint = 1n;
let sym: symbol = Symbol();
let u: undefined = undefined;
let n: null = null;

// undefined 和 null 是所有类型的子类型，可以将其赋值给其他类型的变量
num = undefined;

// any 类型是类型系统的顶级类型，任何类型都可归为 any 类型
let anyType: any = 123;
anyType = 'string';
anyType = true;

// 可以访问 any 类型对象的任何属性和方法
anyType.name;
anyType.add();
```

[undefined 与 null 的区别](https://link.juejin.cn/?target=https%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2014%2F03%2Fundefined-vs-null.html)：

- 相同点：undefined 和 null 在 if 语句中都会被转为 false。
- 最初设想：区分原始类型和合成类型的空值。将原始类型的空值定义为 undefined，转为数字时是 NaN；合成类型的空值定义为 null，转为数字时是 0。最终还是无法区分。
- 目前用法：null 表示“没有对象”，该处不应该有值；undefined 表示“缺少值”，该处应该有一个值，但是还没有定义。

### 数组和元组

```typescript
// 数组 将同一类型是数据聚合在一起
let arr: number[] = [1, 2];       // 类型加方括号表示
let arr2: Array<number> = [3, 4]; // 泛型表示
interface IArr {                  //接口表示
  [key: number]: any;
}
arr.push(3);

// 类数组 arraylike object 不可使用数组方法
function foo() {
  console.log(arguments);
}

// 元组 triple 设置每一项的数据类型，元组是数组
let user: [string, number] = ['Joe', 20];
// 使用数组 push 的值只能是元组已定义的类型之一
user.push(30);
```

### Interface 接口

接口是对对象的形状（shape）的描述，使用接口可以帮助我们定义 Object 类型。

Interface 是一种[鸭子类型](https://link.juejin.cn/?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2F%E9%B8%AD%E5%AD%90%E7%B1%BB%E5%9E%8B)。它更关注对象的如何被使用，而不是对象类型本身。

Interface 不是 JS 中的概念，编译后不会被转为 JS，只能用于静态类型检查。

```typescript
interface Person {
  name: string;
  // 可选属性
  age?: number;
  // 只读属性，只能在创建的时候被赋值
  // readonly 用于属性，const 用于变量
  readonly id: number;
  // 任意属性，约束所有对象属性必须是该类型的子类型
  [key: string]: number | string;
}

let Joe: Person = {
  name: 'Joe',
  age: 20,
  id: 1
}

// Joe.id = 2; 无法分配到 "id" ，因为它是只读属性。
Joe.address = 'wuhan'; // 添加任意属性
```

Interface 像是一种规范和契约，如果与其不同则会发出警告。

### 函数

函数是一等公民。函数和其他类型的对象一样，可以作为参数、存入数组、赋值给变量等等。

函数由输入和输出两部分构成。

```typescript
// 约定函数的输入和输出
// 函数声明
function add(x: number, y: number, /*可选参数*/z?: number): number {
  if (typeof z === 'number') {
    return x + y + z;
  } else {
    return x + y;
  }
}

let result: number = add(1, 2); // 3

// 函数表达式
const add1 = (x: number, y: number): number => {
  return x + y;
}

const add2: (x: number, y: number) => number = (x, y) => {
  return x + y;
}

// interface 描述函数类型
interface ISum {
  // 参数类型: 返回值类型
  (x: number, y: number): number
}

const add3: ISum = add1;
```

函数重载：

```ts
// 对 getDate 函数进行重载，timestamp 为可缺省参数
// 传入的 type 是 date 则返回 Date 类型，传入 string 则返回 string 类型
// 第一个和第二个函数声明的意义是 type 值确定后，返回的值类型也能被确定为 Date 或 string
// 若只声明第三个函数，则返回值为 Date | string 类型
function getDate(type: 'string', timestamp?: string): string;
function getDate(type: 'date', timestamp?: string): Date;
function getDate(type: 'string' | 'date', timestamp?: string): Date | string {
  const date = new Date(timestamp);
  return type === 'string' ? date.toLocaleString() : date;
}
const x = getDate('date');// x: Date
const y = getDate('string', '2018-01-10');// y: string
```

### 类型推论

类型推论在赋值时自动定义变量的类型。

```typescript
// type inference 类型推论
let str = 'str';
// str = 123; 不能将类型“number”分配给类型“string”。
// 定义时不赋值的情况下，变量会定义为 any 类型而不被类型检查

// any 类型允许变量变更为任一类型
```

### 联合类型

联合类型使变量可以是多个类型中的一种。

```typescript
// union types 联合类型
// 定义为 number 类型或者 string 类型，只能访问两个类型的共有属性
let numOrStr: number | string;
numOrStr = "123";
numOrStr = 123;
// numOrStr.length; 类型“number”上不存在属性“length”。
```

### 类型断言

类型断言使用 as 告诉编译器你比它更了解这个类型，并且让它不报出错误。

```typescript
// type assertion 类型断言
function getLength(input: string | number): number {
  const str = input as string;
  if (str.length) {
    return str.length;
  } else {
    const number = input as number;
    return number.toString().length;
  }
}
// 类型断言不是类型转换，只能断言为已定义的类型
```

### 类型守卫

联合类型通过条件语句与 typeof instanceof 等自动缩小类型范围。

```typescript
// type guard 类型守卫
function getLength2(input: string | number): number {
  if (typeof input === "string") {
    return input.length;
  }
  else {
    // 该分支的 input 是 number 类型，智能缩小了范围
    return input.toString().length;
  }
}
```

### Class 类

#### 类的基础知识

- 类：定义了一切事物的抽象特点
- 对象：类的实例
- 面向对象三大特征：封装（隐藏数据操作的细节，只暴露操作的接口）、继承（子类继承父类，此外可拥有更多的特性）、多态（继承的不同类可以对同一方法可以有不同的相应）

#### TypeScript 中的类

- 三种修饰符提供权限管理：public（在任何地方都可被调用，默认）、private（无法被外部调用）、protected（在子类中可被访问）
- `readonly` 只读属性，无法被修改。

```typescript
// 类
class Animal {
  readonly name: string;
  constructor(name) {
    this.name = name
  }
  run() {
    return `${this.name} is running`
  }
}

// 对象
const snake = new Animal('lily')
// snake.name = 'Joe'; 无法分配到 "name" ，因为它是只读属性。
console.log(snake.run()) // lily is running

// 继承
class Dog extends Animal {
  bark() {
    return `${this.name} is barking`
  }
}

const xiaobao = new Dog('xiaobao')
console.log(xiaobao.run()) // xiaobao is running
console.log(xiaobao.bark()) // xiaobao is barking

// 多态
class Cat extends Animal {
  static categories = ['mammal'] // 静态属性不需实例化，直接调用
  constructor(name) {
    super(name)
    console.log(this.name) // maomao
  }
  run() {
    return 'Meow, ' + super.run()
  }
}
const maomao = new Cat('maomao')
console.log(maomao.run()) // Meow, maomao is running
console.log(Cat.categories) // [ 'mammal' ]
```

#### 类和接口

- 继承的困境：一个类只能继承另外一个类
- 类可以使用 implements 来实现接口

```typescript
interface Radio {
  switchRadio(trigger: boolean): void;
}

interface Battery {
  checkBatteryStatus(): void;
}

// 接口的继承
interface RadioWithBattery extends Radio, Battery {
}

class Car implements Radio {
  switchRadio(trigger: boolean) {
    // todo...
  }
}

// class Cellphone implements Radio, Battery {
class Cellphone implements RadioWithBattery {
  switchRadio(trigger: boolean) {
    // todo...
  }
  checkBatteryStatus() {
    // todo...
  }
}
```

### Enum 枚举

我们有时候会使用一个范围内的一系列常量，这些值可以用枚举来表示。

数字枚举：

```typescript
// 数字枚举
enum Direction {
  // 枚举成员会从 0 开始赋值
  Up, // (enum member) Direction.Up = 0
  Down, // (enum member) Direction.Down = 1
  // 可以手动赋值，之后的项会依次递增
  Left = 10, // (enum member) Direction.Left = 10
  Right, // (enum member) Direction.Right = 11
}

console.log(Direction.Up); // 0
console.log(Direction[0]); // Up
```

编译成的 js：

```js
var Direction;
(function (Direction) {
    // 实现双向赋值
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 10] = "Left";
    Direction[Direction["Right"] = 11] = "Right";
})(Direction || (Direction = {}));
console.log(Direction.Up);
console.log(Direction[0]);
```

字符串枚举：

```typescript
// 字符串枚举，用于进行字符串比较
enum Direction {
  Up = 'UP', // (enum member) Direction.Up = "UP"
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

const value = 'UP'

if (value === Direction.Up) {
  console.log('go up!')
}
var Direction;
(function (Direction) {
    Direction["Up"] = "UP";
    Direction["Down"] = "DOWN";
    Direction["Left"] = "LEFT";
    Direction["Right"] = "RIGHT";
})(Direction || (Direction = {}));
var value = 'UP';
if (value === Direction.Up) {
    console.log('go up!');
}
```

常量枚举：

常量枚举可以提升性能，枚举的值会直接编译为结果。常量枚举会内联枚举的任何用法，并且不会将枚举编译为 JS。

只有常量值（ const number ）才能进行常量枚举，计算值（ computed number ）则不可以。

```typescript
// 常量枚举，可以提升性能
const enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

const value = 'UP'

if (value === Direction.Up) {
  console.log('go up!')
}
var value = 'UP';
if (value === "UP" /* Up */) {
    console.log('go up!');
}
```

### Generics 泛型

#### 泛型的用法

首先我们来定义一个函数用于返回传入的参数：

```typescript
function echo(arg) {
  return arg;
}

const result = echo(123); // const result: any
```

此时的 result 为 any 类型，我们为了使 echo 的返回值与传入的值类型相等且精确，我们可以使用泛型。

泛型在定义函数、接口和类的时候不预先指定类型，而是在使用时指定类型。

```typescript
function echo<T>(arg: T): T {
  return arg;
}

const result = echo('str'); // const result: "str"，类型断言为 string
// 调换元组中的两项的内容
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}
const result2 = swap(['string', 123]) // [123, 'string']
```

#### 约束泛型

如果我们想让一个函数打印数组或字符串的长度，这样写会出错：

```typescript
function echoWithArr<T>(arg: T): T {
  console.log(arg.length); // 类型“T”上不存在属性“length”。
  return arg
}

function echoWithArr2<T>(arg: T[]): T[] { // 无法传入 string 类型
  console.log(arg.length);
  return arg
}
```

我们使用 extends 继承接口来约束泛型：

```typescript
interface IWithLength {
  length: number
}

// 用 extends 来约束传入的泛型，规定它必须要有 length 属性
function echoWithLength<T extends IWithLength>(arg: T): T {
  console.log(arg.length)
  return arg
}

const str = echoWithLength('str')
const obj = echoWithLength({ length: 10, width: 10 })
const arr2 = echoWithLength([1, 2, 3])
```

这里再次体现了鸭子类型的概念，只要参数有 length 属性就能使用该函数。

```typescript
// 泛型约束:限制泛型必须符合字符串
// type IGetRepeatStringArr = <T extends string>(target: T) => T[];
const getStrArr: IGetRepeatStringArr = target => new Array(100).fill(target);
// 报错: 类型"number"的参数不能赋给类型“string"的参数
getStrArr(123);

// 泛型参数默认类型，使用 = 来指定默认类型，使用时如果不传入类型则默认 number
type IGetRepeatArr<T = number> = (target: T) => T[];
const getRepeatArr: IGetRepeatArr = target => new Array(100).fill(target);
// 报错: 类型“string"的参数不能赋给类型“number”的参数
getRepeatArr('123');

const getRepeatArr2: IGetRepeatArr<string> = target => new Array(100).fill(target);
getRepeatArr2('123');
```

#### 在类和接口中的应用

```typescript
// 类
class Queue<T> {
  private data = [];
  push(item: T) {
    return this.data.push(item)
  }
  pop(): T {
    return this.data.shift()
  }
}
const queue = new Queue<number>()
queue.push(1)
console.log(queue.pop().toFixed())

// 接口
interface KeyPair<T, U> {
  key: T
  value: U
}
let kp1: KeyPair<number, string> = { key: 1, value: "string" }
let kp2: KeyPair<string, number> = { key: 'str', value: 2 }

let arr: number[] = [1, 2, 3]
// 使用泛型来声明类型
let arr2: Array<number> = [1, 2, 3]
```

### 类型别名

类型别名用来给一个类型定义新的名字，它与 interface 有所不同。

```typescript
// type aliase 类型别名
let sum: (x: number, y: number) => number;
const result = sum(1, 2);

// 创建函数的类型别名
type PlusType = (x: number, y: number) => number;
let sum2: PlusType;
const result2 = sum2(2, 3);

// 创建对象的类型别名
type Person = { name: string, age: number }
var Jack: Person = { name: "Jack", age: 18 }

// 创建联合类型的类型别名
type StrOrNumber = string | number;
let result3: StrOrNumber = '123';
result3 = 123;
```

`type` 定义的是类型的别名，当需要使用交叉或联合的时候可以使用这种方式。 `interface` 定义独特的类型，当需要使用 extends 和 implements 时使用这种方式。

### 字面量

字面量不仅可以表示值，还可以表示类型，即字面量类型。

```typescript
// 字面量类型，不能赋值类型之外的内容
let str: 'name' = 'name';
// str = 'name1'; 不能将类型“"name1"”分配给类型“"name"”。
const number: 1 = 1;

// 字面量类型的类型别名
type Directions = 'Up' | 'Down' | 'Left' | 'Right';
let toWhere: Directions = 'Left';
```

### 交叉类型

交叉类型是将多个类型合并为一个类型。

```typescript
// 交叉类型的类型别名
interface IName {
  name: string
}
type IPerson = IName & { age: number };
let person: IPerson = { name: '123', age: 123 };
```

### 声明文件

使用 jQuery 时，一种方法是在 html 中通过 script 标签直接引入，之后在 ts 中使用时，直接在 ts 中使用时，tsc 无法知道 jQuery 是什么。

```typescript
jQuery('#id') // 找不到名称“jQuery”。
```

使用 `declare` 关键字告诉 tsc，表示 jQuery 变量已经在其他位置定义

```typescript
declare var jQuery: (selector: string) => any;
jQuery('#id')
```

一般将声明放入 `.d.ts` 文件，表示该文件有适配 ts 的类型声明：

```typescript
// jQuery.d.ts
declare var jQuery: (selector: string) => any;
```

declare 并没有定义变量的实现，只定义了变量的类型。仅用于类型的检查。

之后，其他文件中使用时会有对应的代码补全和接口提示。ts 会解析项目中所有的 ts 文件，当 `.d.ts` 文件放在项目中时，所有的项目文件都会有相应的类型定义。

当使用第三方库时，我们可以使用第三方的声明文件，之后无需再手动声明。

例如，使用下面的命令安装 jQuery 的类型文件：

```shell
npm install --save @types/jquery
```

`@types` 表示该文件只有了类型定义，没有具体的实现。

可以在下面的网址搜索第三方相应的声明文件：

- [@types 官方声明文件库](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FDefinitelyTyped%2FDefinitelyTyped%2F)
- [@types 搜索声明库](https://link.juejin.cn/?target=https%3A%2F%2Fmicrosoft.github.io%2FTypeSearch%2F)

目前很多库的源代码中自带类型定义，这种情况下安装源文件即可。

例如：

```shell
npm install --save redux
```

我们可以看到 `node_modules\redux\index.d.ts` 即类型的声明文件。

### 内置类型

JavaScript 中有许多[标准内置对象](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2Freference%2Fglobal_objects)，标准内置对象是根据标准（ ECMA，DOM 等）在全局作用域 global 中存在的对象。

```typescript
// global object
const a: Array<number> = [1, 2, 3];
const date: Date = new Date();
date.getTime();
const reg = /abc/;
reg.test("a");

// Math 与其他全局对象不同的是，Math 不是一个构造器。Math 的所有属性与方法都是静态的。
Math.pow(2, 2);
```

可以看到这些类型在不同的文件中有多处定义，但是它们都是内部定义的一部分，然后根据不同的版本或者功能合并在了一起。一个 interface 或者类多次定义会合并在一起。这些文件一般都是以 lib 开头，以 d.ts 结尾，表示这是一个内置对象类型。

```typescript
// DOM 和 BOM 标准对象
// document 对象，返回的是一个 HTMLElement
let body: HTMLElement = document.body;
// document 上面的query 方法，返回的是一个 nodeList 类型
let allLis = document.querySelectorAll('li');

// 回调函数中，因为类型推断，这里面的 e 事件对象也自动获得了 mouseEvent 类型。因为点击是一个鼠标事件，现在我们可以方便的使用 e 上面的方法和属性。
document.addEventListener('click', (e) => {
  e.preventDefault()
})
```

### 工具类型

Typescript 还提供了一些功能性、帮助性的类型。这些类型在 JS 中是看不到的，叫做工具类型，它提供一些简洁明快而且非常方便的功能。

```typescript
// utility types
// partial，它可以把传入的类型都变成可选
interface IPerson {
  name: string
  age: number
}

let Joe: IPerson = { name: 'Joe', age: 20 }
type IPartial = Partial<IPerson>
let Joe2: IPartial = {}

// Omit，它返回的类型可以忽略传入类型的某个属性
type IOmit = Omit<IPerson, 'name'>
let Joe3: IOmit = { age: 20 }
```

## 工程应用

### Web

在 webpack 中：

1. 配置 Webpack loader 相关配置
2. 配置 tsconfig.js 文件
3. 运行 webpack 启动 / 打包
4. loader 处理 ts 文件时，会进行编译与类型检查

### Node

1. 安装 Node 与 npm
2. 配置 tsconfig.js 文件
3. 使用 npm 安装 tsc
4. 使用 tsc 运行编译得到 js 文件
