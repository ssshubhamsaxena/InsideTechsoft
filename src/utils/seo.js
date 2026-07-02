export function applySeo({ title, description }) {
  document.title = title

  const ensureMeta = (name, content) => {
    let tag = document.querySelector(`meta[name="${name}"]`)
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', name)
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', content)
  }

  const ensureProperty = (property, content) => {
    let tag = document.querySelector(`meta[property="${property}"]`)
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('property', property)
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', content)
  }

  ensureMeta('description', description)
  ensureProperty('og:title', title)
  ensureProperty('og:description', description)
  ensureProperty('og:type', 'website')
}
