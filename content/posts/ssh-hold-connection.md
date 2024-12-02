---
title: 如何解决SSH自动断开连接的问题
tag: 分享境
summary: 本文介绍了通过调整服务器和客户端配置来解决自动断开连接的问题，以保持SSH连接的长时间稳定性。通过服务端设置或客户端设置，你可以调整发送空包的间隔时间和最大尝试次数，从而保持连接的活跃状态。
created: 2021-06-17 13:24:31
cover: https://t.mwm.moe/pc/
---

众所周知，在使用 SSH 连接远程服务器时，如果终端一段时间内没有活动，SSH 会自动断开连接。

这种情况下，终端可能会显示以下错误信息：

```bash
packet_write_wait: Connection to xxx.xxx.xxx.xxx port xxxx: Broken pipe
```

这个断开连接的机制是为了保护服务器和其拥有者的利益，防止未经授权的访问或滥用。

然而，有时这种自动断开连接的机制可能令人感到困扰。当你没有及时注意到连接断开并尝试重新控制终端时，可能会导致一些不便和延迟。

为了解决这个问题，可以采取一些方法来保持 SSH 连接的长时间稳定性。

## 服务端实现

一种常见的方法是调整 SSH 服务器的配置。你可以通过编辑 SSH 服务器的配置文件（通常是 `/etc/ssh/sshd_config`）来进行设置。在该配置文件中，你可以找到以下两个参数：

```bash
ClientAliveInterval
ClientAliveCountMax
```

ClientAliveInterval 参数表示服务器向客户端发送空包（null packet）的时间间隔。如果设置为60，表示服务器每60秒向客户端发送一个空包来检测连接是否存活。
ClientAliveCountMax 参数表示服务器在发送了多少个空包后，如果仍未收到客户端的响应，就会断开连接。

你可以根据自己的喜好和网络条件来调整这两个参数的值。例如，你可以将 ClientAliveInterval 设置为 120，将 ClientAliveCountMax 设置为 10，表示服务器每隔 120 秒发送一个空包，最多尝试 10 次。这样，即使终端在一段时间内没有活动，连接也能保持稳定。

在修改完配置文件后，重启 SSH 服务(`service sshd restart`)即可使更改生效。

## 客户端实现

另一种方法是在本地 SSH 客户端进行设置。如果你已经配置了 SSH 密钥连接，可以在本地SSH文件夹（通常是.ssh）中的配置文件中添加以下参数：

```bash
ServerAliveInterval 120
ServerAliveCountMax 10
```

这样，客户端会定期向服务器发送请求以保持连接的活跃状态。你可以根据需要调整 ServerAliveInterval 和 ServerAliveCountMax 的值。

如果你尚未配置 SSH 连接，可以在 SSH 文件夹中创建一个新的 config 文件，并在其中添加类似以下的配置：

```bash
Host *
  ServerAliveInterval 120
  ServerAliveCountMax 10
```

然后，你可以使用`ssh [快捷方式]` 或 `ssh [IP地址]` 来连接服务器，并发送保持连接的请求。

## 参考

[linux - Keep SSH session alive - Stack Overflow](https://stackoverflow.com/questions/25084288/keep-ssh-session-alive){target="_blank"}
