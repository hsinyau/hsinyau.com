---
title: 什么是防抖和节流？有什么区别？如何实现？
tag: 分享境
created: 2021-11-22 16:22:12
cover: https://t.mwm.moe/pc/
summary: 防抖和节流是优化高频率执行代码的一种手段，用于降低回调执行频率，节省计算资源。防抖是在一段连续操作结束后，处理回调，利用clearTimeout和setTimeout实现；节流是在一段连续操作中，每一段时间只执行一次，频率较高的事件中使用来提高性能。防抖只会触发最后一次事件，节流只有请求成功发生响应后才会触发下一次事件。防抖适用于登录、发短信等按钮避免用户点击太快，调整浏览器窗口大小时，文本编辑器实时保存等场景；节流适用于scroll事件、浏览器播放事件、input框实时搜索并发送请求展示下拉列表等场景。
---

## 什么是防抖和节流？

本质上是优化高频率执行代码的一种手段。

在前端开发的过程中，我们经常会需要绑定一些持续触发的事件，🌰如`resize`、`scroll`、`keypress`、`mousemove` 等事件在触发时，会不断地调用绑定在事件上的回调函数，极大地浪费资源，降低前端性能，但有些时候我们并不希望在事件持续触发的过程中那么频繁地去执行函数，这时候防抖和节流是比较好的解决方案。

### 定义

- 防抖: 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
- 节流: 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率

## 有什么区别？

相同点：

- 都可以通过使用 `setTimeout` 实现
- 目的都是，降低回调执行频率，节省计算资源。

不同点：

- 防抖，在一段连续操作结束后，处理回调，利用`clearTimeout`和 `setTimeout`实现。
- 节流，在一段连续操作中，每一段时间只执行一次，频率较高的事件中使用来提高性能。
- 防抖只会触发最后一次事件，节流只有请求成功发生响应后才会触发下一次事件

## 如何实现？

#### 防抖：每次触发事件时都取消之前的延时调用方法

```js title="防抖"
function debounce(fn) {
  // 创建一个标记用来存放定时器的返回值
  let timeout = null
  return function () {
    // 每当用户输入的时候把前一个 setTimeout clear 掉
    clearTimeout(timeout)
    // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, 500)
  }
}

function sayHi() {
  console.log('防抖成功')
}

const inp = document.getElementById('inp')
inp.addEventListener('input', debounce(sayHi)) // 防抖
```

#### 节流：每次触发事件时都判断当前是否有等待执行的延时函数

```js title="节流"
function throttle(fn) {
  // 通过闭包保存一个标记
  let canRun = true
  return function () {
    // 在函数开头判断标记是否为true，不为true则return
    if (!canRun)
      return
    // 立即设置为false
    canRun = false
    // 将外部传入的函数的执行放在setTimeout中
    setTimeout(() => {
      fn.apply(this, arguments)
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
      // 当定时器没有执行的时候标记永远是false，在开头被return掉
      canRun = true
    }, 500)
  }
}

function sayHi(e) {
  console.log(e.target.innerWidth, e.target.innerHeight)
}

window.addEventListener('resize', throttle(sayHi))
```

## 应用场景

##### 防抖

- 登录、发短信等按钮避免用户点击太快，以致于发送了多次请求，需要防抖
- 调整浏览器窗口大小时，resize 次数过于频繁，造成计算过多，此时需要一次到位，就用到了防抖
- 文本编辑器实时保存，当无任何更改操作一秒后进行保存

##### 节流

- scroll 事件，每隔一秒计算一次位置信息等
- 浏览器播放事件，每个一秒计算一次进度信息等
- input 框实时搜索并发送请求展示下拉列表，没隔一秒发送一次请求 (也可做防抖)

## 参考文档

[Advanced-Frontend/Daily-Interview-Question](https://github.com/Advanced-Frontend/Daily-Interview-Question)

[JS节流和防抖](https://blog.csdn.net/MichelleZhai/article/details/118343787)
