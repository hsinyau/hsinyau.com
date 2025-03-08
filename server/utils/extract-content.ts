export function extractContent(node: any | null): string {
  if (!node)
    return ''

  // 处理字符串节点
  if (typeof node === 'string')
    return node

  // 处理数组节点
  if (Array.isArray(node)) {
    // 如果是顶层数组，需要特殊处理 value 属性
    if (node.length === 2 && typeof node[0] === 'object' && 'type' in node[0] && node[0].type === 'minimal') {
      return extractContent(node[1])
    }

    // 处理 HTML 元素格式 [tagName, props, content]
    if (node.length >= 2 && typeof node[0] === 'string') {
      const [tag, props, ...children] = node

      // 忽略 style 标签
      if (tag === 'style')
        return ''

      // 处理 img 标签
      if (tag === 'img') {
        return `<img src="https://file.hsinyau.com${props.src}" alt="${props.alt}">`
      }

      // 处理其他标签
      let attributes = ''
      if (props && typeof props === 'object' && tag !== 'pre' && tag !== 'code') {
        attributes = Object.entries(props)
          .filter(([key]) => !['style'].includes(key))
          .map(([key, value]) => ` ${key}="${value}"`)
          .join('')
      }

      const content = children.map(child => extractContent(child)).join('')

      // 对于自闭合标签特殊处理
      if (['img', 'br', 'hr'].includes(tag)) {
        return `<${tag}${attributes}>`
      }

      return `<${tag}${attributes}>${content}</${tag}>\n`
    }

    return node.map(extractContent).join('')
  }

  // 处理对象节点
  if (typeof node === 'object' && node !== null) {
    // 处理顶层 minimal 对象
    if ('type' in node && node.type === 'minimal' && Array.isArray(node.value)) {
      return extractContent(node.value)
    }

    // 处理子节点
    if (Array.isArray(node.children)) {
      return extractContent(node.children)
    }
  }

  return ''
}
