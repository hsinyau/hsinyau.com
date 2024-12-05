export default defineAppConfig({
  site: {
    title: '疏影横斜',
    description: '欲笺心事，独语斜阑。',
    author: {
      name: 'Hsinyau',
      avatar: 'https://cdn.jsdelivr.net/gh/hsinyau/static@master/avatar.jpg',
    },
    domain: 'https://hsinyau.com',
    twitter: '@yau1204',
    waline: {
      serverURL: 'https://comment.758201.xyz',
      emoji: [
        'https://cute.s3.bitiful.net/emojis/alus',
        'https://cute.s3.bitiful.net/emojis/qq',
        'https://cute.s3.bitiful.net/emojis/tieba',
        'https://cute.s3.bitiful.net/emojis/weibo',
        'https://cute.s3.bitiful.net/emojis/bilibili',
      ],
      locale: {
        sofa: '此时无声胜有声',
        placeholder: '填写邮箱可在被回复时收到邮件提醒~',
      },
    },
  },
  socials: [
    {
      icon: 'ph:github-logo-duotone',
      label: 'GitHub',
      link: 'https://github.com/hsinyau',
    },
    {
      icon: 'ph:instagram-logo-duotone',
      label: 'Instagram',
      link: 'https://www.instagram.com/hsinyau_zz',
    },
    {
      icon: 'ph:telegram-logo-duotone',
      label: 'Telegram',
      link: 'https://t.me/hsinyau_channel',
    },
    {
      icon: 'tabler:brand-netease-music',
      label: '网易云',
      link: 'https://music.163.com/#/user/home?id=1352085491',
    },
    {
      icon: 'tabler:brand-bilibili',
      label: '哔哩哔哩',
      link: 'https://space.bilibili.com/221029937',
    },
  ],
  menu: [{
    label: '文稿',
    to: '/posts',
    icon: 'book-open-duotone',
  }, {
    label: '项目',
    to: '/projects',
    icon: 'books-duotone',
  }, {
    label: '装备',
    to: '/uses',
    icon: 'backpack-duotone',
  }, {
    label: '友链',
    icon: 'link-break-duotone',
    to: '/friends',
  }, {
    label: '动态',
    icon: 'butterfly-duotone',
    to: '/collection',
  }],
  ui: {
    tabs: {
      list: {
        background: 'bg-zinc-600/5 dark:bg-zinc-500/20',
        marker: {
          background: 'bg-white dark:bg-neutral-900',
        },
      },
    },
    button: {
      color: {
        white: {
          solid: 'dark:bg-zinc-500/20',
        },
      },
    },
    tooltip: {
      background: 'bg-zinc-100 dark:bg-zinc-800',
    },
  },
})
