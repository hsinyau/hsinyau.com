---
title: JSP 基础
tag: 笔记本
created: 2020-12-09 18:45:33
cover: https://t.mwm.moe/pc/
summary: 文章围绕 JSP 展开了全面且深入的介绍，涵盖其定义、常用动态网站开发技术对比、页面元素构成、运行原理与生命周期、9 个内置对象、动作标签以及 JavaBeans 相关内容，还细致对比了相似功能元素（如 jsp:include 与 include 指令）的区别等，是对 JSP 技术较为详尽的知识梳理。
---

## JSP简介

JSP(Java Server Pages),其根本是一个简化的 Servlet 设计，它实现了在 Java 中使用 HTML 标签。JSP 是 一种动态网页技术标准，也是 JavaEE 的标准。

JSP 和 Servlet 一样，是在服务器端执行的。JSP 是在 Servlet 技术发展之后为了让开发者写html标签更方便而发展起来的技术，JSP 实际上就是 Servlet。

但是，人们通常把 Servlet 作为 Web 应用中的控制组件来使用，只负责响应请求产生数据，并把数据通 过转发技术带给 JSP，而把 JSP 技术作为数据显示模板来使用。这样使程序结构更清晰，可读性和可维护性更高。

## 常用动态网站开发技术

**JSP**：Java 平台，安全性高，适合开发大型的，企业级的，分布式的 Web 应用程序。如 Hadoop，电子银行，12306等

**ASP.NET**：.Net 平台，简单易学。但是安全性以及跨平台型差。

**PHP**：简单，高效，成本低开发周期端，特别适合中小型企业的 Web 应用开发。（LAMP： Linux+Apache+MySQL+PHP）

##  JSP页面元素构成

### JSP指令

JSP 指令(directive)是为 JSP 引擎二设计的，它们并不直接产生任何可见输出，而只是告诉引擎如何处理 JSP 页面中的其余部分。

在 JSP2.0 规范中共定义了三个指令，基本语法格式为，`<%@ 指令 属性名 ="值" %>`，如果一个指令有多个属性，这多个属性可以写在一个指令中，也可以分开写。

```java title="JSP 常见指令"
<%@ page language="java"
  contentType="text/html,ISO-8859-1"
  import="java.util.*,java.sql.*,java.io.*"
  session="true|flase"
  buffer="none|8kb|sizekb"
  autoFlush="true|false"
  info="一段字符串内容"
  errorPage="relative_url"
  isErrorpage="true|false"
%>
```

#### page指令

page 指令用于定义 JSP 页面的各种属性，无论指令出现在页面中的什么地方，它作用的 都是整个 JSP 页面，为了保持程序的可读性和遵循良好的编程习惯，

page 指令通常放在整个 JSP 页面的起始位置，一个页面可以有多个 page 指令。

- **language** 指定JSP页面使用的脚本语言，默认值为java
- **contentType** 用来指定JSP页面的文件类型和所采用的编码方式， 默认值为“text/html,ISO-8859-1”
- **import** 通过该属性来引用脚本语言中使用到的类文件，导入多个类或包用逗号分隔。JSP引擎自动导入 java.lang.*;java.servlet.*;javax.servlet.jsp.*;javax.servlet.http.*
- **pageEncoding** 指定JSP页面的编码方式， 默认值为“ISO-8859-1”
- **session** 用来说明是否创建session对象，默认为true
- **buffer** 用来指定out对象是否创建buffer缓冲区，并指定缓冲区大小。默认为8kb,none表示不创建缓冲区。
- **autoFlush** 缓冲区是否自动刷新，默认为true，如果为false，缓冲区满后不手动刷新会包异常。
- **info** 定义一个字符串常量，使用getServletInfo方法可以打印。
- **errorPage** 指定异常处理页。也可以在web.xml中使用`<error-page>`元素为整个WEB应用程序设置处理页面，其中的`<exception-type>`子元素指定异常类的完全限定名，`<location>`元素指定以"/"开头的错误处理页面的路径。如果设置了某个JSP页面的errorPage属性，那么在web.xml文件中这是的错误处理将不对该页面起作用。

#### include指令

用于引入其他JSP页面，如果使用include指令引入了其他JSP页面，那么JSP引擎将 把这两个JSP翻译成一个Servlet，所以include指令引入通常也成为静态引入。

```java title="include指令"
<%@ include file=“被包含组件的绝对URL或相对URL"%>
```

被引入的文件必须遵循JSP语法。被引入的文件可以是任意扩展名，即使其扩展名是html，JSP引擎也会按照处理jsp页面的方式处理它里面的内容，为了见名知意，JSP规范建议使用.jspf(JSP fragments) 作为静态引入文件的扩展名。

由于使用include指明将会涉及到2个JSP页面，并会把JSO翻译成一个 Servlet，所以这两个JSP页面的指令不能冲突(pageEncoding和导包除外)。

#### taglib指令

使用标签库定义显得自定义标签，在JSP页面中启用定制行为。

### 表达式

在JSP页面中执行的表达式 `<%=表达式%>`，注意表达式不以分号结束。例如，当前时间: `<%= new java.util.Date() %>`

### 脚本片段

在JSP页面中插入多行java代码 `<% Java代码 %>`，JSP引擎在翻译JSP页面时，会将JSP脚本片段中的Java代码原封不动的放到Servlet的_jspServlet方法中，所以，`<% %>`中的Java代码必须严格遵循java 语法。

### 声明

在JSP页面中定义变量或者方法 `<%! Java代码 %>`，声明中的Java代码被翻译到 jspService 方法的 外面，属于类，所以可以声明成员变量并初始化，也可以声明方法或定义方法，同时还可以声明静态代 码块。 JSP隐式对象的作用范围仅限于Servlet的_jspService方法，所以**在JSP声明中不能使用这些隐式对象**。

```java title="Jsp 声明"
<%!
static {
  System.out.println("loading Servlet!");
}
private int globalVar = 0;
public void jspInit() {
  System.out.println("initializing jsp!");
}
%>
<%!
public void jspDestroy() {
  System.out.println("destroying jsp!");
}
%>
```

### 注释(3种方式)

- **HTML注释**

- **JSP注释**: `<%--JSP注释，客户端不可见--%>`

- **JSP脚本注释**: 即 java 注释 `//单行` ,`/*多行 */`

### 静态内容

```java title="静态内容"
<%@ page language="java" import="java.util.*" contentType="text/html; charset=utf-8"%>
<html>
<head>
  <title>index.jsp page</title>
</head>
<body>
  <h1>大家好</h1><hr>
  <!-- 我是HTML注释，在客户端可见 -->
  <%-- 我是JSP注释，在客户端不可见 --%>
    <%!
  String s = "张三";
//声明了一个字符串变量
int add(int x,int y) {
  //声明了一个返回整型的函数，实现两个整数的求和。
  return x+y;
}
%>
  <%
    //单行注释
/*多行注释*/
out.println("大家好");
%>
  <br>
  你好，<%=s %><br>
  x+y=<%=add(10,5) %><br>
</body>
</html>
```

### JSP运行原理及生命周期

用户第一次请求 Tomcat 会将 JSP 文件编程成一个 Servlet 的 java 文件，并将 java 文件编译成 class 文件，加载到内存，生成文件在 Tomcat 的 work 目录的对应项目文件夹。

如果 JSP 页面发生了修改，JSP 引擎会对其进行重新编译并加载到内存，以方便用户请求。注意，用户第一次请求一个 JSP 页面时，首先被执行的方法是构造方法。

jspService() 方法被调用来处理客户端的请求。对每一个请求，JSP 引擎创建一个线程来处理该请求。如果有多个客户端同时请求该 JSP 文件，则 JSP 引擎会创建多个线程。每个客户端请求对应一个线程。

以多线程方式执行可以大大降低对系统资源的需求，提高系统的并发量及响应时间。但也要主要多线程的编程带来的额同步问题，由于该Servlet始终驻于内存，所以响应是非常快的。

JSP 引擎在调用 JSP 对应的 jspServlet 时，会传递或创建 9 个与 web 开发相关的对象共 jspServlet 使用。

JSP 技术的设计者为便于开发人员在编写 JSP 页面是获得这些 web 对象的引用，特意定义了 9 个相应的变 量，开发人员在 JSP 页面中通过这些变量就可以快速获得这 9 大对象的引用。

## JSP 9个内置对象

**内置对象**: JSP内置对象是Web容器创建的一组对象，不使用new关键字就可以使用的内置对象。

### 四种作用域范围

- **application_SCOPE**: 作用于整个Web应用，多个用户之间共享。

- **session_SCOPE**: 作用于整个Web应用，单个用户之间共享。

- **request_SCOPE**: 作用于请求，转发间请求共享。

- **page_SCOPE**: 作用于当前页面，当前页面可见。

### out对象

**缓冲区**: Buffer，即内存中的一块区域用来保存临时数据。

**out对象**: 是 JspWriter 类的实例，是向客户端发送文本常用的对象，是通过调用 pageContext 对象的 getOut 方法返回的，其作用和用法与 ServletResponse.getWriter 方法返回的 PrintWriter 对象非常相似。

JSP 页面中的 out 隐式对象的类型为 JspWriter，JspWriter 相当于一种带缓存功能的 PrintWriter，设置 JSP 页面的 page 指令的 buffer 属性可以调整它的缓存大小，甚至关闭它的缓存。

当缓冲区满足如下条件是才会写入 Servlet 引擎提供的缓冲区：设置 page 指令的 buffer 属性关闭了 out 对象的缓存功能；out 对象的缓冲区已满。整个 JSP 页面结束。

```java title="out对象"
<%
  out.println("aaa");
  response.getWriter().write("bbb");
%>
"bbb会比aaa先输出"
```

常用方法：
- void println(); 向客户端打印字符串

- void clear(); 清除缓冲区的内容，如果在flush之后调用会抛出异常。

- void clearBuffer(); 清除缓冲区的内容，如果在flush之后调用不会抛出异常

- void flush(); 将缓冲区内容输出到客户端

- int getBufferSize(); 返回缓冲区以字节数的大小，如不设缓冲区则为0

- int getRemaining(); 返回缓冲区还剩余多少可用

- boolean isAutoFlush(); 返回缓冲区满是，是自动清空还是抛出异常

- void close(); 关闭输出流

### request/response对象

**表单的两种提交方式**

- **Get**: 以明文的方式通过 URL 提交数据，数据在 URL 中可以看到。提交的数据最多不超过 2KB。安全性较低，但效率比 post 方式高。适合提交数据量不大，安全性高的数据。比如：搜索、查询等功能。

- **Post**: 将用户提交的信息封装在 HTML header 内。适合提交数据量大，安全性高的用户信息。比如：注册、修改、上传等功能。

#### request对象

客户端的请求信息被封装在 request 对象中，通过它才能了解到客户端的需求，然后做出响应。它是 HttpServletRequest 类的实例。request 对象具有请求域，即完成客户端的请求之前，该对象一直有效。

**request对象常用方法**

- String getParameter();返回指定参数的参数值

- String[] getParameterValues();返回指定参数的所有值

- void setAttribute();存储此请求中的属性

- Object getAttribute();返回指定属性的属性值

- String getContentType();得到请求体的 MIME 类型

- String getProtocol();返回请求用的协议及版本号

- String getServerName();返回接受请求的服务器主机名

- int getServerPort();返回服务器接受此请求的端口号

- String getCharacterEncoding();返回字符编码方式

- void setContentEncoding();设置请求的字符编码方式

- int getContentLength();返回请求体的长度（以字节数）

- String getRemoteAddr();返回发送此请求的客户端 IP 地址

- String getRealPath(String path);返回一个虚拟路径的真实路径或相对路径的绝对路径

- String getContextPath();返回上下文路径，即项目的根目录

**中文乱码问题**: `request.setCharacterEncoding("UTF-8");`

**URL中中文乱码问题**: `Tomcat的/conf/server.xml` 的添加属性。

#### response对象

response 对象包含了响应客户请求的有关信息，但在 JSP 中很少直接用到它。它是 HttpServletResponse 类的实例。response 对象具有页面作用域，及访问一个页面时，该页面内的 response 对象只能对这次访问有效，其他的 response 对象对当前页面无效。

**response对象常用方法**

- String getCharacterEncoding(); 返回响应用的是何种字符编码

- void setContentType(); 设置响应的 MIME 类型，一般为 "text/html, charset=UTF-8"

- PrintWriter getWriter(); 返回可以向客户端输出字符的一个对象("注意比较：PrintWriter与内置 out对象的区别，PrintWriter对象的其输出总是提前于内置out对象，或者在out中手动flush")

- sendRedirect(loaction); 重新定向客户端的请求

**请求重定向**: 是客户端行为，response.sendRedirect(),从本质上将等同于两次请求，前一次的 请求对象不会保存，地址栏的 URL 地址会改变。

**请求转发**: 是服务器行为，request.getRequestDispatcher().forward();是一次请求，转发后请求 对象会保存，地址栏的 URL 地址不会改变。

#### session对象

**session**: 表示客户端与服务器的一次会话，Web 中的 session 指的是用户在浏览某个网站时，从进入网站到浏览器关闭所经过的这段时间，也就是用户浏览这个网站所花费的时间。

在服务器的内存中，为不同的用户保存着不同的 session。

**session对象**: 是一个 JSP 内置的对象。

session 对象在第一个 JSP 页面被装载时自动创建，完成会话期管理。

从一个客户打开浏览器并连接到服务器开始，到客户关闭浏览器离开这个服务器结束，被称为一个会 话。

当一个客户访问一个服务器时，肯能会在服务器的几个页面之间切换，服务器应当通过某种办法知道 这是一个客户，就需要 session 对象。

session 对象是 HttpSession 类的实例。

**session的常用方法**

- long getCreationTime();返回 session 创建时间

- String getId();返回 session 创建时 JSP 引擎为它设的唯一 ID 号

- Object setAttribute();使用指定名称将对象绑定到此会话

- Object getAttribute();返回与此会话中的指定名称绑定在一起的对象，没有返回 null

- String[] getValueNames();返回一个包含此 session 中所有可用属性的数组

- int getMaxInactiveInterval();返回两次强求间隔多长时间此 session 被取消（单位秒）

- void setMaxInactiveInterval();设置 session 存活时间。

**session 的生命周期**

- 创建：当客户端第一次访问某个 jsp 或者 Servlet 时候，服务器会为当前会话创建一个 SessionId，每次客户端向服务端发送请求时，都会将此 SessionId 携带过去，服务端会对此 SessionId 进行校验。

- 活动： 某次会话当中通过超链接打开的新页面属于同一次会话。只要当前会话页面没有全部关闭，重新打开新的浏览器窗口访问同一项目资源时属于同一次会话。除非本次会话的所有页面都关闭后，在重新访问某个 jsp 或者 Servlet 将会创建新的会话(但此时原有会话还存在，这个就的 SessionId 仍然存在于服务端，只不过再也没有客户端会携带它然后教育服务端校验，直到该会话超时。)。

- 销毁：有三种销毁方式

  - 调用了 session.invalidate() 方法

  - Session 过期（超时）可以在 web.xml 中配置 Session 超时时间 1 单位是分钟

  - 服务器重新启动

#### application对象

**application对象**: 实现了用户间数据的共享，可存放全局变量。

**application 开始于服务器的启动，终止于服务器的关闭**。

在用户的前后连接或不同用户之间的连接中，可以对 application 对象的同一属性进行操作。

在任何地方对 application 对象属性的操作，都将影响到其他用户对此的访问。

服务器的启动和关闭决定了 application 对象的生命。

application 对象是 ServletContext 类的实例。

**application 的常用方法**

- void setAttribute();使用指定名称将对象绑定到此会话

- Object getAttribute();返回与此会话中的指定名称绑定在一起的对象，如果没有，返回 null

- Enumeration getAttributeNames();返回所有可用属性名的枚举

- String getServerInfo();返回 JSP(Servlet)引擎名及版本号

#### page对象

**page 对象**: 就是指向当前 JSP 页面本身，有点像类中的 this 指针，它是 java.lang.Object 类的实例。常用方法就是 Object 类的成员方法。

#### pageContext对象

**pageContext 对象**: 是 JSP 技术中最重要的一个对象，它代表 JSP 页面的运行环境，这个对象不仅封装了对其他 8 个隐式对象的引用，其自身还是一个域对象，可以用来保存数据。并且，这个对象还封装了 web 开发中经常涉及到的一些常用操作，例如 include，forward 其他资源、检索其他域对象中的属性等。

pageContext 对象提供了对 jsp 页面内所有的对象及名字空间的访问。该对象可以访问到本页所在的 Session，也可以取本页所在的 application 中的属性值。该对象相当也页面中所有功能的集大成者。该对象的本类名也叫 pageContext。

**pageContext 的常用方法**

- JspWriter getOut();返回当前客户端响应被使用的 out 对象

- HttpSession getSession();返回当前页中的 Session 对象

- Object getPage();返回当前页的 page 对象

- ServletRequest getRequest();返回当前页的 Request 对象

- ServletResponse getResponse();返回当前页的 Response 对象

- void setAttribute();设置属性及属性值

- Object getAttribute();在指定范围内取属性的值

- int getAttributeScope();返回某属性的作用范围

- void forward();跳转到另一个页面，地址栏不变

- void include();包含另一个页面，

- PageContext.APPLICATION_SCOPE 代表各个域的常量

- PageContext.SESSION_SCOPE

- PageContext.REQUEST_SCOPE

- PageContext.PAGE_SCOPE

- findAttribute(); 查找各个域中的属性

#### Config对象

**Config 对象**: 是在一个 Servlet 初始化时，JSP 引擎向它传递信息用的，此信息包括 Servlet 初始化时所要用到的参数（通过属性名和属性值构成）以及服务器的有关信息（通过传递一个 ServletContext 对象）

**Config 的常用方法**

- ServletContext getServletContext();返回含有服务器信息的 ServletContext 对象

- String getInitParameter();返回初始化参数的值

- Enumeration getInitparameterNames();返回 Servlet 初始化所需所有参数的枚举

#### Exception对象

**Exception 对象**: 是一个异常对象，当一个页面在运行过程中发生了异常，就产生这个对象。如果一个 JSP 页面要应用此对象，就必须报 isErrorPage 设为 true，否则无法编译。它实际上是 java.lang.Throwable 的对象。页面要想在有异常时得到处理，就要指定异常处理页面 `<% page errorPage="exception.jsp"%>`

**exception 的常用方法**

- String getMessage();返回描述异常的消息

- String toString();返回关于异常的简短描述消息

- void printStackTrace();显示异常及其栈轨迹

- Throwable fillInStackTrace();重写异常的执行栈轨迹

## JSP动作标签

1. **JSP 动作元素**: 动作元素为请求处理阶段提供信息。动作元素遵循 XML 元素的语法，有一个包含元素名的开始标签，可以有属性、可选的内容、与开始标签匹配的结束标签。

  JSP 标签也称之为 JSP Action（JSP 动作）元素，它用于在 JSP 页面中提供业务逻辑功能，避免在 JSP 页面中直接编写 java 代码，造成 jsp 页面难以维护。

2. **JSP 动作元素**包含五大类

  - 与存储 JavaBean 有关的：jsp:useBean, jsp:setProperty, jsp:getProperty.

  - JSP1.2 规范就有的 6 个基本动作元素：jsp:include, jsp:forward, jsp:param, jsp:plugn, jsp:params, jsp:fallback.

  - JSP2.0 新增加，主要与 JSP Document 有关的 6 个动作元素：jsp:root, jsp:declaration, jsp:scriptlet, jsp:exception, jsp:text,    jsp:output.

  - JSP2.0 新增加，主要永磊动态生成 XML 元素标签的值，包括 3 个动作：jsp:attribute, jsp:body, jsp:element.

  - JSP2.0 新增加，只要用在 Tag File 中：jsp:invoke, jsp:dobody.

3. **JSP 常用标签**

  - **include**: 该标签用于把另外一个资源的输出内容插入进当前 JSP 页面的输出内容中，这种在 JSP 页面执行时的引入方式称之为动态引入。`<jsp:include page="relativeURL | <%=expression%>" flush="true|false" />`。flush 属性指定在插入其他资源的输出内容时，是否先将当前 JSP 页面的已输出的内容刷新到客户端。

  - **jsp:include**与**include**指令比较: jsp:include 标签是动态引入， jsp:include 标签涉及到的 2 个 JSP 页面会被翻译成 2 个 servlet，这 2 个 servlet 的内容在执行时进行合并。而 include 指令是静态引入，涉及到的 2 个 JSP 页面会被翻译成一个 servlet，其内容是在源文件级别进行合并。不管是 jsp:include 标签，还是 include 指令，它们都会把两个 JSP 页面内容合并输出，所以这两个页面不要出现重复的 HTML 全局架构标签，否则输出给客户端的内容将会是一个格式混乱的 HTML 文档。但 include 指令要比 jsp:include 标签效率高些。可以从下面的表格中更直观的看到两者的区别.

  |      | include | jsp:include |
  |:-----|:--------|:------------|
  | 语法格式 | `<%@ include file="..." %>` | < jsp:include page="..." > |
  | 发生作用的时间 | 页面转换期间 | 请求期间 |
  | 包含的内容 | 文件的实际内容 | 页面的输出 |
  | 转换成的servlet | 主页面和包含页面转换成一个Servlet | 主页面和包含页面转换为独立的Servlet |
  | 编译时间 | 较慢 - 资源必须被解析 | 较快 |
  | 执行时间 | 稍快 | 较慢 - 每次资源必须被解析 |

  - **jsp:forward**: 该标签用于把请求转发给另外一个资源。

  - **jsp:param**: 当使用 jsp:include 和 jsp:forward 标签引入或将请求转发给其它资源时，可以使用 jsp:param 标签向这个资源传递参数。

```java title="JSP常用标签"
<jsp:include page="relativeURL | <%=expression%>">
<jsp:param name="parameterName" value="parameterValue|<%= expression %>"/>
</jsp:include>
可以使用多个<jsp:param>标签来传递多个参数。
```

- **映射 JSP**: 将一个 JSP 映射成其他任意形式的 URL，在 web.xml 文件配置

```xml title="web.xml"
<servlet>
  <servlet-name>SimpleJspServlet</servlet-name>
  <jsp-file>/jsp/simple.jsp</jsp-file>
  <load-on-startup>1</load-on-startup >
</servlet>
……
<servlet-mapping>
  <servlet-name>SimpleJspServlet</servlet-name>
  <url-pattern>/xxx/yyy.html</url-pattern>
</servlet-mapping>
```

## JavaBeans

- **Javabean 简介**: Javabeans 就是符合某种特定规范的 Java 类。使用 Javabeans 的好处是解决代码重复编写，减少代码冗余，功能区分明确，提高了代码的可维护性。

- **Javabean 设计原则**

  - 必须是共有类；

  - 必须包含一个无参的共有构造方法；

  - 所有属性必须私有；

  - 使用 getter 和 setter 访问器对属性访问封装。

```java title="JavaBeans"
public class Book {
  //一个符合要求的Javabean类
  private String bookName;
  private String author;
  private double price;
  public Book() {
  }
  public String getBookName() {
    return bookName;
  }
  public void setBookName(String bookName) {
    this.bookName = bookName;
  }
  public String getAuthor() {
    return author;
  }
  public void setAuthor(String author) {
    this.author = author;
  }
  public double getPrice() {
    return price;
  }
  public void setPrice(double price) {
    this.price = price;
  }
}
```

- **JSP 中如何使用 Javabean**

  第一种方式：像使用普通 java 类一样，创建 javabean 实例。

  第二种方式：在 JSP 页面中通常使用 jsp 动作标签使用 javabean。

- **scope**: 在 JSP 页面中实例化或者在指定范围内使用 Javabean

```java title="scope"
 <jsp:useBean id="标识符" class="java类名" scope="作用范围"/>
 <!-- scope默认为page。 -->
```

- **property**: 给已经实例化的 Javabean 对象的属性赋值，一共有四种形式：

```java title="property"
<jsp:setProterty name="Javabean实例名" property="*"/>（跟表单关联）
<jsp:setProterty name="Javabean实例名" property="Javabean属性名"/>（跟表单关联）
<jsp:setProterty name="Javabean实例名" property="Javabean属性名" value="BeanValue"/>（手工设置）
<jsp:setProterty name="Javabean实例名" property="propertyName" param="request对象中的参数名"/>（跟request参数关联）通过url地址传递的参数
```

- **name**: 获取指定 Javabean 对象的属性值。

```java title="name"
<jsp:getProperty name="Javabean实例名" property="属性名"/>
```

- Javabean的四个作用域范围

使用 useBeans 的 scope 属性可以用来指定 Javabean 的作用范围。

- page：仅在当前页面有效

- request：可以通过 request.getAttribute 方法取得 JavaBean 对象

- session：可以通过 session.getAttribute 方法取得 JavaBean 对象

- application：可以通过 application.getAttribute 方法取得 JavaBean 对象
