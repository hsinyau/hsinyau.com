---
title: JavaWeb 重定向与请求转发
tag: 分享境
summary: 文章对比重定向与请求转发，从多方面列举二者区别，通过拿快递的例子辅助理解，还分别给出重定向和请求转发的流程图、代码示例（含 servlet 及 web.xml 文件内容），最后总结其特点及路径相关问题。
created: 2020-12-07 17:38:24
---

## 区别

| 序号   | 问题                 | 重定向 | 请求转发 |
| :-----|----------------------|--------|---------|
| 1     |  第二次请求谁请求的？  | 浏览器 | 服务器|
| 2     |  浏览器发送了几次请求？ |2次以上 |1次 |
| 3     |  servlet可以共享request吗？ |不可以 | 可以 |
| 4     |  地址栏是否发生改变？ | 是 | 不是 |
| 5     |  浏览器地址栏显示的哪一次访问地址？ | 最后一次 | 第一次 |
| 6     |  可以跳转到什么资源？ | 任意资源  | 项目内部 |
| 7     |  第二次的请求路径是？ | 绝对路径 |内部路径 |

## 举个栗子

#### 重定向

![redirection](https://file.hsinyau.com/image/27b4be0a010d6eb71d76622ad9c4deed.webp)

①：A对B说，帮忙拿下快递

②：B对A说，没有空，你找下C吧

③：A对C说，帮忙拿下快递

④：C然后拿了快递给A

#### 请求转发

![request-forwarding](https://file.hsinyau.com/image/a1844fef003254958b1a07b8b892a312.webp)

①：A对B说，帮忙拿下快递

②：第二步，B没有空，直接找让C帮A拿下快递

③：C拿到了快递并返回给A

## 重定向-流程图、代码

### 流程图

![redirection](https://file.hsinyau.com/image/6a67d4edcf617f42e0536ac42e9426e6.webp)

### 代码BoyServlet

```java title="BoyServlet.java"
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
public class BoyServlet extends HttpServlet {
  protected void doGet(HttpServletRequest request, HttpServletResponse
  response)
  throws ServletException, IOException {
    // 获取请求携带的id
    String id = request.getParameter("id");
    System.out.println("A对B说：帮我拿下快递,id号是:" + id);
    System.out.println("B对A说：我没有空，你找下C");
    System.out.println("----分割线----");
    // 重定向方式1：
    response.setStatus(302);
    response.setHeader("location", "/redirect/girl");
    // 重定向方式2：(正常用此方法)
    // response.sendRedirect("/redirect/girl");
  }
  protected void doPost(HttpServletRequest request, HttpServletResponse
  response)
  throws ServletException, IOException {
    doGet(request, response);
  }
}
```

### 代码GirlServlet

```java title="GirlServlet.java"
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
public class GirlServlet extends HttpServlet {
  protected void doGet(HttpServletRequest request, HttpServletResponse
  response)
  throws ServletException, IOException {
    //设置浏览器解析的格式，否则浏览器会出现乱码
    response.setContentType("text/html;charset=utf-8");
    //获取请求携带的id
    String id = request.getParameter("id");
    System.out.println("A对C说，帮我拿下快递，id号是："+id);
    System.out.println("拿到快递了");
    //获取输出流
    PrintWriter writer = response.getWriter();
    //将信息返回给浏览器
    writer.println("拿到快递了");
  }
  protected void doPost(HttpServletRequest request, HttpServletResponse
  response)
  throws ServletException, IOException {
    doGet(request, response);
  }
}
```

### web.xml文件

```xml title="web.xml"
<?xml version="1.0" encoding="UTF-8"?>
<web-app
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns="http://java.sun.com/xml/ns/javaee"
xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd" id="WebApp_ID" version="2.5">
  <display-name>redirect</display-name>
  <welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.htm</welcome-file>
    <welcome-file>index.jsp</welcome-file>
    <welcome-file>default.html</welcome-file>
    <welcome-file>default.htm</welcome-file>
    <welcome-file>default.jsp</welcome-file>
  </welcome-file-list>
  <servlet>
    <description></description>
    <display-name>BoyServlet</display-name>
    <servlet-name>BoyServlet</servlet-name>
    <servlet-class>com.redirect.BoyServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>BoyServlet</servlet-name>
    <url-pattern>/boy</url-pattern>
  </servlet-mapping>
  <servlet>
    <description></description>
    <display-name>GirlServlet</display-name>
    <servlet-name>GirlServlet</servlet-name>
    <servlet-class>com.redirect.GirlServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>GirlServlet</servlet-name>
    <url-pattern>/girl</url-pattern>
  </servlet-mapping>
</web-app>
```

## 请求转发-流程图、代码

### 流程图

![request-forwarding](https://file.hsinyau.com/image/d177326e254e182e3a8fbda4914c6a0b.webp)

### 代码BoyServlet

```java title="BoyServlet.java"
import java.io.IOException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
public class BoyServlet extends HttpServlet
{
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
  throws ServletException, IOException
  {
    // 获取请求携带的id
    String id = request.getParameter("id");
    System.out.println("A对B说：帮我拿下快递,id号是:" + id);
    System.out.println("B对A说：好的");
    System.out.println("----分割线----");
    //---后面B直接在服务器将请求转发给C---
    //获取转发对象，后面括号指定了转发的路径
    RequestDispatcher dispatcher = request.getRequestDispatcher("/girl");
    //执行转发功能，并将请求和响应一并转发过去
    dispatcher.forward(request, response);
  }
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
  throws ServletException, IOException
  {
    doGet(request, response);
  }
}
```

### 代码GirlServlet

```java title="GirlServlet.java"
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
public class GirlServlet extends HttpServlet
{
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
  throws ServletException, IOException
  {
    // 设置浏览器解析的格式，否则浏览器会出现乱码
    response.setContentType("text/html;charset=utf-8");
    // 获取请求携带的id
    String id = request.getParameter("id");
    System.out.println("B对C说：帮A拿下快递，id号是：" + id);
    System.out.println("拿到快递了");
    // 获取输出流
    PrintWriter writer = response.getWriter();
    // 将信息返回给浏览器
    writer.println("拿到快递了");
  }
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
  throws ServletException, IOException
  {
    doGet(request, response);
  }
}
```

### web.xml文件

```xml title="web.xml"
<?xml version="1.0" encoding="UTF-8"?>
<web-app
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns="http://java.sun.com/xml/ns/javaee"
xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd" id="WebApp_ID" version="2.5">
  <display-name>dispatcher</display-name>
  <welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.htm</welcome-file>
    <welcome-file>index.jsp</welcome-file>
    <welcome-file>default.html</welcome-file>
    <welcome-file>default.htm</welcome-file>
    <welcome-file>default.jsp</welcome-file>
  </welcome-file-list>
  <servlet>
    <description></description>
    <display-name>BoyServlet</display-name>
    <servlet-name>BoyServlet</servlet-name>
    <servlet-class>com.dispatcher.BoyServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>BoyServlet</servlet-name>
    <url-pattern>/boy</url-pattern>
  </servlet-mapping>
  <servlet>
    <description></description>
    <display-name>GirlServlet</display-name>
    <servlet-name>GirlServlet</servlet-name>
    <servlet-class>com.dispatcher.GirlServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>GirlServlet</servlet-name>
    <url-pattern>/girl</url-pattern>
  </servlet-mapping>
</web-app>
```

## 请求转发和重定向时的路径问题

**转发或重定向时路径上带"/"和不带"/"的区别**

#### 对于重定向

如果资源的路径前面有"/"，此时"/"参照 web 服务器的根路径，会丢失 web 应用的根路径，解决方案： 在"/"前面加上

```java title="重定向"
request.getContextPath()
response.sendRedirect(request.getContextPath()+"/show.jsp")
```

如果路径前没有"/"，那么路径相对于当前的 servlet 或 jsp 的路径的，是一个相对路径。

#### 对于请求转发

如果资源的路径前没有"/"，那么路径相对于当前的 servlet 或 jsp 的路径;如果路径前带了"/"，此时"/"参照 web 应用的根路径。

#### 路径问题总结

如果请求是客户端的请求(发生在客户端的跳转)，那么路径前不要带"/", 因为带了"/"会丢失 web 应用的根路径。

## 总结

1. 转发是在服务器端完成的，重定向是在客户端发生的；

2. 转发的速度快，重定向速度慢；

3. 转发是同一次请求，重定向是两次请求；

4. 转发地址栏没有变化，重定向地址栏有变化；

5. 转发必须是在同一台服务器下完成，重定向可以在不同的服务器下完成。
