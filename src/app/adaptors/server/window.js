import env from 'app/adaptors/server/env';

export default {
  location: {
    href: '',
    protocol: '',
    hostname: '',
    port: ''
  },
  document: {
    body: {
      classList: {
        add: ()=>{},
        remove: ()=>{}
      }
    }
  },
  scrollTo: ()=>{},
  history: {
    pushState: ()=>{},
    replaceState: ()=>{}
  },
  navigator: {
    userAgent: {
      match: ()=>{}
    }
  },
  localStorage: {
    getItem: ()=>{},
    setItem: ()=>{}
  },
  env: env
}
