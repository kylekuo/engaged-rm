<template>
	<main page="home">

		<GeneralSearch />

		<nav>

			<NuxtLink class="underlined-link" to="character">
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
			}
		}

	}
</style>