<script>
	import { AppShell } from '@skeletonlabs/skeleton';
	import { ChevronDown, ChevronRight, ChevronUp } from 'svelte-heros-v2';
	import { _ } from 'svelte-i18n';
	export let data;

	let isExpanded = false; // Estado que controla se o item está expandido
</script>

<AppShell slotSidebarLeft="" class="w-64 sm:hidden">
	<nav
		class="list-nav p-4 transition-all duration-300 ease-in-out h-screen bg-primary rounded-r-lg"
	>
		<ul class="text-white">
			<li class="border-b border-white/50 py-2">
				<a href="/" class="hover:text-gray-200">Homepage</a>
			</li>

			<li class="border-b border-white/50 py-2">
				<!-- Ao clicar, altera o estado de isExpanded -->
				<a
					href="#"
					class="hover:text-gray-200"
					on:click|preventDefault={() => (isExpanded = !isExpanded)}
				>
					{$_('navigation.categories')}
					<!-- Ícone de seta para indicar que o item pode ser expandido -->
					<span class="ml-2">
						{#if isExpanded}
							<ChevronUp /> <!-- Ícone de seta para cima (quando expandido) -->
						{:else}
							<ChevronDown /> <!-- Ícone de seta para baixo (quando colapsado) -->
						{/if}
					</span>
				</a>

				<!-- Mostra os subitens se isExpanded for verdadeiro -->
				{#if isExpanded}
					<ul class="ml-4 mt-2">
						{#each data.categories as category}
							<li class="py-2">
								<a href="#" class="hover:text-gray-200">{category.name}</a>
							</li>
						{/each}
					</ul>
				{/if}
			</li>
		</ul>
	</nav>
</AppShell>
