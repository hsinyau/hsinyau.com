---
title: JavaScript 时间处理（Timestamp ⇄ Date 对象）
created: 2022-07-07 14:12:21
tag: 分享境
summary: 介绍创建 Date 对象的多种方式，包括用当前时间、传年等参数、传字符串创建，还阐述时间戳概念及 UTC 含义，演示了时间戳与日期对象相互转换的方法，并给出相关参考资料助力深入了解 JavaScript 日期处理知识。
---

## 创建日期对象

首先，创建一个 Date 对象。

### 使用当前时间创建

```js title="使用当前时间创建"
new Date()
```

### 通过传递年、月、日、小时、分钟和秒值创建

```js title="通过传递年、月、日、小时、分钟和秒值创建"
console.log(new Date(2022))
// 只传入一个参数: （秒)
// Thu Jan 01 1970 08:00:02 GMT+0800 (中国标准时间)

console.log(new Date(2022, 0))
// 传入两个参数: (年, 月)
// Sat Jan 01 2022 00:00:00 GMT+0800 (中国标准时间)

console.log(new Date(2022, 20))
// 传入两个参数: (年, 月)
// Fri Sep 01 2023 00:00:00 GMT+0800 (中国标准时间)

console.log(new Date(2022, 0, 40))
// 传入三个参数: (年, 月, 日)
// Wed Feb 09 2022 00:00:00 GMT+0800 (中国标准时间)

console.log(new Date(2022, 0, 60))
// 传入三个参数: (年, 月, 日)
// Tue Mar 01 2022 00:00:00 GMT+0800 (中国标准时间)

console.log(new Date(2022, 0, 20, 12))
// 传入四个参数: (年, 月, 日, 时)
// Thu Jan 20 2022 12:00:00 GMT+0800 (中国标准时间)

console.log(new Date(2022, 0, 20, 25))
// 传入四个参数: (年, 月, 日, 时)
// Fri Jan 21 2022 01:00:00 GMT+0800 (中国标准时间)

console.log(new Date(2022, 0, 20, 9, 30))
// 传入四个参数: (年, 月, 日, 时, 分)
// Thu Jan 20 2022 09:30:00 GMT+0800 (中国标准时间)

console.log(new Date(2022, 0, 20, 9, 75))
// 传入四个参数: (年, 月, 日, 时, 分)
// Thu Jan 20 2022 10:15:00 GMT+0800 (中国标准时间)

console.log(new Date(2022, 0, 20, 9, 30, 45))
// 传入五个参数: (年, 月, 日, 时, 分, 秒)
// Thu Jan 20 2022 09:30:45 GMT+0800 (中国标准时间)

console.log(new Date(2022, 0, 20, 9, 30, 85))
// 传入五个参数: (年, 月, 日, 时, 分, 秒)
// Thu Jan 20 2022 09:31:25 GMT+0800 (中国标准时间)

console.log(new Date(2022, 0, 20, 9, 30, -30))
// 传入五个参数: (年, 月, 日, 时, 分, 秒)
// Thu Jan 20 2022 09:29:30 GMT+0800 (中国标准时间)
```

### 通过传递字符串创建

```js title="通过传递字符串创建"
console.log(new Date('2022-07-07T11:58:38.873Z'))
// Thu Jul 07 2022 19:58:38 GMT+0800 (中国标准时间)

console.log(new Date('2022-07-07'))
// Thu Jul 07 2022 08:00:00 GMT+0800 (中国标准时间)

console.log(new Date('2022-07-07 12:00'))
// Thu Jul 07 2022 12:00:00 GMT+0800 (中国标准时间)

console.log(new Date('2022-07-07 19:58:38'))
// Thu Jul 07 2022 19:58:38 GMT+0800 (中国标准时间)

console.log(new Date('2022/07/07 19:58:00'))
// Thu Jul 07 2022 19:58:00 GMT+0800 (中国标准时间)

console.log(new Date('July 1, 2022 12:15:30'))
// Fri Jul 01 2022 12:15:30 GMT+0800 (中国标准时间)

console.log(new Date('3 16, 2000 12:05:20'))
// Thu Mar 16 2000 12:05:20 GMT+0800 (中国标准时间)

console.log(new Date('03 06, 2000 12:00:00'))
// Mon Mar 06 2000 12:00:00 GMT+0800 (中国标准时间)
```

## 转换（时间戳⇄日期对象）

### 什么是时间戳？

- 从 ”1970 年 1 月 1 日 0:00:00 (UTC)“ 开始的秒数表示
- 例如“1970 年 1 月 1 日 0:00:01”，它将类似于 “1”，基于 UTC 的“1970 年 1 月 1 日 0:00:00”，以及从那里的进度。

### 什么是UTC

- **UTC**: 协调世界时，又称世界统一时间、世界标准时间、国际协调时间。由于英文（CUT）和法文（TUC）的缩写不同，作为妥协，简称UTC。
- 协调世界时是以原子时秒长为基础，在时刻上尽量接近于世界时的一种时间计量系统。中国大陆采用ISO 8601-1988的《数据元和交换格式信息交换日期和时间表示法》（GB/T 7408-1994）称之为国际协调时间，代替原来的GB/T 7408-1994；中国台湾采用CNS 7648的《资料元及交换格式–资讯交换–日期及时间的表示法》，称之为世界统一时间。

### UnixTime → 日期对象

从像“`1657201700334`”这样的数字转换为“`2022-07-07`”的形式。
UnixTime 以秒为单位，需要转换为毫秒才能转换为 Date 对象timestamp * 1000。

```js title="UnixTime → 日期对象"
const UnixTimestamp = 1657202104
const date = new Date(UnixTimestamp * 1000)

console.log(date.getFullYear()) // 2022
console.log(date.toLocaleDateString().slice(5)) // 7/7
console.log(date.toLocaleTimeString().slice(0, -3)) // 21:55
```

### 日期对象 → UnixTime

从像 2022/07/07 这样的形状转换为像“1657202104”这样的形状。
因为 Date 对象以毫秒为单位，需要转换为秒才能转换为 UnixTime timestamp / 1000。

```js title="日期对象 → UnixTime"
const date = new Date()
const timestamp = Math.floor(date.getTime() / 1000)

console.log(timestamp) // 1657202377
```

## 参考

[UTC - 协调世界时](https://baike.baidu.com/item/%E5%8D%8F%E8%B0%83%E4%B8%96%E7%95%8C%E6%97%B6/787659){target="_blank"}

[What is the unix Timestamp?](https://unixtime.org/){target="_blank"}

[Date - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date){target="_blank"}
