
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /* server: {
    port: 31415,
    host: '192.168.0.193'
  }, */
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'normalize.css',
    '~/assets/fonts/index.styl'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-i18n'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    transpile: ['sun-calendar'],
    parallel: true,
    cache: true,
    hardSource: true
  },
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English'
      }, {
        code: 'ru',
        name: 'Русский'
      }
    ],
    vuex: {
      syncLocale: true
    },
    strategy: 'no_prefix',
    vueI18nLoader: true,
    seo: false
  }
}
