<template>
	<main id="character-list">
		<h1>index</h1>

		<div
			v-for="char in data?.characters?.results"
			:key="char.name"
		>
			<pre style="color: red">{{ JSON.stringify(char, null, 2) }}</pre>
			<h1>{{ char.name }}</h1>
			<NuxtLink
				:to="`/character/${char.id}`"
			>
				ver mais
			</NuxtLink>
		</div>

		<pre>{{ JSON.stringify(data, null, 2) }}</pre>

	</main>
</template>

<script lang="ts" setup>
	import { QueryResponse } from '@/graphql/response/types'

	const query = gql`
		query {
			characters {
				info {
					count
					pages
					next
					prev
				}
				results {
					id
					name
				}
			}
		}
	`;

	const { data } = await useAsyncQuery<QueryResponse>(query);
</script>