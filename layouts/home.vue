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
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1em;

		width: 100%;
		height: 100%;

		& > svg {
			width: 10em;
			height: auto;
			aspect-ratio: 1;
		}
	}
</style>