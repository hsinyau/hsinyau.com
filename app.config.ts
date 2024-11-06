export default defineAppConfig({
  site: {
    title: '疏影横斜',
    description: '欲笺心事，独语斜阑。',
    keywords: '疏影横斜,Hsinyau,个人网站,Personal website',
    avatar: '/img/avatar.jpg',
    author: 'Hsinyau',
    moeIcp: '萌ICP备20242023号',
    start_at: '2019'
  },
  menu: [
    {
      path: '/',
      title: '首页',
      icon: 'i-mingcute-home-4-line',
      key: 'home',
    },
    {
      path: '/posts',
      title: '文稿',
      icon: 'i-mingcute-book-4-line',
      key: 'posts',
    },
    {
      path: '/friends',
      title: '友链',
      icon: 'i-mingcute-group-line',
      key: 'friends',
    },
    {
      path: '#',
      title: '时光',
      icon: 'i-mingcute-bling-line',
      key: 'time',
      subMenu: [
        {
          path: '/moments',
          title: '动态',
          key: 'moments',
        },
        {
          path: '/gallery',
          title: '画廊',
          key: 'gallery',
        },
      ],
    },
    {
      path: '#',
      title: '更多',
      icon: 'i-mingcute-cursor-3-line',
      key: 'more',
      subMenu: [
        {
          path: '/projects',
          title: '项目',
          key: 'projects',
        },
        {
          path: '/uses',
          title: '装备',
          key: 'uses',
        },
      ],
    },
    {
      path: '/about',
      title: '关于',
      icon: 'i-mingcute-emoji-line',
      key: 'about',
    },
  ],
  friends: [
    {
      "name": "Rinkaneko",
      "desc": "风雨里做个大人，阳光下做个孩子。",
      "avatar": "https://bu.dusays.com/2024/06/28/667e4cb4b7ccf.jpg",
      "link": "https://rinkaneko.top",
    },
    {
      "name": "余帆的小黑屋",
      "desc": "自称小白的计算机网络大佬",
      "avatar": "https://bu.dusays.com/2024/06/28/667e4cb474c69.jpg",
      "link": "https://yufande.top",
    },
    {
      "name": "MuJin’s Blog",
      "desc": "君浅吟，叹落笔",
      "avatar": "https://bu.dusays.com/2024/06/28/667e4cb4a99ba.png",
      "link": "https://xiabor.com",
    },
    {
      "name": "凌莞喵",
      "desc": "嗨这里是凌莞 / Clansty",
      "avatar": "https://bu.dusays.com/2024/06/28/667e4cb4b91c5.webp",
      "link": "https://clansty.com/",
    },
    {
      "name": "异次元の机智君",
      "desc": "初学Next.js时跟着大佬的网站学到了许多~",
      "avatar": "https://bu.dusays.com/2024/06/28/667e4cb479de5.png",
      "link": "https://www.anzifan.com/",
    },
    {
      "name": "DIYgod",
      "desc": "写代码是热爱，写到世界充满爱！",
      "avatar": "https://bu.dusays.com/2024/06/28/667e4cb48a25c.png",
      "link": "https://diygod.cc/",
    },
    {
      "name": "静かな森",
      "desc": "致虚极，守静笃。",
      "avatar": "https://bu.dusays.com/2024/06/28/667e4cb4bb2d6.png",
      "link": "https://innei.in/",
    },
    {
      "name": "长街短梦",
      "desc": "用笨拙的文字写最真实的故事",
      "avatar": "https://bu.dusays.com/2024/06/28/667e4cb4aed7b.png",
      "link": "https://wangyunzi.com",
    }
  ]
})
