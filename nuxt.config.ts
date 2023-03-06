import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
	modules: [
    '@nuxtjs/apollo',
    'nuxt-icon'
  ],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://rickandmortyapi.com/graphql'
      }
    },
  },
  app: {
    head: {
      title: 'Rick and Morty Character Explorer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Rick and Morty Character Explorer' }
      ],
      link: [{ rel: 'icon', href: '/favicon-rm.svg' }],
    },
  },
  css: [
    '~/assets/css/main.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
	typescript: {
		shim: false
	},
	vite: {
		plugins: [
      svgLoader()
    ]
	}
})
