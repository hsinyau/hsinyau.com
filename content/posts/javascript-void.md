---
title: JavaScript Void 运算符
tag: 分享境
created: 2022-06-18 12:28:33
summary: 在大厂里，var变量不能直接赋值undefined，而是要用void 0来赋值。void操作符用于将表达式求值为undefined，常用于获取undefined原始值和防止变量被赋值。同时，void还可以将函数声明转化为函数表达式，防止a标签默认事件和在箭头函数中避免泄漏。
cover: https://t.mwm.moe/pc/
---
最近看到一个大佬直播时提到，在大厂里 var 变量是不能直接赋值 undefined 的，而是要用 void 0 来赋值。

```js title="Bad adn Good"
// Bad
var a = undefined

// Good
var a = void 0
```

**void 0** 是个啥东西？这两种赋值效果不是一样的嘛？

## void 操作符是什么?

MDN 是这样描述的：

The void operator evaluates the given expression and then returns [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

void 运算符 对给定的表达式进行求值，然后返回 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。

This operator allows evaluating expressions that produce a value into places where an expression that evaluates to [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) is desired.

这个运算符能向期望一个表达式的值是[`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)的地方插入会产生副作用的表达式。

The void operator is often used merely to obtain the `undefined` primitive value, usually using "void(0)" (which is equivalent to "void 0"). In these cases, the global variable [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) can be used.

void 运算符通常只用于获取 `undefined`的原始值，一般使用 void(0)（等同于 void 0 ）。在上述情况中，也可以使用全局变量[`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 来代替（假定其仍是默认值）。

## undefined 又是什么?

undefined 是 javascript 的七种原始数据类型之一。

**Tips**:原始类型数据的特点:值保存在变量本地,且赋值给其他变量后，其它变量改变不影响原来的值，变量存放在栈区的(栈区指内存里的栈内存).

同时 undefined 还是全局对象的一个属性。也就是说，它是全局作用域的一个变量。undefined 的最初值就是原始数据类型 undefined。

## 为什么要用 void?

我们知道 undefined 在 JavaScript 中是一个保留字。哪既然他是一个保留字，我们就可以为它赋值。

```javascript title="undefined 赋值"
function test() {
  const undefined = 1
  console.log(undefined) // 1
}

test()

console.log(undefined) // undefined
```

赋值之后你提取到的 undefined 就不等于 undefined 了，当然如果我们使用的是 window 对象上的 undefined，也可能被赋值。所以你直接使用的 undefined ，不一定是100%可靠。这也就是 void 的第一个作用。

## void 的其他作用

### 立即调用的函数表达式

在使用立即执行的函数表达式时，可以利用 void 运算符让 JavaScript 引擎把一个function 关键字识别成函数表达式而不是函数声明（语句）。
在这以前我们要让一个函数立即调用(定义时就会立即执行)，会采用这样的写法：
```javascript title="IIFE"
(function IIFE() {
  // ...
})()
```

而 void 可以起到跟上面代码一样的作用: 将函数声明式转化为函数表达式。
```javascript title="将函数声明式转化为函数表达式"
void (function IIFE() {
  // ...
}())
```

### JavaScript URIs

这是我在这之前使用的最多的一个方法, 阻止 a 标签的默认事件时会用到这个。

```html title="阻止 a 标签的默认事件"
<a href="javascript:void(0);">这个链接点击之后不会做任何事情，如果去掉 void()，点击之后整个页面会被替换成一个字符 0。</a>
<a href="javascript:void(document.body.style.backgroundColor='green');">点击这个链接会让页面背景变成绿色。</a>
```

### 在箭头函数中避免泄漏

箭头函数标准中，允许在函数体不使用括号来直接返回值。 如果右侧调用了一个原本没有返回值的函数，其返回值改变后，则会导致非预期的副作用。 安全起见，当函数返回值是一个不会被使用到的时候，应该使用 void 运算符，来确保返回 undefined，这样，当 API 改变时，并不会影响箭头函数的行为。

```javascript title="在箭头函数中避免泄漏"
button.onclick = () => void doSomething()
```

确保了当 doSomething 的返回值从 undefined 变为 true 的时候，不会改变函数的行为

## 参考

[void operator - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void)

[IIFE（立即调用函数表达式）](https://developer.mozilla.org/zh-CN/docs/Glossary/IIFE)

[difference between "void 0 " and "undefined"](https://stackoverflow.com/questions/4806286/difference-between-void-0-and-undefined)
