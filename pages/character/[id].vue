<template>
	<main page="character-item" :class="{ pending, error: !character }">

		<template v-if="pending">
			<div class="loading">
				<Icon name="eos-icons:bubble-loading" />
			</div>
		</template>

		<template v-else-if="error || !character">
			<div class="error">
				Seems like something went wrong!
				<button class="underlined-link" @click="$router.go(0)">Try again</button>
			</div>
		</template>

		<template v-else>

			<aside>
				<img :src="character.image" :alt="character.name" />
				<h1>{{ character.name }}</h1>
			</aside>

			<article id="properties">

				<ul id="listed-properties">
					<li v-for="([label, values], index) in Object.entries(listedProperties)"
						:key="label"
						:property="label"
						:length="values.length"
					>

						<div class="label">{{ label }}</div>
						<div class="values">
							<template v-for="value in values">

								<template v-if="typeof value === 'string'">

									<div class="value">{{ value }}</div>

								</template>

								<template v-if="typeof value === 'object'">

									<template v-if="value.__typename === 'Location'">

										<div type="Location" class="value">
											<span subproperty="name">
												<span class="label">name</span>
												<span class="value">{{ value.name }}</span>
											</span>
											<span subproperty="dimension" v-if="value.dimension">
												<span class="label">dimension</span>
												<span class="value">{{ value.dimension }}</span>
											</span>
											<span subproperty="type" v-if="value.type">
												<span class="label">type</span>
												<span class="value">{{ value.type }}</span>
											</span>
										</div>

									</template>

									<template v-if="value.__typename === 'Episode'">

										<div type="Episode" class="value">
											<span subproperty="name">
												<span class="label">name</span>
												<span class="value">{{ value.name }}</span>
											</span>
											<span subproperty="episode">
												<span class="label">episode</span>
												<span class="value">{{ value.episode }}</span>
											</span>
										</div>

									</template>

								</template>

							</template>
						</div>
						
					</li>
				</ul>

				<div id="created">Created in {{ createdDate }}</div>

			</article>
			
		</template>

	</main>
</template>

<script lang="ts" setup>
	import { Character } from 'rickmortyapi';
	import { QueryResponse } from '@/graphql/response/types';
	import { CharacterFields } from "@/graphql/fragments/Character";

	definePageMeta({
		layout: 'item'
	});

	const route = useRoute(),
				character = ref<Character | null>(null),
				listedProperties = ref<{ [key: string]: [{ [key: string]: string }] }>({}),
				createdDate = ref<string | null>(null);

	const query = gql`
		${ CharacterFields }
		query {
			character (id: ${ route.params.id }) {
				...CharacterFields
			}
		}
	`;

	const { pending, data, error } = await useLazyAsyncQuery<QueryResponse>(query);
	
	watch(data, (newValue, oldValue) => {
		
		if (!newValue) {
			character.value = null;
			return;
		}

		character.value = newValue.character ?? null;
		if (character.value && character.value.created) {
			let date = new Date( Date.parse(character.value.created) );
			createdDate.value = date.toLocaleDateString('en-US', {
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			})
		}

	}, { immediate: true });

	watch(character, () => {

		if (!character.value) return;

		const filteredStringProperties = [
			'__typename',
			'id',
			'created',
			'image',
		];

		listedProperties.value = Object.entries(character.value)
			.reduce((acc: any, [key, value]) => {

				if (filteredStringProperties.includes(key) || !value) return acc;

				switch ( runtimeTypeCheck(value) ) {

					case 'string':
					case 'object':
						acc[key] = [value];
						break;

					case 'array':
						acc[key] = value;
						break;

				}

				return acc;

			}, {});

	}, { immediate: true });

</script>

<style lang="scss">
	@tailwind components;
	@layer components {

		[page="character-item"] {
			@apply flex flex-col justify-start items-start gap-8;
			@apply md:flex-row;

			.loading {
				@apply grid place-items-center w-full py-4;

				svg {
					@apply w-16 h-auto aspect-square;
				}
			}

			.error {
				@apply grid place-items-center w-full py-4;
			}
			
			aside {
				@apply flex flex-col justify-start items-start gap-2;
				@apply w-full md:w-48 lg:w-72 md:flex-none;
				@apply md:sticky md:top-8;
				
				img {
					@apply border-2 border-lime-700 rounded-md;
				}
				
				h1 {
					@apply text-xl font-bold;
				}
			}
			
			article {
				@apply md:flex-1;
				@apply w-full;
				@apply flex flex-col justify-start items-stretch gap-4;

				#listed-properties {
					@apply flex flex-col justify-start items-stretch;

					.label {
						@apply uppercase text-xs;
					}
					
					& > [property] {
						@apply flex flex-row justify-start items-baseline gap-2;
						@apply py-4;
						@apply border-b-2 border-lime-700;

						&:first-child {
							@apply pt-0;
						}

						& > .label {
							@apply w-16 sm:w-36;
							@apply sticky top-8;
							@apply text-lime-700;
						}
						
						&[length="1"] > .label {
							@apply static;
						}
						
						& > .values {
							@apply flex-1 flex flex-col justify-start items-stretch;
							
							& > .value {
								@apply flex flex-col justify-start items-start gap-1;

								[subproperty] {
									@apply flex justify-start items-baseline gap-2;

									.label {
										@apply text-cerulean-600;

										&::after{
											content: ': ';
										}
									}
								}

								[subproperty="name"] .label {
									@apply hidden;
								}

								&:not(:first-child) {
									@apply pt-2;
								}

								&:not(:last-child) {
									@apply pb-2 border-b-2 border-lime-700;
								}
							}
						}
					}
				}

				#created {
					@apply text-xs text-right text-neutral-500;
				}
			}
		}
	}
</style>