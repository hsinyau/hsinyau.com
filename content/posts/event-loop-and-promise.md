---
title: JS 异步编程：事件循环与 Promise 机制
tag: 笔记本
summary: 本文全面介绍了异步编程的相关知识。解释了异步编程的概念，即允许程序在执行耗时操作时不阻塞线程，以提升用户体验、充分利用资源等。阐述了浏览器和 Node.js 的事件循环机制，包括宏任务和微任务的区分及执行顺序。还详细说明了 JavaScript 中异步编程的相关内容，如 Promise 的状态、特点、链式调用，以及 async/await 语法。
created: 2023-09-13 07:59:45
cover: https://bu.dusays.com/2024/08/14/66bcc66d118c9.jpg
---

## 什么是异步编程

异步编程是一种编程方式，它允许程序在执行一个耗时操作时，不必阻塞当前线程等待操作完成，而是可以继续执行其他任务，当耗时操作完成后，再通过回调函数、事件或者其他机制来处理操作的结果。

举个栗子：比如您在网上预订了一张火车票。提交订单后，您不需要一直盯着订单处理的页面。您可以去收拾行李、规划行程，或者做其他事情。
当订票成功或者出现问题时，系统会通过短信或者 App 推送消息通知您结果。这个预订火车票的过程也是异步编程，您不必等待订票结果出来才能进行后续的准备工作。

## 为什么JS需要异步编程

JS 最初是为在浏览器中运行而设计的，属单线程，同一时刻只能执行一项任务。遇到网络请求、文件读写等耗时操作，程序会停滞直至完成。

为避免线程阻塞，JS 引入事件循环机制实现非阻塞操作，这是异步编程的核心。

JS 需要异步编程，原因如下：

- 提升用户体验。网页应用中，同步操作执行耗时任务时，页面会卡顿或无响应，用户不满甚至关闭页面。异步编程能让页面在耗时任务进行时仍响应操作，保持流畅交互。比如用户点击按钮触发数据请求，同步会卡住，异步则能继续其他操作。

- 充分利用资源。浏览器和服务器资源有限，任务阻塞会浪费资源。异步编程可在等待时处理其他任务，提高利用率。如电商网站添加商品到购物车时，异步更新库存等不影响用户浏览。

- 处理网络请求。现代 Web 应用中网络请求常见，耗时且不稳定，异步编程能更好应对，避免程序因等待响应而停滞。如社交网站加载好友动态，异步能让用户同时做其他操作。

- 适应多任务环境。应用常需同时处理多任务，异步编程能让 JS 有效应对，如在线协作工具中多个用户同时编辑文档，异步能及时处理操作，互不阻塞。

## 浏览器的事件循环

浏览器的事件循环是一种机制，用于管理和协调 JavaScript 代码的执行以及处理各种异步任务。

它的工作原理大致如下：

首先，JavaScript 运行在一个单线程环境中，称为主线程。当执行同步代码时，会按照顺序依次执行。当遇到异步任务，比如网络请求、定时器、用户交互事件（如点击、滚动等），这些任务会被放入浏览器的任务队列中。

主线程会持续执行同步任务，直到所有同步任务执行完毕。然后，它会去检查任务队列，看看是否有异步任务的回调函数可以执行。如果有，就会取出并执行这些回调函数。任务队列通常分为宏任务队列和微任务队列。

### 微任务-Micro-tasks

- Promise 的 `.then()`、`.catch()` 和 `.finally()` 回调
- async / await 语法中的 await 关键字后面的代码
- MutationObserver  监听 DOM 变化时的回调函数

### 宏任务-Macro-tasks

- 定时器事件：`setTimeout`、`setInterval`
- 渲染事件：解析 DOM、计算布局、绘制
- 交互事件：如鼠标点击、键盘事件
- I/O 操作：网络请求、文件读写

在每次执行完一个宏任务后，会先清空微任务队列中的所有微任务，然后再去检查宏任务队列。

例如，当您在网页中点击一个按钮触发一个异步操作，这个操作会被放入任务队列。当主线程空闲时，就会处理这个异步操作的回调。再比如，使用 Promise 时，then 方法中的回调会被放入微任务队列，确保在当前宏任务执行完后尽快执行。

### 演示代码

**使用 setTimeout**

```js
console.log('1')

setTimeout(() => {
  console.log('2')
}, 0)

console.log('3')
```

在这个例子中，输出顺序为 1、3、2。尽管 setTimeout 的时间设置为 0 毫秒，但它仍然会在所有同步任务完成后才执行。

**结合 Promise**

```js
console.log('1')

Promise.resolve().then(() => {
  console.log('2')
})

setTimeout(() => {
  console.log('3')
}, 0)

console.log('4')
```

这里的输出顺序是：1、4、2、3。因为在每个宏任务执行完后，会先处理微任务队列中的任务。

**多个 setTimeout 和 Promise**

```js
console.log('1')

setTimeout(() => {
  console.log('2')
}, 0)

Promise.resolve().then(() => {
  console.log('3')
})

setTimeout(() => {
  console.log('4')
}, 0)

console.log('5')

Promise.resolve().then(() => {
  console.log('6')
})
```

输出顺序为：1、5、3、6、2、4。

**总结一下：**

<Alert
  content="同步和异步任务会进入不同的执行环境。同步的进入主线程，即主执行栈 (Call Stack)，异步的进入任务队列 (Queue)。"
  type="danger"
/>

<Alert
  content="事件循环的每个循环中，同步任务  →  微任务(Micro-tasks)  →  宏任务(Macro-tasks)"
  type="danger"
/>

## Node.js的事件循环

Node.js 的事件循环机制与浏览器中的事件循环有相似之处，但也存在一些差异。

Node.js 的事件循环基于 libuv 库实现，它主要有 6 个阶段：

1. timers：处理通过 setTimeout() 和 setInterval() 设定的到期定时器回调。

2. pending callbacks：执行一些系统操作的回调，例如 TCP 错误。

3. idle, prepare：内部使用，普通用户代码通常不涉及。

4. poll：获取新的 I/O 事件，例如网络请求、文件读取等。在这个阶段，如果没有 I/O 事件，会在一定条件下阻塞。

5. check：执行 setImmediate() 的回调。

6. close callbacks：处理一些关闭的回调，例如 socket 关闭。

例如，如果您在 Node.js 中使用 `setTimeout(() => { console.log('Timeout!'); }, 500)`，当指定的 500 毫秒过去后，回调会在 timers 阶段被处理。

再比如，如果使用 setImmediate`(() => { console.log('Immediate!'); })`，其回调会在 check 阶段被处理。

在事件循环的每次迭代中，会依次检查这些阶段，按照顺序执行相应的任务和回调。

### 宏任务与微任务

跟浏览器中的js一样，node中的异步代码也分为宏任务和微任务，只是它们之间的执行顺序有所区别。
我们再来看看Node中都有哪些宏任务和微任务

**宏任务**

<Alert
  content="setlnterval、setimeout、setlmmediate、I/O"
  type="danger"
/>

**微任务**

<Alert
  content="Promise.then、Promise.catch、Promise.finally、process.nextTick"
  type="danger"
/>

对于微任务我们还有个点需要特别注意。那就是虽然 nextTick 同属于微任务，但是它的优先级是高于其它微任务，在执行微任务时，只有nextlick中的所有回调函数执行完成后才会开始执行其它微任务。

### 演示代码

**setTimeout 和 setImmediate 的执行顺序**

```js
console.log('1')

setTimeout(() => {
  console.log('2')
}, 0)

setImmediate(() => {
  console.log('3')
})

console.log('4')
```

在这个例子中，setTimeout 和 setImmediate 的执行顺序不一定，有时 setTimeout 回调先执行，有时 setImmediate 回调先执行，这取决于当时的系统状态。

**结合 Promise 和 process.nextTick**

```js
console.log('1')

process.nextTick(() => {
  console.log('2')
})

Promise.resolve().then(() => {
  console.log('3')
})

console.log('4')
```

输出顺序为：1、4、2、3。首先，执行同步输出1、4。接着，process.nextTick 的回调会在当前操作结束后立即执行，所以输出 2。
最后，`Promise.resolve().then` 属于微任务，在当前宏任务（这里指同步代码的执行）结束后执行，所以输出 3。

**多个阶段的综合示例**

```js
console.log('1')

setTimeout(() => {
  console.log('2')
}, 0)

setImmediate(() => {
  console.log('3')
})

process.nextTick(() => {
  console.log('4')
})

Promise.resolve().then(() => {
  console.log('5')
})

console.log('6')
```

输出顺序为：1、6、4、5、3、2。首先，执行同步代码输出 1、6。然后，process.nextTick 的回调会在当前操作结束后立即执行，所以输出 4。
接着，Promise.resolve().then 的回调作为微任务被执行，输出 5。再之后，进入事件循环的检查阶段，执行 setImmediate 的回调，输出 3。
最后，当满足 setTimeout 的时间条件时，执行其回调，输出 2。

## Promise

Promise 是 JavaScript 中用于处理异步操作的一种对象。

它代表了一个可能在未来完成或失败的操作，并提供了一种更优雅、更结构化的方式来处理异步代码的结果。

Promise 有三种状态：Pending（进行中）、Fulfilled（已成功）和 Rejected（已失败）。

它有以下特点：

1. 不可撤销性：对于一个耗时较长的异步操作而言，无法在中途予以停止。

2. 错误处理方面：倘若未设定回调函数，Promise 内部所抛出的错误将无法在外部体现出来。

3. 单次处理特性：Promise 仅能实现一次解决或拒绝，它不能应对重复出现的事件。

当创建一个 Promise 时，它初始处于 Pending 状态。
异步操作完成后，如果成功，Promise 会转变为 Fulfilled 状态，并携带一个结果值；
如果失败，Promise 会转变为 Rejected 状态，并携带一个错误对象。

通过 then 方法可以指定 Promise 对象成功和失败时的回调函数，分别处理操作成功的结果和失败的原因。例如：

```js
const myPromise = new Promise((resolve, reject) => {
  // 模拟异步操作
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve('操作成功！')
    }
    else {
      reject('操作失败！')
    }
  }, 1000)
})

myPromise.then((result) => {
  console.log(result)
}, (error) => {
  console.error(error)
})
```

Promise 的出现使得异步代码更易于理解、组合和管理，避免了回调地狱的问题，提高了代码的可读性和可维护性。

### 链式调用

```js
function task1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Task 1 completed')
      resolve('Result from Task 1')
    }, 1000)
  })
}

function task2(resultFromTask1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Task 2 received: ${resultFromTask1}`)
      resolve('Result from Task 2')
    }, 1500)
  })
}

function task3(resultFromTask2) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Task 3 received: ${resultFromTask2}`)
      resolve('Final result')
    }, 2000)
  })
}

task1()
  .then(result => task2(result))
  .then(result => task3(result))
  .then(result => console.log(result))
  .catch(error => console.error(error))
```

在面的代码中，每个任务都返回一个 Promise ，然后通过 then 方法依次串联起来，形成一个异步操作的链条。如果其中某个环节出现错误，可以通过 catch 方法进行统一的错误处理。

`.then()` 方法最多接受两个参数；第一个参数是 Promise 兑现时的回调函数，第二个参数是 Promise 拒绝时的回调函数。
每个 `.then()` 返回一个新生成的 Promise 对象，这个对象可被用于链式调用，例如：

```js
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('omom')
  }, 300)
})

myPromise
  .then(handleFulfilledA, handleRejectedA)
  .then(handleFulfilledB, handleRejectedB)
  .then(handleFulfilledC, handleRejectedC)
```

**链式调用怎么实现的？**

Promise 的链式调用是通过 then 方法返回新的 Promise 对象来实现的。

当一个 Promise 通过 then 方法注册成功回调或失败回调时，then 方法会返回一个新的 Promise 对象。

如果 then 方法中的回调函数返回一个值（不是 Promise 对象），那么新返回的 Promise 就会以这个值为成功的结果进入 Fulfilled 状态。

如果回调函数抛出一个错误，或者返回一个被拒绝的 Promise 对象，那么新返回的 Promise 就会以这个错误或拒绝的状态进入 Rejected 状态。

```js
const promise1 = new Promise((resolve, reject) => {
  resolve('First promise resolved')
})

const promise2 = promise1.then((result) => {
  // 这里返回一个值，新的 promise2 以这个值进入成功状态
  return 'Second result'
})

const promise3 = promise2.then((result) => {
  // 这里可以继续基于上一个 promise 的结果进行处理和返回新的值
  if (result === 'Second result') {
    return 'Third result'
  }
  else {
    throw new Error('Wrong result')
  }
})
```

通过这种方式，一个 Promise 的结果可以作为下一个 Promise 的输入，从而实现了链式调用，使得异步操作可以以一种更清晰、更可维护的方式串联起来。

### Async / Await

async/await 是 JavaScript 中用于处理异步操作的一种更简洁和直观的语法。

async 关键字用于定义一个异步函数。异步函数总是返回一个 Promise 对象。
如果函数内部返回一个值，async 函数会自动将这个值包装成一个已解决（fulfilled）的 Promise。
如果函数内部抛出一个错误，async 函数会自动将这个错误包装成一个被拒绝（rejected）的 Promise。

await 关键字只能在 async 函数内部使用。它用于暂停异步函数的执行，等待一个 Promise 对象的解决，并返回解决的值。如果等待的 Promise 被拒绝，await 会抛出这个错误。

```js
async function getData() {
  try {
    const response = await fetch('https://example.com/data')
    const data = await response.json()
    return data
  }
  catch (error) {
    console.error('Error fetching data:', error)
  }
}

getData().then(result => console.log(result))
```

async/await 语法使得异步代码看起来更像同步代码，提高了代码的可读性和可理解性，同时也避免了回调地狱和复杂的 Promise 链。

## 参考资料

[并发模型与事件循环 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Event_loop)

[Node.js - The Node.js Event Loop](https://nodejs.org/zh-cn/learn/asynchronous-work/event-loop-timers-and-nexttick)

[这么通俗易懂的Node事件循环，背就完了](https://juejin.cn/post/7209698674905382973)

[Promise - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
