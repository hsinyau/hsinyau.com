export default defineAppConfig({
  site: {
    name: 'Hsinyau',
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
        icon: 'custom:neteasecloud',
        label: '网易云',
        link: 'https://music.163.com/#/user/home?id=1352085491',
      },
      {
        icon: 'custom:bilibili',
        label: '哔哩哔哩',
        link: 'https://space.bilibili.com/221029937',
      },
      {
        icon: 'ph:envelope-duotone',
        label: 'Email',
        link: 'mailto:hi@hsinyau.com',
      },
    ],
  },
})
