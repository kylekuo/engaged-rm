<template>
	<div layout="item" class="layout">
		<Header />
		<slot />
	</div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
	@tailwind components;
	@layer components {

		[layout="item"] {

		}

	}
</style>