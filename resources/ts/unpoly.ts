import 'unpoly'
import 'unpoly/unpoly.css'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const unpoly = up as any

unpoly.fragment.config.mainTargets.push('[layout-main]')

unpoly.link.config.preloadSelectors.push('a[href]')
unpoly.link.config.followSelectors.push('a[href]')
unpoly.link.config.noFollowSelectors.push('a[data-unfollow]')

unpoly.form.config.submitSelectors.push(['form'])

unpoly.on('up:fragment:loaded', (event) => {
  if (event.response.getHeader('X-Full-Reload')) {
    // Prevent the fragment update and don't update browser history
    event.preventDefault()

    // Make a full page load for the same request.
    event.request.loadPage()
  }
})

unpoly.on('up:fragment:loaded', (event) => {
  if (event.response.getHeader('X-Full-Reload')) {
    event.preventDefault()
    event.request.loadPage()
  }
})
