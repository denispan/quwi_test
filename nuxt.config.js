export default {
  head: {
    title: 'quwi-test',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  css: [],

  plugins: [],

  components: true,

  buildModules: [],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  axios: {
    baseURL:  'https://api.quwi.com/v2/'
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/init', method: 'get' }
        },
        tokenType: 'Bearer'
      },
      redirect: {
        login: '/login', // пользователь будет перенаправлен на эту страницу, если попытается получить доступ к защищенной странице и он не аутентифицирован
        logout: '/', // куда перенаправлять после выхода
        callback: '/login',
        home: '/' // куда перенаправлять после успешного входа
      }
    }
  },

  build: {}
}
