---
title: View Transitions API 初体验
tag: 笔记本
summary: 作者 2023 年在直播中听闻 View Transitions API ，近期因项目需求深入了解并应用。介绍其用于 SPA 过渡切换动画，是实验性功能，部分浏览器可用。工作原理是浏览器管理和处理页面视图变化，包括创建快照、分析差异和计算动画路径等。可通过修改伪元素树和覆盖 CSS 自定义动画，动画执行前后有相应的 Promise 实现。
created: 2024-04-6 07:59:45
cover: https://bu.dusays.com/2024/08/16/66be42c38d31c.jpg
---

还记得在 2023 年的时候，偶然在 [antfu](https://antfu.me){target="_blank"} 大佬的一次直播里听闻了 View Transitions API 这个新鲜名词。

当时只是在脑海中浅浅留下了个印象，并未深入探究。然而时光流转，直到最近，由于项目中的特定需求，我才真正静下心来，对 view-transitions-api 进行了全面的了解，并将其应用到实际开发当中。

## 什么是 View Transitions API

View Transitions API 是一种用于创建动画的浏览器 API，常用于 SPA（单页面应用）中的过渡切换动画。
使用 View Transitions API 可以轻松创建不同 DOM 状态之间的转换动画，避免了编写大量的 CSS 和 JavaScript 来处理新旧内容的共存逻辑。

<Alert
  content="View Transitions API 目前仍然是一个实验性功能，仅在 Chrome 和 Edge 的 111 及以上版本、Opera 的 75 及以上版本可用，Firefox 和 Safari 暂时不可用。"
  type="danger"
/>

## 工作原理

View Transitions API 的工作原理主要基于浏览器对页面视图变化的智能管理和动画处理。

当页面内容需要更新时，开发者通过调用特定的方法，如 document.startViewTransition(callback) 来启动视图过渡。浏览器会在后台自动创建两个页面的快照，一个是更新前的页面，另一个是更新后的页面。

```js
::view-transition
└─ ::view-transition-group(root)
   └─ ::view-transition-image-pair(root)
      ├─ ::view-transition-old(root)
      └─ ::view-transition-new(root)
```

- ::view-transition 是视图过渡叠加层的根元素，它包含所有视图过渡且位于所有其他页面内容的顶部。

- ::view-transition-old 是旧页面视图的屏幕截图，且 ::view-transition-new 是新页面视图的实时展示。

然后，浏览器会分析这两个页面的差异，确定哪些元素需要进行过渡动画。它会根据开发者设置的过渡属性，如持续时间、缓动效果等，来计算每个元素的动画路径和变化过程。

在过渡过程中，浏览器会同时显示旧页面和新页面的元素，并根据计算好的动画路径对元素进行平滑的变换。例如，如果一个元素的位置、大小或颜色发生了变化，浏览器会以流畅的动画方式来展示这种变化，而不是突然的切换。

整个过程中，浏览器会智能地处理元素的层级关系和布局，确保过渡效果自然且符合预期。同时，它还会优化性能，避免不必要的重绘和回流，以提供高效的用户体验。

比如说，当您更新一个列表中的某一项时，浏览器会识别出该项的变化，并将其从旧状态逐渐过渡到新状态，而不是生硬地直接显示新的内容。

**通过修改伪元素树实现自定义动画效果**

在动画开始执行之前，会实现 Promise `ViewTransition.ready`。在这个阶段，能够借助 JavaScript 来创建自定义动画。

此外，还能够通过覆盖原本的 CSS 来实现自定义动画。默认的 CSS 动画是：旧页面视图的不透明度由 1 变为 0 ，新页面视图的不透明度由 0 变为 1 ，持续时长为 0.25 秒。

在动画执行完毕之后，会实现 Promise `ViewTransition.finished`。

## View Transitions API 的用法

通过上面的工作原理介绍，我们现在正式开始探索它的用法

**Document：startViewTransition() 方法**

View Transitions API 的 startViewTransition() 方法开始一个新的视图过渡，并返回一个 ViewTransition 对象来表示它。

```js
const transition = document.startViewTransition(callback)
```

callback: 一个在视图过渡过程中通常用于更新 DOM 的回调函数，它返回一个 Promise。
这个回调函数在 API 截取了当前页面的屏幕截图后被调用。当回调函数返回的 Promise 兑现时，视图过渡将在下一帧开始。如果回调函数返回的 Promise 拒绝，过渡将被放弃。

- ready: 在伪元素树创建并且动画即将开始时兑现

```js
transition.ready.then(() => {
  // ......
})
```

- finished: 在动画结束后兑现，此时新页面视图对用户可见且可交互

```js
transition.finished.then(() => {
  // ......
})
```

## 自定义过渡动画

除了默认设置的动画之外，还能够借助 CSS ，通过对伪元素的修改来自主定义过渡动画。比如，可以对动画的时间、延迟以及动画的名称等方面进行修改。

这里以本站浅色 / 暗色模式切换功能代码为例

```js
::view-transition-new(root) {
  animation: turnOff 800ms ease-in-out;
}

::view-transition-old(root) {
  animation: none;
}

/* 新视图过渡 */
@keyframes turnOn {
  0% {
    clip-path: circle(0% at var(--click-x) var(--click-y));
  }
  100% {
    clip-path: circle(var(--end-radius) at var(--click-x) var(--click-y));
  }
}

.dark::view-transition-new(root) {
  animation: turnOn 800ms ease-in-out;
}

::view-transition-old(root) {
  animation: none;
}

/* 旧视图过渡 */
@keyframes turnOff {
  0% {
    clip-path: circle(0% at var(--click-x) var(--click-y));
  }
  100% {
    clip-path: circle(var(--end-radius) at var(--click-x) var(--click-y));
  }
}
```

上面这段代码中的 `--click-x`、`--click-y`、`--end-radius` 值会在点击主题切换时触发并计算，在开始时（0%），clip-path （裁剪路径）的值为一个半径为 0% 的圆形，位置由变量 --click-x 和 --click-y 决定；
在结束时（100%），clip-path 变为一个半径由变量 --end-radius 决定的圆形，位置同样由 --click-x 和 --click-y 决定。

动画效果为从点击位置扩散开的一个圆形遮罩，具体效果查看下图或点击页面右上角主题切换按钮尝试。

![浅色 / 暗色模式切换](https://bu.dusays.com/2024/08/16/66be35335656d.gif)

除了使用 CSS 来自定义动画，我们还可以使用 JS 来实现更加复杂的过渡动画。当 ViewTransition.ready 完成时，运用 document.documentElement.animate 来实现动画。

这里以 [antfu](https://antfu.me){target="_blank"} 大佬的的 Blog 主题切换代码为例

```ts
export function toggleDark(event: MouseEvent) {
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    isDark.value = !isDark.value
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })
  transition.ready
    .then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: isDark.value
            ? [...clipPath].reverse()
            : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement: isDark.value
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
}
```

使用 JS 自定义过渡动画需要覆盖默认的 CSS 动画

```js
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
}
```

具体效果查看下图或前往 [antfu](https://antfu.me){target="_blank"} 尝试

![Antfu 浅色 / 暗色模式切换](https://bu.dusays.com/2024/08/16/66be3ff04a2ba.gif)

这样就实现了完美的使用 View Transitions API 实现了一个主题切换的功能。

## 总结

调用 document.startViewTransition 后，浏览器会获取当前页面状态（类似截图），进行 DOM 变化后再记录变化后的状态，然后触发过渡动画，
像透明度、位移变化等，能自定义 CSS 动画，默认是整个页面淡入淡出。

::view-transition-old 代表旧视图，::view-transition-new 代表新视图。

可给元素指定 view-transition-name 来明确具体元素变化，但同一时间页面不能有两个相同 view-transition-name 的元素，否则视图变化失效。

视图转换动画是体验增强功能，不是必要的，使用动画会拖慢页面打开或更新速度，动画时页面完全“冻结”，所以要衡量好动画时间，页面本身慢就别用。

## 参考

[View Transitions API - Web API | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/View_Transitions_API){target="_blank"}

[Document：startViewTransition() 方法 - Web API | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/startViewTransition){target="_blank"}

[太丝滑了！了解一下原生的视图转换动画 View Transitions - 前端侦探 - SegmentFault 思否](https://segmentfault.com/a/1190000044133146){target="_blank"}

[浅学 View Transitions API | 前端学习笔记](https://xiaotianxia.github.io/blog/vuepress/js/view_transitions.html){target="_blank"}
