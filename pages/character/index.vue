<template>
	<main page="character-list" :class="{ loading, error }">

		<div class="filters">
			<input 
				v-model="qName" 
				placeholder="Search for characters in Rick and Morty"
			/>
		</div>

		<div class="list-bar" v-if="resultInfo">
			<div class="count">{{ resultInfo.count ?? 'No' }} results</div>
			<div class="pagination" v-if="resultInfo.pages > 0">
				<button @click="changePage(-1)" :disabled="qPage <= 1">
					<Icon name="material-symbols:arrow-back-rounded" />
				</button>
				<div class="pagination-info">{{ qPage }} of {{ resultInfo.pages }}</div>
				<button @click="changePage(+1)" :disabled="qPage >= resultInfo.pages">
					<Icon name="material-symbols:arrow-forward-rounded" />
				</button>
			</div>
		</div>

		<div class="result">

			<template v-if="loading">
				<div class="loading">
					<Icon name="eos-icons:bubble-loading" />
				</div>
			</template>
			
			<template v-else-if="error">
				<div class="error">
					Seems like something went wrong!
					<button class="underlined-link" @click="$router.go(0)">Try again</button>
				</div>
			</template>
			
			<template v-else-if="characters && characters.length === 0">
				<div class="no-result">no result for query</div>
			</template>
			
			<template v-else>
				<div class="item-row">
					<template v-for="item in characters" :key="item.name">
						<NuxtLink :to="`/character/${item.id}`">
							<div class="item-card" :type="(item as any).__typename">
								<div class="item-image">
									<img :src="item.image" />
								</div>
								<div class="item-info">
									<div class="name">{{ item.name }}</div>
									<div class="origin" v-if="item.origin?.name">{{ item.origin.name }}</div>
								</div>
							</div>
						</NuxtLink>
					</template>
				</div>
			</template>

		</div>

		<!-- <pre>{{ JSON.stringify({ resultInfo, characters }, null, 2) }}</pre> -->

	</main>
</template>

<script lang="ts" setup>
	import { Character } from 'rickmortyapi';
	import { QueryResponse, ResultInfo } from '@/graphql/response/types';

	definePageMeta({
		layout: 'list'
	});

	const route = useRoute(),
				router = useRouter();

	type QueryParameters = {
		name: string;
		page: number;
	}

	const qName = ref( String(route.query.name ?? '') ),
				qPage = ref( Number(route.query.page ?? 1) ),
				urlParams = ref<QueryParameters>({
					name: qName.value,
					page: qPage.value
				});

	const resultInfo = ref<ResultInfo | null>(null),
				characters = ref<Character[] | null>(null);

	const query = gql`
		query ($name: String, $page: Int = 1) {
  		characters (filter: { name: $name }, page: $page) {
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
					origin {
						id
						name
						dimension
					}
				}
			}
		}
	`;

	// const { data, pending, error, refresh } = await useAsyncQuery<QueryResponse>(query, queryVariables);
	const { result, variables, loading, error, refetch } = await useQuery<QueryResponse>(
		query, 
		urlParams, 
		{ debounce: 500 }
	);

	watch([qName, qPage], ([newName, newPage], [oldName, oldPage]) => {

		if (newName !== oldName) qPage.value = 1; 

		urlParams.value = { 
			name: newName, 
			page: newPage
		}

		loading.value = true;

		router.push({ 
			query: {
				...route.params,
				...urlParams.value
			} 
		});

	});

	watch([result, loading, error], () => {

		if (error.value || loading.value) {
			characters.value = null;
		} else {
			characters.value = result.value?.characters?.results ?? null;
			if (result.value && result.value.characters?.info) 
				resultInfo.value = result.value.characters.info;
		}

	}, { immediate: true });

	const changePage = (offset: number) => {

		let page = variables.value?.page ?? 1,
				newPage = page + offset,
				min = 1,
				max = result.value?.characters?.info?.pages;

		if (newPage < min) newPage = min;
		if (max && newPage > max) newPage = max;

		qPage.value = newPage;

	}
</script>

<style lang="scss">
	@tailwind components;
	@layer components {

		[page="character-list"] {
			@apply flex flex-col justify-start items-stretch gap-4;

			.filters {
				input {
					@apply relative w-full h-12 px-4;
					@apply border-2 border-solid border-cerulean-500 rounded-full outline-none;
					@apply text-neutral-800 bg-neutral-50;
					@apply transition-colors duration-150 ease-out;

					&:focus {
						@apply border-lime-400;
					}	
				}
			}

			.list-bar {
				@apply flex flex-wrap justify-between items-center gap-4;
				
				.pagination {
					@apply flex justify-start items-center gap-4;
					
					button {
						@apply grid place-items-center;
						@apply aspect-square p-2 border-2 border-cerulean-500 rounded-full;
						@apply transition-colors duration-150 ease-out;
						
						&:disabled {
							@apply opacity-50 border-neutral-600 text-neutral-600 pointer-events-none;
						}
						
						&:hover {
							@apply bg-cerulean-500 text-white;
						}
					}
				}
			}

			.result {
				.loading {
					@apply grid place-items-center py-4;

					svg {
						@apply w-16 h-auto aspect-square;
					}
				}

				.error {
					@apply grid place-items-center py-4;
				}

				.item-row {
					@apply grid grid-cols-12 auto-rows-auto gap-4;

					& > a {
						@apply contents;
					}

					.item-card {
						@apply col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 2xl:col-span-2;
						@apply h-full flex flex-col justify-start items-stretch;
						@apply border-2 border-lime-700 rounded-md;
						@apply overflow-hidden;
						@apply transition-colors duration-150 ease-out;
						
						.item-image {
							@apply w-full h-auto aspect-square;
							@apply relative rounded-t-md;
							@apply border-b-2 border-inherit;

							& > img {
								@apply absolute top-0 left-0 w-full h-full object-cover;
							}
						}
						
						.item-info {
							@apply h-full flex flex-col justify-start items-start p-4;
							@apply transition-colors duration-150 ease-out;

							.name {
								@apply text-xl font-bold;
							}

							.origin {
								@apply text-xs;
							}

							& > a {
								@apply mt-auto;
							}
						}

						&:hover {
							@apply border-cerulean-500;

							.item-info {
								@apply bg-cerulean-500 text-neutral-50;
							}
						}
					}
				}
			}
		}
	}
</style>