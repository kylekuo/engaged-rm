<template>
	<main page="home">

		<GeneralSearch />

		<nav>

			<NuxtLink :to="'character'">
				List all characters
			</NuxtLink>

			<!-- <NuxtLink :to="'episode'">
				List all episodes
			</NuxtLink> -->

		</nav>

	</main>
</template>

<script lang="ts" setup>
	definePageMeta({
		layout: 'home'
	});
</script>

<style lang="scss">
	@tailwind components;
	@layer components {

		[page="home"] {
			@apply w-full max-w-prose;

			#general-search {
				@apply w-full;
			}
			
			& > nav {
				@apply flex flex-wrap justify-center align-baseline gap-4 mt-4 mb-40;

				a {
					@apply underline decoration-2 underline-offset-2 decoration-lime-400 transition-colors ease-out duration-150;
					
					&:hover {
						@apply text-cerulean-500 decoration-transparent;
					}
				}
			}
		}

	}
</style>