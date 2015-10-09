export default () => ({
  api: () => `${global.hostApi}/wp-json/`,
  proxy: () => `${global.proxyUrl}/`
})
