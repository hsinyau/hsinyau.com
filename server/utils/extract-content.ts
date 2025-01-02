import type { MarkdownNode, MarkdownRoot } from '@nuxt/content'

export function extractContent(node: MarkdownRoot | MarkdownNode | MarkdownNode[] | null): string {
  if (!node)
    return ''
  if (typeof node === 'string') {
    return node
  }
  if (Array.isArray(node)) {
    return node.map(extractContent).join('')
  }
  if (typeof node === 'object' && node !== null) {
    if (node.type === 'text' && typeof node.value === 'string') {
      return node.value
    }
    if ('tag' in node && typeof node.tag === 'string') {
      // Ignore style tags
      if (node.tag === 'style') {
        return ''
      }

      if (node.tag === 'img') {
        return `<img src="https://file.hsinyau.com${node.props?.src}" alt="${node.props?.alt}" />`
      }

      let attributes = ''
      if (node.props && node.tag !== 'pre' && node.tag !== 'code') {
        attributes = Object.entries(node.props)
          .filter(([key]) => !['style'].includes(key))
          .map(([key, value]) => `${key}="${value}"`)
          .join(' ')

        if (attributes) {
          attributes = ` ${attributes}`
        }
      }

      const content = Array.isArray(node.children)
        ? extractContent(node.children)
        : ''

      return `<${node.tag}${attributes}>${content}</${node.tag}>`
    }
    if (Array.isArray(node.children)) {
      return extractContent(node.children)
    }
  }
  return ''
}
