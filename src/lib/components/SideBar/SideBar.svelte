<script lang="ts">
	import { goto } from '$app/navigation';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import { ChevronDown, ChevronRight, ChevronUp } from 'svelte-heros-v2';
	import { _ } from 'svelte-i18n';
	export let data;

	let isExpanded = false;
	const dispatch = createEventDispatcher();

	function closeModal() {
		dispatch('close');
	}

	function navigateTo(path: string) {
		isExpanded = false;
		closeModal();
		goto(path);
	}
</script>

<AppShell slotSidebarLeft="" class="w-64 sm:hidden">
	<nav
		class="list-nav p-4 transition-all duration-300 ease-in-out h-screen bg-primary-500 rounded-r-lg"
	>
		<ul class="text-white">
			<li class="border-b border-white/50 py-2">
				<a
					href="/pages/dashboard"
					class="hover:text-gray-200"
					on:click|preventDefault={() => navigateTo(`/pages/dashboard`)}>Homepage</a
				>
			</li>

			<li class="border-b border-white/50 py-2">
				<a
					href="#"
					class="hover:text-gray-200"
					on:click|preventDefault={() => (isExpanded = !isExpanded)}
				>
					{$_('navigation.categories')}

					<span class="ml-2">
						{#if isExpanded}
							<ChevronUp />
						{:else}
							<ChevronDown />
						{/if}
					</span>
				</a>

				{#if isExpanded}
					<ul class="ml-4 mt-2">
						{#each data.categories as category}
							<li class="py-2">
								<a
									href={`/pages/categories/${category.path}`}
									class="hover:text-gray-200"
									on:click|preventDefault={() => navigateTo(`/pages/categories/${category.path}`)}
									>{category.name}</a
								>
							</li>
						{/each}
					</ul>
				{/if}
			</li>
		</ul>
	</nav>
</AppShell>
