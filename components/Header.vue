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
				width: 5em;
				height: auto;
				aspect-ratio: 1;
			}
		}

	}
</style>