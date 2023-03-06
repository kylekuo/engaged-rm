<template>
	<div 
		id="general-search"
		:class="{ 
			loading, 
			error, 
			enabled: enabled && characters.length > 0
		}"
	>

		<Icon v-if="loading" name="eos-icons:bubble-loading" />

		<input 
			type="text"
			placeholder="Search for Rick and Morty characters"
			v-model="term" 
			v-on:keyup.enter="handleEnter"
		>

		<div id="suggestions">
			<NuxtLink 
				v-if="term" 
				:to="`/character?name=${term}`"
				class="name-search"
			>
				Search for "{{ term }}"
			</NuxtLink>
			<NuxtLink
				v-for="sugg in characters"
				:key="sugg.id"
				:to="`/character/${sugg.id}`"
			>
				<div class="suggestion-item">
					<div class="si-thumb">
						<img class="thumb" :src="sugg.image" />
					</div>
					<div class="si-info">
						<span class="name">{{ sugg.name }}</span>
					</div>
				</div>
			</NuxtLink>
		</div>

	</div>
</template>

<script setup lang="ts">
	import { Character } from 'rickmortyapi';

	const router = useRouter();

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

	const handleEnter = () => {
		if (term.value) router.push({
			name: 'character',
			query: {
				name: term.value,
				page: 1
			}
		});
	}

</script>

<style lang="scss">
	@tailwind components;
	@layer components {
	
		#general-search {
			@apply relative;

			input {
				@apply relative w-full h-12 px-4;
				@apply border-2 border-solid border-cerulean-500 dark:border-cerulean-300 rounded-full outline-none;
				@apply text-inherit bg-transparent;
				@apply transition-colors duration-150 ease-out;
				@apply overflow-hidden z-10;

				&:focus {
					@apply border-lime-500 dark:border-lime-300;
				}

			}

			& > svg {
				@apply absolute top-1/2 right-4 -translate-y-1/2;
			}

			&.enabled:focus-within:not(.loading) {
				&::before {
					content: '';
					@apply absolute bottom-0 left-0 right-0;
					@apply h-6 border-x-2 border-lime-500 dark:border-lime-300;
				}
			}

			&.loading, 
			&:not(.enabled),
			&:not(:focus-within) {
				#suggestions {
					@apply hidden;
				}
			}

			#suggestions {
				@apply absolute top-full left-0 right-0;
				@apply flex flex-col justify-start items-stretch;
				@apply max-h-64 overflow-x-hidden overflow-y-auto;
				@apply pt-1 pb-2 border-x-2 border-b-2 border-lime-500 dark:border-lime-300 rounded-b-lg;
				@apply bg-stone-50 dark:bg-stone-900;
				@apply z-10;
				
				& > a {
					&:not(:last-child) {
						@apply border-b-2 border-inherit;
					}
				}

				.name-search {
					@apply px-4 py-2;

					&:hover {
						@apply bg-lime-200 dark:bg-lime-900;
					}
				}

				.suggestion-item {
					@apply flex justify-start items-center gap-4 px-4 py-2;
					
					&:hover {
						@apply bg-lime-200 dark:bg-lime-900;
					}

					img {
						@apply w-12 h-auto aspect-square;
						@apply border-2 border-lime-700 rounded-md;
						@apply object-fill object-center;
					}
				}
			}

		}

	}
</style>