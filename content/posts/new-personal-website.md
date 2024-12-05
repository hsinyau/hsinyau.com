---
title: 新的开始！基于 Next.js + WindiCSS 搭建的全新 BLOG
tag: 事件簿
created: 2022-12-12 13:24:27
summary: 作者因原博客难维护，决定用 Next.js 和 WindiCSS 搭建新博客，对比之前用的 Hexo+Butterfly 组合，阐述选择框架的考量因素，还列出待办事项，回顾搭建经历感慨颇多，强调博客搭建只是开始，记录分享才是初心。
---

好久以前，我就有重写博客的想法，因为最初的博客缺乏灵活性，而且某些功能的实现只能以一种粗糙的方式完成，这使得它难以维护。
因此，我决定使用 React 框架 [Next.js](https://nextjs.org){target="_blank"} 和原子化(Atomic CSS) CSS 框架 [WindiCSS](https://windicss.org){target="_blank"} 来构建一个全新的博客。Next.js 提供了强大的服务器端渲染功能来加速页面加载速度。
同时，WindiCSS以其简单易用的风格库而闻名，使我能够轻松地创建美观且用户友好的设计。

在此之前的两年里，我一直在使用 Hexo 社区中流行的 [Hexo](https://hexo.io){target="_blank"} + [Butterfly](https://butterfly.js.org){target="_blank"} 组合。在此期间，我还编写了两个自定义主题供个人使用，但最终都不满意。

在选择框架时，我希望找到一个可以实现以下目标的框架:

- 静态站点生成(SSG): 在构建时预呈现静态页面，以便无需后端即可轻松部署。

- 路由切换无刷新：路由切换而不会导致整个页面的刷新，不需要重新加载整个页面。

- 资源重用: 切换页面时只加载新需要的资源。

- 预渲染(Pre-rendering): 与路由切换无刷新相结合，使路由转换难以察觉。

我最终选择了 Next.js，因为我有一段时间没有使用 Vue 了，已经生疏了，而我最近一直在学习 React。

至于 WindiCSS，它在开发过程中提供了更快的加载时间和快速的 HMR(热模块替换)，而不需要在生产中进行清除。相比之下 Tailwindcss 拥有我们平时用不到的产物，而我们有时候真正需要的却要去配置，多多少少有点矛盾。

## 参考

本站灵感与部分代码参考或直接来自以下网站

- [Diu - Diu (ddiu8081), Developer.](https://ddiu.io/)
- [异次元の机智君 - 💻 🎨 🎮 ⚡️](https://www.anzifan.com/)
- [张洪Heo - 分享设计与科技生活](https://blog.zhheo.com/)
- [静かな森 - 致虚极，守静笃。](https://innei.in/)

## TODO

- 添加文章搜索功能
- 主题系统(多主题/随机主题)
- 站点地图(sitemap)
- 添加文章标签页
- 添加文章阅读时长
- 添加文章点赞
- 添加文章评论
- 添加文章分享

## 最后

从之前使用过的 [Hexo](https://hexo.io){target="_blank"}，[Halo](https://halo.run){target="_blank"}，[Typecho](https://typecho.org){target="_blank"}，[Wordpress](https://cn.wordpress.org/){target="_blank"}，到现在自己亲手从头搭建起来的，期间遇到了许多问题，但总归解决了，在整个过程中我学到了很多，还是挺开心的。

虽然这个网站还是存在许多问题，但总归能看了○( ＾皿＾)っHiahiahia…。还有许多BUG，慢慢修吧。

博客搭建好只是一个开始，记录和分享才是初心，好了以后终于有理由好好学习了
