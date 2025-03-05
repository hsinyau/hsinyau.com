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
      color: 'neutral',
    },
    {
      icon: 'ph:instagram-logo-duotone',
      label: 'Instagram',
      link: 'https://www.instagram.com/hsinyau_zz',
      color: 'error',
    },
    {
      icon: 'ph:telegram-logo-duotone',
      label: 'Telegram',
      link: 'https://t.me/hsinyau_channel',
      color: 'secondary',
    },
    {
      icon: 'custom:neteasecloud',
      label: '网易云',
      link: 'https://music.163.com/#/user/home?id=1352085491',
      color: 'error',
    },
    {
      icon: 'custom:bilibili',
      label: '哔哩哔哩',
      link: 'https://space.bilibili.com/221029937',
      color: 'info',
    },
    {
      icon: 'ph:envelope-duotone',
      label: 'Email',
      link: 'mailto:hi@hsinyau.com',
      color: 'warning',
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
    label: '友链',
    icon: 'link-break-duotone',
    to: '/friends',
  }, {
    label: '动态',
    icon: 'butterfly-duotone',
    to: '/timeline',
  }, {
    label: '关于',
    icon: 'seal-check-duotone',
    to: '/about',
  }],
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
  ui: {
    colors: {
      primary: 'neutral',
      white: 'white',
      black: 'black',
      neutral: 'neutral',
      red: 'red',
      green: 'green',
      blue: 'blue',
      yellow: 'yellow',
      purple: 'purple',
      pink: 'pink',
      indigo: 'indigo',
      cyan: 'cyan',
      teal: 'teal',
      gray: 'gray',
      orange: 'orange',
      amber: 'amber',
      lime: 'lime',
      emerald: 'emerald',
      rose: 'rose',
      sky: 'sky',
      violet: 'violet',
      fuchsia: 'fuchsia',
      lightBlue: 'lightBlue',

    },
  },
})
