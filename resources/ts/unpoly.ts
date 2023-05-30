import 'unpoly'
import 'unpoly/unpoly.css'

// @ts-ignore
const unpoly = up as any

unpoly.fragment.config.mainTargets.push('[layout-main]')

unpoly.link.config.preloadSelectors.push('a[href]')
unpoly.link.config.followSelectors.push('a[href]')

unpoly.form.config.submitSelectors.push(['form'])

unpoly.on('up:fragment:loaded', (event) => {
  if (event.response.getHeader('X-Full-Reload')) {
    event.preventDefault()
    event.request.loadPage()
  }
})