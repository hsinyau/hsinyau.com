---
title: MDX 自定义标签组件测试
tag: 随心记
created: 2022-11-19 22:11:02
summary: This post is originated from https://gist.github.com/apackeer/4159268 and is used for testing markdown style. This post contains nearly every markdown usage. Make sure all the markdown elements below show up correctly.
cover: https://t.mwm.moe/pc/
---

## 书签

<BookMark
  title="全球航拍爱好者和专业摄影师的作品社区 | 天空之城"
  src="https://www.skypixel.com/"
  cover="https://sp-webfront.skypixel.com/logo-share.png"
  icon="https://spcn-webfront.skypixel.com/skypixel/public/favicon.ico"
  desc="世界各地的航拍摄影师、拍手叫绝的航拍作品与独具价值的航拍攻略。全世界的探索者们互相启发，乐在其中。现在加入天空之城，换个角度看世界！"
/>

## 带链接的引用

<Quote
  content="听这首歌已经三年了，时间过的真快啊，现在听着这歌仿佛又回到了三年前。傍晚在河提上欣赏夕阳落在波光粼粼的河面上，迎着不大不小的晚风。心里住着那个属于自己的美好。"
  title="网易云音乐 上 Candy_Wind 的歌曲《夏日、教室与望着窗外的我》"
  subtitle="Candy_Wind | music.163.com↗"
  src="https://music.163.com/#/song?id=572070670"
  cover="https://p2.music.126.net/rh6YzPcA10lV9N8NAXOtCw==/109951163340050206.jpg?param=130y130"
/>

## 警示框

<Alert content="今天下雨了，我去你公司接你下班。看见我你不耐烦的说“烦不烦啊，不要再找我了”，一头冲进雨里就跑开了。我心里真高兴啊，你宁愿自己淋雨，都不愿让我也淋湿一点，你果然还是爱我的。" />

<Alert content="我一直在舔一个女神，天天找她聊天，但是她总对我爱答不理的，后来我找她的次数便少了，有一天，她突然找我，问我为什么不舔她了，我说，老子消息太多回不过来了，舔一个我是舔狗，舔一群我就是海王钓鱼。" type="warning" />

<Alert content="时隔30个小时，你终于发了信息给我，你说“宝贝，我想你了。”，我很开心，我终于以为我的舔狗日子到了，可没想到信息发出来两秒都没有，你就撤回了，你说发错了，当我说准备要回没关系的时候，我看见了红色的感叹号。" type="tip" />

<Alert content="今天你破天荒的给我发了个早，我开心极了，难道这就是恋爱的感觉吗。我一看时间，十二点整，你一醒来就在想我，我流下了激动的眼泪。又想到你到现在都没有吃饭，我给你发了两百块钱红包。你快速的领取了，却迟迟没有回我。我想你可能也沉浸感动当中吧，我给你发了句去吃点东西吧。回复我的却是一个红色感叹号，红色代表爱情，你一定是不好意思说出口，才用这么委婉的方式表达你对我的爱，我也爱你。
" type="danger" />

## 网易云音乐

<Meting
  src="https://music.163.com/#/song?id=1834309823"
/>

## Bilibili

<Bilibili
  src="//player.bilibili.com/player.html?aid=810872&bvid=BV1Js411o76u&cid=1176840&p=1&autoplay=0"
/>

## 聊天气泡

<Bubble>
  <BubbleItem
    avatar='https://ipfs.crossbell.io/ipfs/QmeJbYnBRPj1cVsiiqLkuACNXM87tb93Ua1UYQYiZH4wfR'
    nickname='一位可疑的网友'
    message='暗恋一个人是什么感觉？'
    dir='l'
  />

  <BubbleItem
    avatar='https://ipfs.crossbell.io/ipfs/QmPNdAjdEpjaD1EqhkvpJxXKurp3e3Xc9QxfW1WdNeJHxz'
    nickname='白日梦制造商'
    message='大概是看到一个满格的WIFI信号，却不知道密码。'
    dir='r'
  />

  <BubbleItem
    avatar='https://ipfs.crossbell.io/ipfs/QmeJbYnBRPj1cVsiiqLkuACNXM87tb93Ua1UYQYiZH4wfR'
    nickname='一位可疑的网友'
    message="Ohh~"
    dir='l'
  />
</Bubble>

## 时间轴

<Timeline>
  <Timenode date='一天前' content='想了很久终于想通了，你说孩子不是我的。没关系的宝贝，我愿意跟着你孩子姓。' />
  <Timenode date='三天前' content='其实我每月工资6000，但我只给你转2000，你以为我给你了全部。才不是，我一共舔了3个啦，我要舔的雨露均沾，才不会把你当成唯一。' />
  <Timenode date='一周前' content='今天我鼓起勇气问她是喜欢狼狗还是喜欢奶狗，她说她喜欢狼狗，我问她觉得我是哪一种，她说我是土狗。' />
  <Timenode date='两周前' content='小时候抓周抓了个方向盘，爸妈都以为我长大了会当赛车手，最差也是个司机，没想到我长大了当了你的备胎。' />
  <Timenode date='三月前' content='我一直在舔一个女神，天天找她聊天，但是她总对我爱答不理的，后来我找她的次数便少了，有一天，她突然找我，问我为什么不舔她了，我说，老子消息太多回不过来了，舔一个我是舔狗，舔一群我就是海王钓鱼。' />
  <Timenode date='一年前' content='今天我还是日常给你发早安午安问你吃了没，你想吃什么，你说了句sb，我特别开心你回我一个字以上的消息了，sb一定是随便的意思吧，我喜欢的人就是这样不挑食，我感觉你更完美了，今天我也在非常喜欢你。' />
</Timeline>
