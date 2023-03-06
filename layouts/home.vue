<template>
	<div layout="home">
		<Logo />
		<slot />
	</div>
</template>

<script setup>
	import Logo from '@/assets/images/rm.svg?component'
</script>

<style lang="scss">
	[layout="home"] {
		@apply flex flex-col justify-center items-center gap-4 w-full;

		& > svg {
			@apply w-40 h-auto;
		}
	}
</style>