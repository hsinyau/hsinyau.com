export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'neutral',
      error: 'red',
      success: 'green',
      warning: 'yellow',
      info: 'blue',
    },
  },
  site: {
    name: '疏影横斜',
    description: '欲笺心事，独语斜阑。',
    author: 'Hsinyau',
    domain: 'https://hsinyau.com',
    avatar: 'https://cdn.jsdelivr.net/gh/hsinyau/static@master/avatar.jpg',
    menu: [
      {
        label: '文稿',
        to: '/posts',
        icon: 'book-open-duotone',
      },
      {
        label: '项目',
        to: '/projects',
        icon: 'books-duotone',
      },
      {
        label: '友链',
        icon: 'link-break-duotone',
        to: '/friends',
      },
      {
        label: '动态',
        icon: 'butterfly-duotone',
        to: '/timeline',
      },
      {
        label: '关于',
        icon: 'seal-check-duotone',
        to: '/about',
      },
    ],
    hero: [
      {
        text: '前端小学生',
        className: 'bg-clip-text text-center text-transparent bg-gradient-to-r from-[#f43f5e] to-[#a855f7]',
      },
      {
        text: '摄影爱好者',
        className: 'bg-clip-text text-center text-transparent bg-gradient-to-r from-[#3b82f6] to-[#22c55e]',
      },
      {
        text: '旅行探索家',
        className: 'bg-clip-text text-center text-transparent bg-gradient-to-r from-[#f97316] to-[#f43f5e]',
      },
    ],
    socials: [
      {
        id: 'github',
        icon: 'ph:github-logo-duotone',
        label: 'GitHub',
        to: 'https://github.com/hsinyau',
      },
      {
        id: 'instagram',
        icon: 'ph:instagram-logo-duotone',
        label: 'Instagram',
        to: 'https://www.instagram.com/hsinyau_zz',
      },
      {
        id: 'telegram',
        icon: 'ph:telegram-logo-duotone',
        label: 'Telegram',
        to: 'https://t.me/hsinyau_channel',
      },
      {
        id: 'netease',
        icon: 'tabler:brand-netease-music',
        label: '网易云',
        to: 'https://music.163.com/#/user/home?id=1352085491',
      },
      {
        id: 'bilibili',
        icon: 'tabler:brand-bilibili',
        label: '哔哩哔哩',
        to: 'https://space.bilibili.com/221029937',
      },
      {
        id: 'email',
        icon: 'ph:envelope-duotone',
        label: 'Email',
        to: 'mailto:hi@hsinyau.com',
      },
    ],
    comment: {
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
})
