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
  },
})
