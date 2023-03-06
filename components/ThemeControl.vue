<template>
	<div id="theme-control">
		<button class="dark-false" @click="$colorMode.preference = 'light'">
			<Icon name="tabler:sun" />
		</button>
		<button class="dark-true" @click="$colorMode.preference = 'dark'">
			<Icon name="tabler:moon-stars" />
		</button>
	</div>
</template>

<style lang="scss">
	@tailwind components;
	@layer components {

		#theme-control {
			@apply flex;
			
			html.dark & .dark-true{
				@apply hidden;
			}
			
			html.light & .dark-false{
				@apply hidden;
			}

			svg {
				@apply w-8 h-auto;
			}

		}

	}
</style>