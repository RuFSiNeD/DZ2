// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    css: [
        '~/assets/styles/main.scss'
    ],
    modules: ['@nuxt/ui'],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/styles/variables.scss";\n' +
                        '@import "tailwindcss";\n' +
                        '@import "@nuxt/ui";',
                }
            }
        }
    }
})
