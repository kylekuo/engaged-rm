<template>
	<main id="character-item">
		<div v-if="pending">loading</div>
		<h1>{{ $route.params.id }}</h1>
		<h2>{{ data?.character?.name }}</h2>
		<pre>{{ JSON.stringify(data?.character, null, 2) }}</pre>
	</main>
</template>

<script lang="ts" setup>
	import { QueryResponse } from '@/graphql/response/types';
	import { CharacterFields } from "@/graphql/fragments/Character";

	const route = useRoute();

	const query = gql`
		${ CharacterFields }
		query {
			character (id: ${ route.params.id }) {
				...CharacterFields
			}
		}
	`;

	const { pending, data } = await useLazyAsyncQuery<QueryResponse>(query);
</script>