export default {
    target: 'static',

    components: true,

    head: {
        title: 'Судоку',
        htmlAttrs: {
            lang: 'ru'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Игра судоку' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
            {
                rel: 'preload',
                href: '/fonts/Rubik-Regular.woff2',
                as: 'font',
                type: 'font/woff2',
                crossorigin: 'anonymous'
            }
        ]
    },

    css: ['@mdi/font/css/materialdesignicons.min.css', 'assets/css/rubik.fontface.css', 'assets/css/main.css'],

    buildModules: ['@nuxtjs/eslint-module']
}
