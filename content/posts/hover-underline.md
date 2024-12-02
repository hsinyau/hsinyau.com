---
title: 从左向右的神奇下划线 hover 效果
created: 2023-05-16
tag: 分享境
summary: 作者一直认为自己 CSS 学得不好，很多炫酷效果无法实现，尤其是 after 、 before 用得少。为提升技能，作者决定写小 demo 练习，文中展示了从左出现从右消失的下划线效果的 HTML 和 CSS 代码实现，包括原始效果和扩展为从左出现从右消失的效果，还提到在基础上继续扩展可实现更多效果。
cover: https://bu.dusays.com/2024/08/15/66be11c702a2c.webp
---

## 碎碎念

哎呀，一直以来我都觉得自己 CSS 学得太菜啦！

好多超酷的效果我都搞不定，真心郁闷。像 after 、before 这些厉害的玩意儿，我平时基本都不怎么用。每次看到别人用得那么溜，做出各种惊艳的效果，我就只能干瞪眼。
这倒也不是因为我不了解它们的作用和原理，而是在真正实践时，总是会遇到各种各样的问题，导致无法将它们巧妙地运用到项目中。

为了弥补这一不足，提升自己的 CSS 技能，我决定现在动手写一个小 demo 来进行练习。

## 代码实现

**HTML 部分:** HTML部分我们以一个平时使用下划线最频繁的场景 a 标签为例

```html
  <a href="#" class="hover-underline">Hover over me</a>
```

**CSS 部分**

```css
.hover-underline {
  display: inline-block;
  position: relative;
  color: #333;
  text-decoration: none;
  padding-bottom: 2px;
  transition: color 0.3s ease;
}

.hover-underline::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  background-color: #333;
  bottom: 0;
  left: 0;
  transition: width 0.3s ease, right 0.3s ease;
}

.hover-underline:hover {
  color: #000;
}

.hover-underline:hover::after {
  width: 100%;
  right: 0;
}
```

效果如下

![演示](https://bu.dusays.com/2024/08/15/66be0df81712b.gif)

在这个示例中,我们使用 CSS 的 `::after` 伪元素来创建一个下划线效果。当鼠标悬停在元素上时,下划线的 width 属性从 0 过渡到 100%,同时 right 属性也从 0 过渡到 100%,从而实现了从左到右出现、再从右到左消失的效果。

这种效果通常用于导航链接或者一些强调性文本上。

## 扩展一下

假如要实现从左出现然后从右消失的效果呢？只需要在上面的代码基础上修改两个地方即可实现。

修改如下，其他均不变。

```css
.hover-underline::after {
  transition: width 0.3s ease, left 0.3s ease;
}

.hover-underline:hover::after {
  left: 0;
}
```

效果如下

![扩展](https://bu.dusays.com/2024/08/15/66be0c8a82eed.gif)

在这段代码的基础上继续扩展，加上一点过渡动画，加上一点渐变色，然后就会有下面的效果。也就是本站 posts 页面的效果。

![加上过渡动画的效果](https://bu.dusays.com/2024/08/15/66be0f592b832.gif)

## 后记

还是不太习惯使用 `::after` 和 `::before`, 其实上面实现的效果貌似也用不到这么复杂的东西。直接写就完了。

附上一个 UnoCSS 实现的效果：[UnoCSS演示](https://unocss.dev/play/?html=DwEwlgbgBAxgNgQwM5ILwCIAWBaAZgVzjilzgFMAPKAK3yQBcxcBPbGMgO3rICcoxuAWyRtO3Ptwr1sAZgpx0APgBQUKMASq1UTDzK4MmevQAOSAFwB6S5iRgOzBPgB0MGOi1r4yNOgBGAObYATwI4GLY9AD22Hy4PFGC2ADaAMS4IAgALAi4ALpQ0SmpZCAgAIwgABwFgSnkHAH0mOYADCYUAPrl7RS1QeS40n5RxolQdRwxeiZkCPRQIPihjFEc2ACsra06URC85nXJDU0tPa0ApN29eR5qKtpQABJ7vFCvfIJkWsCWCCq-cAQFRAA&config=PTAEFMGcBsEsDsAuBaAJrSBDARtcz5wAPFOQ0eAe2QCcpEbYBjRcVZWAWwAdKbFIAKC69%2BoAN6hU4AGYJwAYUrw5AcwA0obnUjhEAQUQNY2AK6JYMgJ6btUPQEkmyyLZ16AqlVABfUDJpKTlAAclMqJkhIEMFBYlFEKVlMU2hE6TlCJRVYVQAKcUFQUBpUqAAuUABtKpCmU0hEINoykM1JZ2g%2BSpC6VBDfAF1B9SLQSAALPkR6gUrC4uK6hqbOZEnp2ZCe1hJkaFVQXZQ%2BTHhVcFApgDdwGnLj5FZMaDaxn1Hiu1056rGv9yILyUPIASk%2Bi2%2BekMxjMFmsYIhAPsiCcLgK-0WkCYL3AlQAjAA6ABMSMWTFQ8B6EyM3Eg5RAUE4hMmwDei184LGI0EPlBgiAA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4IgLgTghgdgzgMwPYQLYAkyoDYgFwJTZwCmAvkA)
