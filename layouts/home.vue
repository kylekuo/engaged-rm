<template>
	<div layout="home">
		<Logo />
		<slot />
		<Footer />
	</div>
</template>

<script setup>
	import Logo from '@/assets/images/rm.svg?component'
</script>

<style lang="scss">
	[layout="home"] {
		@apply flex flex-col justify-center items-center gap-4 w-full h-full;

		& > svg {
			@apply w-40 h-auto;
		}

		& > svg,
		& > footer {
			@apply mt-auto;
		}
	}
</style>