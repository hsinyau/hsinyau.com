export default defineAppConfig({
  site: {
    title: '疏影横斜',
    description: '欲笺心事，独语斜阑。',
    author: 'Hsinyau',
    domain: 'https://hsinyau.com',
    twitter: '@yau1204',
  },
  socials: [
    {
      icon: 'ph:x-logo-duotone',
      label: 'Twitter',
      link: 'https://twitter.com/yau1204',
    },
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
      icon: 'ph:threads-logo-duotone',
      label: 'Threads',
      link: 'https://www.threads.net/@hsinyau_zz',
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
})
