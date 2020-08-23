/* eslint-disable nuxt/no-cjs-in-config */
// export default {
//   /*
//    ** Nuxt rendering mode
//    ** See https://nuxtjs.org/api/configuration-mode
//    */
//   mode: 'universal',
//   /*
//    ** Nuxt target
//    ** See https://nuxtjs.org/api/configuration-target
//    */
//   target: 'server',
//   /*
//    ** Headers of the page
//    ** See https://nuxtjs.org/api/configuration-head
//    */
//   head: {
//     title: process.env.npm_package_name || '',
//     meta: [
//       { charset: 'utf-8' },
//       { name: 'viewport', content: 'width=device-width, initial-scale=1' },
//       {
//         hid: 'description',
//         name: 'description',
//         content: process.env.npm_package_description || '',
//       },
//     ],
//     link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
//   },
//   /*
//    ** Global CSS
//    */
//   css: [],
//   /*
//    ** Plugins to load before mounting the App
//    ** https://nuxtjs.org/guide/plugins
//    */
//   plugins: [],
//   /*
//    ** Auto import components
//    ** See https://nuxtjs.org/api/configuration-components
//    */
//   components: true,
//   /*
//    ** Nuxt.js dev-modules
//    */
//   buildModules: [
//     // Doc: https://github.com/nuxt-community/eslint-module
//     '@nuxtjs/eslint-module',
//   ],
//   /*
//    ** Nuxt.js modules
//    */
//   modules: [],
//   /*
//    ** Build configuration
//    ** See https://nuxtjs.org/api/configuration-build/
//    */
//   build: {},
// }
module.exports = {
  mode: 'spa',
  router: {
     base: '/nuxt-gh-pages/'
   },
  head: {
    title: process.env.npm_package_name || 'Animator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: 'Animator' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [
    '~/css/global.css'
  ],
  router: {
    linkActiveClass: 'selected'
  }
}
