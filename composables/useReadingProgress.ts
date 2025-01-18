export function useReadingProgress(selector: string = '.article-content') {
  const progress = ref(0)
  const { y: scrollY } = useWindowScroll()
  const { height: windowHeight } = useWindowSize()

  useEventListener(document, 'scroll', () => {
    const content = document.querySelector(selector)
    if (!content)
      return

    const scrollTop = scrollY.value - (content as HTMLElement).offsetTop
    const docHeight = content.scrollHeight

    // 确保进度在 0-100 之间
    progress.value = Math.min(100, Math.max(0, Math.round((scrollTop / (docHeight - windowHeight.value)) * 100)))
  })

  return {
    progress,
  }
}
