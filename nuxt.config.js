export default {
    head: {
        title: 'sudoku',
        htmlAttrs: {
            lang: 'ru'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'preload',
                href: '/fonts/Rubik-Regular.woff2',
                as: 'font',
                type: 'font/woff2',
                crossorigin: 'anonymous'
            }
        ]
    },

    css: ['assets/css/rubik.fontface.css', 'assets/css/main.css'],

    plugins: [],

    components: true,

    buildModules: ['@nuxtjs/eslint-module'],

    modules: [],

    build: {}
}
