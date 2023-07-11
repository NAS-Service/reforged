import View from '@ioc:Adonis/Core/View'

View.global('httpParams', (request) => {
  return request.request._parsedUrl.query.split('&').reduce((acc, value) => {
    const [key, val] = value.split('=')
    return { ...acc, [key]: val }
  }, {})
})
