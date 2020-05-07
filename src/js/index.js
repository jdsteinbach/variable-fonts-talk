import { initialize } from 'reveal.js'
import { initHighlightingOnLoad } from 'highlight.js'

initialize({
  controls: true,
  progress: true,
  history: true,
  center: true,
  width: 1600,
  height: 1200,
  transition: 'fade'
})


initHighlightingOnLoad()

document.querySelectorAll('a[href]').forEach(a => {
  if (a.hostname.match(window.location.hostname) === null) {
    a.setAttribute('rel', 'noopener')
    a.setAttribute('target', '_blank')
  }
})
