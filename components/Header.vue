<template>
	<header>

		<NuxtLink :to="'/'">
			<Logo />
		</NuxtLink>

		<nav>

			<NuxtLink class="underlined-link" to="/character">
				List all characters
			</NuxtLink>

			<!-- <NuxtLink :to="'episode'">
				List all episodes
			</NuxtLink> -->

		</nav>

	</header>
</template>

<script setup lang="ts">
	import Logo from '@/assets/images/rm.svg?component'
</script>

<style lang="scss">
	@tailwind components;
	@layer components {

		header {
			@apply flex justify-between items-center;
			@apply py-8;

			svg {
				@apply w-20 h-auto overflow-visible;
				@apply transition-colors duration-150 ease-out;

				&:hover {
					@apply text-cerulean-500;
				}
			}
		}

	}
</style>