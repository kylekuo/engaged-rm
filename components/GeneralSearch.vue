<template>
	<div 
		id="general-search"
		:class="{ loading, error, enabled }"
	>

		<input v-model="term" type="text">

		<div id="suggestions">
			<NuxtLink
				v-for="sugg in characters"
				:key="sugg.id"
				:to="`/character/${sugg.id}`"
				class="suggestion-item"
			>
				<img class="image" :src="sugg.image" />
				<span class="id">{{ sugg.id }}</span>
				<span class="name">{{ sugg.name }}</span>
				<span class="type">{{ sugg.type }}</span>
			</NuxtLink>
			<pre>{{ JSON.stringify(characters, null, 2) }}</pre>
		</div>

	</div>
</template>

<script setup lang="ts">
import { Character } from 'rickmortyapi';


	const term = ref(''),
				enabled = ref(false),
				characters = ref<Character[]>([]);

	const suggestionsQuery = gql`
		query ($term: String) {
			characters (filter: { name: $term }) {
				info {
					count
					pages
					next
					prev
				}
				results {
					id
					name
					type
					image
				}
			}
		}
	`;

	const { result, loading, error, variables } = useQuery(suggestionsQuery, { term }, () => ({
		debounce: 500,
		enabled: enabled.value
	}));

	watch(term, (newValue, oldValue) => {
		enabled.value = (term.value !== '');
	});

	watch(result, (newValue, oldValue) => {
		if (!newValue) characters.value = [];
		characters.value = newValue.characters?.results ?? [];
	})

</script>

<style lang="scss">

</style>