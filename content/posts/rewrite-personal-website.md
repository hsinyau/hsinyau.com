---
title: 我又又又重写个人网站了
tag: 事件簿
summary: 作者因域名、服务器续费价格上涨，且觉得之前使用的 Next.js 写起来心智负担大、网站风格杂乱等原因，决定重写个人网站，此次选用 Nuxt.js，还介绍了 Nuxt 相关平台 NuxtHub 和 Nuxt Studio 的功能及部署优势，夸赞 Cloudflare 免费额度充足。
created: 2024-12-06 10:00:00
---

我又又又又又不知道多少次 :hover-text{hover="上一个版本：https://latemist.vercel.app" text="重写" href="https://latemist.vercel.app"} 个人网站了。

2024 一整年时间，只发布了四篇不那么水的文章。域名和服务器也快要过期了，正好趁着这个机会做个断舍离。

原本使用的 CC 域名又涨价了，涨到了和 .COM 域名的价格一样，那我为什么不直接用 .COM 呢。去年的时候我记得非常清楚续费只需要三十多元的。服务器是我在某年双十一我在良心云买的，当时是 180元/3年 买的 2H2G6M，后面搞活动升到了 4H4G8M，今年一看续费价格将近 1500 块...。

仔细想想，现在 serverless 的平台那么多，Vercel、Netlify、Cloudflare、Zeabur 等等都有充足的免费额度，我为什么还要自己维护服务器呢？

## 动机

上一个版本是 2022 年底，使用 Next.js + TailwindCSS + Drizzle + PostgreSQL 搭建的，并部署在 Vercel 上。

最近一年 Next.js 的更新我越来越看不懂了，写起来心智负担超级大，每次程序出错都要先去查一下 issue 列表，然后才能找到解决方案。就像 :hover-text{hover="https://x.com/Dreamer__Paul" text="奇趣保罗" href="https://x.com/Dreamer__Paul/status/1779098449880953328"} 说的：当代码强行引入 Next 以及它的所有功能和特性了，你就已经没法再摆脱它了。所以，我决定换一个框架重写个人网站，这一次我选择了 Nuxt.js。

还有一点，我预想中的个人网站会像是 :hover-text{hover="https://antfu.me" text="Antfu" href="https://antfu.me"} 那样的简约风的，上一个版本风格还是有点杂乱了(还不是因为抄了太多网站)。所以就有了现在这个网站，风格简约，没有太多花哨的东西。

## 技术选型

相比 Typecho、WordPress、Halo 这些 CMS 系统，我更喜欢类似 Hexo、Hugo 这样的静态网站。而让我选择 Nuxt 的一个原因是  NuxtLabs 官方推出的 :hover-text{hover="https://hub.nuxt.com" text="NuxtHub" href="https://hub.nuxt.com"} 和 :hover-text{hover="https://nuxt.studio" text="Nuxt Studio" href="https://nuxt.studio"}。

NuxtHub 是 Nuxt 的部署和管理平台，它可以在您的 Cloudflare 帐户上以零配置的方式部署包含 D1 数据库、KV 和 Blob 存储、Analytics 分析、Cache 缓存的 Nuxt 应用程序。Nuxt Studio 是专为 Nuxt 开发者设计的基于 Git 的 CMS，可以实时预览和测试您的 Nuxt 应用程序。

![NuxtHub](https://file.hsinyau.com/image/be00f274391057c9b9c8e1084b5bb9f3.png)
![Nuxt Studio](https://file.hsinyau.com/image/521019b945914d8fcb9c87b1df5ace7e.png)

和 Vercel 类似，首次部署时将 Git 仓库与 NuxtHub、Cloudflare 关联后，每次只需要将更改的代码提交到 GitHub 后，NuxtHub 会进行自动化的部署。Cloudflare 真的太良心了，免费额度对我唯一的限制就是每月 500 次构建，不过我目前大概率用不到 500 次，所以对我来说完全够用。

既然决定部署到 Cloudflare，那我肯定要使用它的 R2 对象存储了，对象存储最贵的部分就是流量，而 R2 对象存储的流量是免费的。所以我就把之前使用的腾讯云的 COS 对象存储换成了 Cloudflare 的 R2。又省了一笔钱，美滋滋。

## 一些有趣的东西

好久之前就在 :hover-text{hover="https://innei.in" text="Innei 大佬" href="https://innei.in"} 的博客上看到过展示正在使用的软件的功能，当时就觉得很有意思，所以我也想做一个。

经过一番搜索，我找到了这个开源项目： :hover-text{hover="Github：Phineas/lanyard" text="lanyard" href="https://github.com/Phineas/lanyard"} ，应该可以实现我想要的功能，并且不用写很多代码。只需要将 Discord 用户 ID 填入即可获取对应用户的状态。觉得不安全可以自己部署一个，或者直接用 Discord 的 API 也是可以的，但是需要用户授权，而使用这个 API 则不需要。

下面是我使用这个 API 获取到的状态：

```json [返回数据]
{
  "data": {
    "kv": {
      "location": "Dream"
    },
    "discord_user": {
      "id": "1072172631412981810",
      "username": "hsinyau",
      "avatar": "d1e94ab5b6345e92dbd8b297051279a9",
      "discriminator": "0",
      "clan": null,
      "avatar_decoration_data": null,
      "bot": false,
      "global_name": "Hsinyau",
      "display_name": "Hsinyau",
      "public_flags": 0
    },
    "activities": [
      {
        "flags": 48,
        "id": "spotify:1",
        "name": "Spotify",
        "type": 2,
        "state": "Ronghao Li",
        "session_id": "f571f75c13fded99a564a4a7129a4589",
        "details": "模特",
        "timestamps": {
          "start": 1733554478581,
          "end": 1733554784821
        },
        "assets": {
          "large_image": "spotify:ab67616d0000b273a03de2e0a58d20630278475e",
          "large_text": "模特"
        },
        "sync_id": "2uS3Cm9KGBq4TnwNnkAyxL",
        "created_at": 1733554479903,
        "party": {
          "id": "spotify:1072172631412981810"
        }
      },
      {
        "id": "81325269b4b19cd",
        "name": "Cursor",
        "type": 0,
        "state": "Workspace: kawaii-space",
        "session_id": "f571f75c13fded99a564a4a7129a4589",
        "details": "Editing drizzle.config.ts",
        "application_id": "383226320970055681",
        "timestamps": {
          "start": 1733553014614
        },
        "assets": {
          "large_image": "565945077491433494",
          "large_text": "Editing a TypeScript file",
          "small_image": "565945770067623946",
          "small_text": "Cursor"
        },
        "created_at": 1733553190165,
        "buttons": [
          "View Repository"
        ]
      }
    ],
    "discord_status": "online",
    "active_on_discord_web": false,
    "active_on_discord_desktop": true,
    "active_on_discord_mobile": false,
    "listening_to_spotify": true,
    "spotify": {
      "timestamps": {
        "start": 1733554478581,
        "end": 1733554784821
      },
      "album": "模特",
      "album_art_url": "https://i.scdn.co/image/ab67616d0000b273a03de2e0a58d20630278475e",
      "artist": "Ronghao Li",
      "song": "模特",
      "track_id": "2uS3Cm9KGBq4TnwNnkAyxL"
    }
  },
  "success": true
}
```

要展示 Spotify 听的歌曲，需要先到 Discord 的设置 - 连接 - Spotify 中连接自己的 Spotify 账号(其实直接用 Spotify 的 API 也可以，但是需要用户授权)。要展示 Cursor 正在编辑的文件，则需要安装插件 :hover-text{hover="Discord Presence" text="Discord Presence" href="https://marketplace.visualstudio.com/items?itemName=icrawl.discord-vscode"}。

由于 Discord 是国外的 APP，现在能直接展示的软件只有 Spotify、Steam、EPIC 之类的，国内的软件就无法直接展示了，需要自己手动添加，比如使用 :hover-text{hover="自定义 Discord Rich Presence 管理器" text="CustomRP" href="https://www.customrp.xyz/?lang=zh-hans"} ，又或者自己写点代码。

效果展示：

![状态](https://file.hsinyau.com/image/cb347d80af738a57c3a74bff6e56b265.png)

Todo: 等我什么时候有时间了，搞个 QQ 音乐和网易云音乐的展示，Spotify 在国内使用还是有点不方便的。
