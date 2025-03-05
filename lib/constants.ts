// eslint-disable-next-line node/prefer-global/process
export const isProduction = process.env.NODE_ENV === 'production'

export const SITE_URL = isProduction ? 'https://hsinyau.com' : 'http://localhost:3000'

export const SITE_NAME = '疏影横斜'
export const SITE_DESCRIPTION = '欲笺心事，独语斜阑。'
export const SITE_AVATAR = 'https://cdn.jsdelivr.net/gh/hsinyau/static@master/avatar.jpg'

export const SITE_GITHUB_URL = 'https://github.com/hsinyau'
export const SITE_INSTAGRAM_URL = 'https://www.instagram.com/hsinyau_zz'
export const SITE_X_URL = 'https://x.com/hsinyau_zz'
export const SITE_TELEGRAM_URL = 'https://t.me/hsinyau_channel'
export const SITE_NETEASE_CLOUD_URL = 'https://music.163.com/#/user/home?id=1352085491'
export const SITE_BILIBILI_URL = 'https://space.bilibili.com/221029937'
export const SITE_EMAIL = 'hi@hsinyau.com'

// 菜单
interface Menu {
  label: string
  to: string
  icon: string
}

export const SITE_MENU: Menu[] = [{
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
}]

// 社交
interface Social {
  icon: string
  label: string
  link: string
}

export const SITE_SOCIALS: Social[] = [
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
]

// Hero
interface Hero {
  text: string
  className: string
}

export const SITE_HERO: Hero[] = [
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
]

// 评论
interface Comment {
  serverURL: string
  locale: {
    sofa: string
    placeholder: string
  }
  emoji: string[]
}

export const SITE_COMMENT: Comment = {
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
}
