export default () => ({
  api: () => `${global.hostApi}/api/wp-json/`,
  proxy: () => `${global.proxyUrl}/`
})
