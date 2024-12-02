---
title: URI、URL傻傻分不清楚
tag: 分享境
summary: 这篇文章讲解了URI（统一资源标识符）的概念，以及它的三大类别：URL（统一资源定位器）、URN（统一资源名称）、和IRI（国际化资源标识符）。它详细说明了每种URI的特点和用途，以及它们之间的关系。URI是一个通用术语，URL是其中的一种，用于定位和访问网络资源，而URN主要用于命名网络资源而不涉及定位。文章还提供了各种示例来帮助读者更好地理解这些概念。
created: 2023-10-11 18:22:14
cover: https://bu.dusays.com/2024/08/16/66be49014634b.webp
---

## 什么是URI?

URI(Uniform Resource Identifier)的意思是统一资源标识符,它是一个字符串,用来标识网络上的某个资源。

URI有三大类:

1. URL(Uniform Resource Locator) 统一资源定位器

2. URN(Uniform Resource Name) 统一资源名称

3. IRI(Internationalized Resource Identifiers)国际化资源标识符

## URL是什么?

URL表示互联网上某一资源的地址,它包含了定位这个资源所需的所有信息,可以唯一标识并定位一个资源。

一个标准的URL格式如下:

协议://主机名:端口/路径?查询

例如: https://hsinyau.com/search?keyword=查询

## URN是什么?

URN主要用于通过名称标识网络资源,它不包含定位信息,不保证可以直接访问该资源。URN常用于永久标识,如书籍的ISBN号码或科学文章的DOI（Digital Object Identifier）。

URI、URL和URN的关系:

- URI是一个统称,它包括URL和URN。

- URL是资源定位的URI,它包含定位资源的所有必需信息。

- URN则是资源名称标识的URI,它只包含资源的名称而不涉及定位问题。

所以,URL属于URI的一种,它指定了如何访问网络资源;而URN同样属于URI,但它只给资源进行命名而非定位。

我用常见的例子来解释它们的区别:

- URL例子: https://hsinyau.com/search?keyword=查询、ftp://ftp.hsinyau.com/pub
- URI例子: mailto:lihua@example.com、file:///etc/passwd
- URN例子: urn:isbn:9787200069716、urn:doi:10.1109/ICCV.2017.322
