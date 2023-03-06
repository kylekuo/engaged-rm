<template>
	<footer>

		<div id="author">
			Made by 
			<NuxtLink 
				to="https://kylekuo.dev/"
				target="_blank"
				class="underlined-link"
			>
				Kyle Kuo
			</NuxtLink>
		</div>
		
		<section id="credits">
			<div id="source">
				<NuxtLink 
					to="https://rickandmortyapi.com/"
					target="_blank"
					class="underlined-link" 
				>
					<h1>Rick and Morty API</h1>
				</NuxtLink>
			</div>
			<div id="stack">
				<NuxtLink to="https://nuxt.com/" target="_blank">
					<Icon name="vscode-icons:file-type-nuxt" />
				</NuxtLink>
				<NuxtLink to="https://vuejs.org/" target="_blank">
					<Icon name="vscode-icons:file-type-vue" />
				</NuxtLink>
				<NuxtLink to="https://www.apollographql.com/" target="_blank">
					<Icon name="simple-icons:apollographql" />
				</NuxtLink>
				<NuxtLink to="https://graphql.org/" target="_blank">
					<Icon name="vscode-icons:file-type-graphql" />
				</NuxtLink>
				<NuxtLink to="https://www.typescriptlang.org/" target="_blank">
					<Icon name="vscode-icons:file-type-typescript-official" />
				</NuxtLink>
			</div>
		</section>

	</footer>
</template>

<style lang="scss">
	@tailwind components;
	@layer components {

		footer {
			@apply flex flex-wrap justify-between items-start w-full py-8;
			
			#credits {
				@apply flex flex-col justify-start items-end gap-4;
				
				#stack {
					@apply flex justify-end items-baseline gap-2;

					svg {
						@apply w-8 h-auto;
					}
				}
			}

		}

	}
</style>