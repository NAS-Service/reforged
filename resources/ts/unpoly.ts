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
