export default defineAppConfig({
  site: {
    title: '疏影横斜',
    description: '欲笺心事，独语斜阑。',
    domain: 'https://hsinyau.com',
    keywords: '疏影横斜,Hsinyau,个人网站,Personal website',
    avatar: '/img/avatar.jpg',
    author: 'Hsinyau',
    moeIcp: '萌ICP备20242023号',
    start_at: '2019'
  },
  social: [
    {
      text: 'Bilibili',
      link: 'https://space.bilibili.com/221029937',
      icon: 'https://icons.ly/bilibili',
      color: 'text-[#00aeec]',
    },
    {
      text: 'Netease',
      link: 'https://music.163.com/#/user/home?id=1352085491',
      icon: 'https://icons.ly/neteasecloudmusic',
      color: 'text-[#e60026]',
    },
    {
      text: 'Github',
      link: 'https://github.com/hsinyau',
      icon: 'https://icons.ly/github ',
      color: 'dark:invert',
    },
    {
      text: 'Telegram',
      link: 'https://t.me/hsinyau',
      icon: 'https://icons.ly/telegram',
      color: 'text-[#2c9ed8]',
    },
    {
      text: 'Instagram',
      link: 'https://www.instagram.com/hsinyau_zz/',
      icon: 'https://icons.ly/instagram',
      color: 'text-[#ff026a]',
    },
    {
      text: 'Email',
      link: 'mailto:hi@hsinyau.com',
      icon: 'https://icons.ly/maildotru',
      color: 'text-yau-primary',
    },
    {
      text: 'RSS',
      link: '/rss.xml',
      icon: 'https://icons.ly/rss',
      color: 'text-[#e84026]',
    },
  ],
  hero: ['前端小学生', '摄影爱好者', '旅行探索家'],
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
  ],
  projects: [
    {
      "order": 0,
      "name": "基于Next.js的个人网站",
      "description": "一个极简主义的个人网站，采用了 Next.js 框架和 UnoCSS 原子化 CSS 库。",
      "created": "2022-10-17T00:00:00.000Z",
      "tags": [
        "Next.js",
        "React",
        "Tailwindcss"
      ],
      "icon": "https://hsinyau.cc/favicon/favicon.png",
      "url": "https://hsinyau.cc",
      "color": "#ff7db2",
      "owner": "创建者",
      "status": "维护中",
    },
    {
      "order": 1,
      "name": "hexo-sitemap-generator",
      "description": "一个Hexo 博客框架的站点地图生成器插件。这个插件支持生成三种格式标准的站点地图文件: .xml、.txt 和 .html。",
      "created": "2022-06-12T00:00:00.000Z",
      "tags": [
        "Hexo",
        "JavaScript"
      ],
      "icon": "https://img.icons8.com/?size=80&id=VIfCzyJCfeDy&format=png",
      "url": "https://www.npmjs.com/package/hexo-sitemap-generator",
      "color": "#1a83cd",
      "owner": "创建者",
      "status": "已归档",
    }
  ],
  uses: [
    {
      "category": "生产力",
      "category_desc": "提升自己生产效率的硬件设备",
      "items": [
        {
          "title": "Lenovo Legion R7000P 2020H",
          "desc": "一款非常水桶的性能游戏本，在屏幕、散热、内存、硬盘和整机的设计上没有什么槽点，的确是非常出色的水桶机，而且在价格上8000元不到的价格也非常有竞争力。",
          "image": "https://bu.dusays.com/2024/06/28/667e5a95567a1.webp",
          "model": "16GB / 512G SSD",
          "link": "https://item.lenovo.com.cn/product/1013207.html",
        },
        {
          "title": "罗技 G304 LIGHTSPEED",
          "desc": "外观是我喜欢的风格，中正大方，简约优雅，没有任何多余的花里胡哨。没钱，任性不了。预算只够买这个鼠标。",
          "image": "https://bu.dusays.com/2024/06/28/667e5a953877b.webp",
          "model": "USB 无线",
          "link": "https://www.logitechg.com/zh-cn/products/gaming-mice/g304-lightspeed-wireless-gaming-mouse.910-005286.html",
        },
        {
          "title": "RK100",
          "desc": "三模，热拔插，100键，习惯87和104排列，这个键盘需要重新适应下。拥有数字小键盘，尺寸也还行。原价249，最后49拿下。",
          "image": "https://bu.dusays.com/2024/06/28/667e5a9576167.webp",
          "model": "USB、蓝牙、2.4G 三模",
          "link": "http://www.rkgaming.com/product/14/",
        },
        {
          "title": "创维 F24G3Q 显示器",
          "desc": "性价比之王。外观做工在同价位中算上游水平，整体调教也做得不差。据说现在百亿补贴599就可以拿下了。",
          "image": "https://bu.dusays.com/2024/06/28/667e5a953a093.webp",
          "model": "23.8英寸 / 165Hz",
          "link": "https://item.jd.com/100021861365.html",
        },
        {
          "title": "小米平板 5",
          "desc": "从硬件的角度来看，对比同价位平板，小米 Pad 几乎没有什么可挑剔的。软件略显拉跨，更新 MIUI14 后体现的尤为明显。",
          "image": "https://bu.dusays.com/2024/06/28/667e5a962868d.webp",
          "model": "6 + 256GB",
          "link": "https://www.mi.com/global/product/xiaomi-pad-5/",
        },
        {
          "title": "三星 980 固态硬盘",
          "desc": "买来做移动硬盘的，性能和温控表现都非常到位。不会因为等待移动硬盘唤醒而造成电脑卡顿。",
          "image": "https://bu.dusays.com/2024/10/21/6715ca56ea1b7.webp",
          "model": "1TB",
          "link": "https://www.samsung.com.cn/memory-storage/nvme-ssd/980-1tb-nvme-pcie-gen-3-mz-v8v1t0bw/",
        }
      ]
    },
    {
      "category": "出行装备",
      "category_desc": "出行可能会携带的物品",
      "items": [
        {
          "title": "NATIONAL GEOGRAPHIC 双肩包",
          "desc": "整体外型设计比较时尚好看，价格不到200元，质量很好，而且颜色选择款式非常多。日常有背负电脑的需求可以入手，实测15.6寸游戏本轻松放下。",
          "image": "https://bu.dusays.com/2024/06/28/667e5a9543a45.webp",
          "model": "浅紫色",
          "link": "https://npcitem.jd.hk/10079337647118.html#none",
        },
        {
          "title": "酷态科15号电能柱",
          "desc": "充的挺快的就是说，据说小米充的更快，还可以充笔记本电脑。大小重量都还行，出门随手带上也不影响出行。",
          "image": "https://bu.dusays.com/2024/06/28/667e5a9520036.webp",
          "model": "20000mAh / 73Wh",
          "link": "https://item.jd.com/100063803015.html",
        },
        {
          "title": "OPPO Enco W51 无线降噪耳机",
          "desc": "OPPO 产品里性价比最高的，估计就是 Enco W 系列耳机了。盖子有磁力，没办法单手开合。一个充电周期大概可以听上 20-24 小时，一周一充左右。",
          "image": "https://bu.dusays.com/2024/06/28/667e5a9554d3f.webp",
          "model": "白色",
          "link": "https://www.oppo.com/in/accessories/enco-w51/",
        },
        {
          "title": "Realme GT Neo 5",
          "desc": "充电挺快，续航能力貌似也还好，20分钟左右基本可以充满。再也不用担心出门的时候手机没电了。",
          "image": "https://bu.dusays.com/2024/06/28/667e5a95571fc.webp",
          "model": "圣境白 / 16 + 1TB / 150W",
          "link": "https://buy.realme.com/cn/goods/506",
        },
        {
          "title": "SONY A6400",
          "desc": "入门级微单，索尼半画幅微单中性能全面均衡的一款。",
          "image": "https://bu.dusays.com/2024/06/28/667e5a957fae7.webp",
          "model": "黑色",
          "link": "https://www.sonystyle.com.cn/products/ilc/ilce_6400/ilce_6400_feature.html",
        },
        {
          "title": "Huawei Band 8",
          "desc": "日常佩戴感觉真的很舒适，做到了他们宣传的轻若无物。充一次电45分钟，可以用上半个月。睡眠监测做的挺好。",
          "image": "https://bu.dusays.com/2024/06/28/667e5bb65c3c9.png",
          "model": "NFC版",
          "link": "https://consumer.huawei.com/cn/wearables/band8/",
        }
      ]
    }
  ]
})
