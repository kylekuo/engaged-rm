import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
	modules: ['@nuxtjs/apollo'],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://rickandmortyapi.com/graphql'
      }
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
