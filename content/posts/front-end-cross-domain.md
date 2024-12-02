---
title: 前端跨域及解决方案
created: 2021-08-12
tag: 笔记本
summary: 这篇博文介绍了JavaScript语言的主要组成部分、基本语法和数据类型。包括语言核心ECMAScript、文档对象模型DOM和浏览器对象模型BOM。阐述了JavaScript的运算符、条件语句、循环语句的语法结构,并给出了代码示例。
cover: https://bu.dusays.com/2024/08/15/66bdc813229aa.webp
---

## 前言

前端跨域这个问题，一直以来都是我想要避开的“雷区”。
每次在开发过程中碰到它，我都选择直接求助百度，从来没有静下心来思考其背后的深层原因，也没有想过要去真正地解决它或者提前采取措施避免它的出现。
总是依赖临时的搜索结果来应对，而不是从根本上去攻克这个难题。

## 同源策略

在了解跨域问题之前，首先需要了解浏览器的同源策略。

同源策略是浏览器为了保障用户信息安全而设置的一道坚固防线。所谓同源，即指协议、域名和端口三者完全相同。
例如，example.com:8080 和 example.com:80 就不是同源，因为端口不同；example.com 和 sub.example.com 也不是同源，因为域名不同。

同源策略的存在，目的是防止一个网站的恶意脚本获取或修改另一个网站的资源。
如果没有同源策略的限制，恶意网站可能会窃取用户在其他网站上的敏感信息，如登录凭证、个人资料等，从而给用户带来巨大的安全风险。

## 跨域引发的问题

跨域问题想必您也能猜到，其根源在于触发了浏览器同源策略的干涉。当采用前后端分离的方式时，我们通常不会把前后端这两个部分放置在同一服务器上，并且域名以及端口往往也不一致。而所谓同源的定义，恰好就是指相同的域名、相同的端口以及相同的协议。

举个例子，拿本站的源来做对比，不同 URL 的不同结果如下表

| 源 URL | 请求 URL | 是否跨域 | 说明 |
| --- | --- | --- | --- |
| https://hsinyau.com/posts | https://hsinyau.com/guestbook | 否 | 同协议同域名同端口号，不同请求，不算跨域请求 |
| https://hsinyau.com/posts | https://hsinyau.com:2333/guestbook | 是 | 端口不同 |
| https://hsinyau.com/posts | http://hsinyau.com/guestbook | 是 | 协议不同 |
| https://hsinyau.com/posts | https://api.hsinyau.com/api | 是 | 主域名相同，但是子域名不相同 |
| https://hsinyau.com/posts | https://example.cc/posts | 是 | 域名不相同 |

## 解决方案

目前主流的解决办法基本都是基于 CORS（跨源资源共享）来实现的。

在对 CORS 展开讨论之前，得先搞清楚 HTTP 中的简单请求和非简单请求。简单请求包括 GET、HEAD、POST 这几种，同时它们的 HTTP 头信息不能超出以下这些：

- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type（application/x-www-form-urlencoded、multipart/form-data、text/plain）

不符合以上这些条件的就属于复杂请求。

### CORS

CORS（Cross-Origin Resource Sharing，跨源资源共享）则是为了解决跨域资源访问问题而诞生的一种机制。它允许服务器明确声明哪些源（Origin）可以访问其资源，哪些不可以。

当浏览器发起跨域请求时，会先发送一个“预检”请求（OPTIONS 请求）。这个预检请求会携带一些关于即将发送的实际请求的信息，如请求方法（GET、POST 等）、自定义请求头等。
服务器接收到这个预检请求后，会检查这些信息，并通过在响应头中设置相应的字段来告知浏览器是否允许这个跨域请求。

::alert{type="danger"}
而简单请求则不需要进行“预检请求”。
::

常见的 CORS 响应头包括：

- Access-Control-Allow-Origin：指定允许访问该资源的源。可以是具体的域名，如 http://example.com, 也可以是通配符 *，表示允许任何源访问，但这种方式存在一定的安全风险，应谨慎使用。
- Access-Control-Allow-Methods：指定允许的请求方法，如 GET、POST、PUT 等。
- Access-Control-Allow-Headers：指定允许的自定义请求头。

下面是一个服务端和客户端完整的信息交互。首次交互是预检请求 / 响应：

```shell
OPTIONS /doc HTTP/1.1
Host: bar.other
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: https://foo.example
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type

HTTP/1.1 204 No Content
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
Vary: Accept-Encoding, Origin
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
```

从上面的报文中，我们看到，首先使用 OPTIONS 方法发送了预检请求，浏览器根据上面的 JavaScript 代码片断所使用的请求参数来决定是否需要发送，这样服务器就可以回应是否可以接受用实际的请求参数来发送请求。

发送预检请求时一般会带有以下头部信息

```shell
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type
```

标头字段 Access-Control-Request-Method 告知服务器，实际请求将使用 POST 方法。
标头字段 Access-Control-Request-Headers 告知服务器，实际请求将携带两个自定义请求标头字段：X-PINGOTHER 与 Content-Type。服务器据此决定，该实际请求是否被允许。

第二个为预检请求的响应，表明服务器将接受后续的实际请求方法（POST）和请求头（X-PINGOTHER）。

```shell
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
```

服务器的响应携带了 Access-Control-Allow-Origin: https://foo.example, 从而限制请求的源域。同时，携带的 Access-Control-Allow-Methods 表明服务器允许客户端使用 POST 和 GET 方法发起请求（与 Allow 响应标头类似，但该标头具有严格的访问控制）。

标头字段 Access-Control-Allow-Headers 表明服务器允许请求中携带字段 X-PINGOTHER 与 Content-Type。与 Access-Control-Allow-Methods 一样，Access-Control-Allow-Headers 的值为逗号分割的列表。

最后，标头字段 Access-Control-Max-Age 给定了该预检请求可供缓存的时间长短，单位为秒，默认值是 5 秒。在有效时间内，浏览器无须为同一请求再次发起预检请求。以上例子中，该响应的有效时间为 86400 秒，也就是 24 小时。如果该标头字段的值超过了最大有效时间，将不会生效。

了解了背后的原理，问题其实已经解决了一半。

### 前端代理

在开发环境中，我们可以使用 webpack-dev-server 或 vue-cli 提供的代理配置功能，将跨域请求转发到实际的服务器。

```js
module.exports = {
  // ...
  devServer: {
    proxy: {
      '/api': {
        target: 'https://hsinyau.com/api',
        pathRewrite: { '^/api': '' },
      },
    },
  },
}
```

### 服务端配置

这里以 Express 为例

```js
// 允许跨域
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  // res.header("Access-Control-Allow-Origin", '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method === 'OPTIONS')
    res.send(200)/* 让options请求快速返回 */
  else next()
})
```

### 通过服务器配置

以 Nginx 为例

```js
location / {
  add_header Access-Control-Allow-Origin *;
  add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
  add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

  if ($request_method = 'OPTIONS') {
      return 204;
  }
}
```

### 反向代理

以 Nginx 为例

```js
server {
  listen       80;
  server_name  www.hsinyau.com;
  location / {
    proxy_pass   www.hsinyau.com; #反向代理
    proxy_cookie_demo www.hsinyau.com www.hsinyau.com;
    add_header Access-Control-Allow-Origin www.hsinyau.com;
    add_header Access-Control-Allow-Credentials true;
  }
}
```

### WebSocket

WebSocket 是一种全双工通信协议，它不受同源策略的限制。

使用 WebSocket 可以建立一个持久的连接，实现实时的数据通信。但需要注意的是，WebSocket 的使用场景相对较为特定，适用于需要实时双向通信的场景，如在线聊天、实时游戏等。

## 参考资料

[跨源资源共享（CORS） - HTTP | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS){target="_blank"}

[跨域资源共享 CORS 详解 - 阮一峰的网络日志 (ruanyifeng.com)](http://www.ruanyifeng.com/blog/2016/04/cors.html){target="_blank"}

[前端跨域解决方案（11种方案详细笔记）- SegmentFault 思否](https://segmentfault.com/a/1190000020688656){target="_blank"}
