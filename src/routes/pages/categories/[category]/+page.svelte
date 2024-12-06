<script lang="ts">
	import ProductCart from '$lib/components/ProductCard/ProductCart.svelte';
	import { currencyFormat } from '$lib/utils';
	import { ChevronLeft, ChevronRight } from 'svelte-heros-v2';
	import { _ } from 'svelte-i18n';
	export let data;

	let currentPage = 1;
	$: latestProducts = data.products;

	function goToPreviousPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}

	function goToNextPage() {
		if (currentPage < data.total_pages) {
			currentPage++;
		}
	}

	function goToPage(page: number) {
		currentPage = page;
	}
</script>

<div class="flex flex-col justify-center items-center">
	<h1 class="text-primary-500 text-2xl lg:text-5xl font-light my-8 mt-8 mb-4 text-center uppercase">
		{data.path === 'lisos-e-selagem' ? 'lisos e selagem' : data.path}
	</h1>
</div>

<div class="flex justify-center items-center mb-12">
	<ProductCart {latestProducts} />
</div>

<div class="flex space-x-4 justify-end p-4">
	<!-- Botão Anterior -->
	<button
		class="flex items-center px-4 py-2 bg-white text-gray-300 disabled:text-gray-300 ease-linear font-semibold rounded-lg shadow-md hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 border border:bg-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed"
		on:click={goToPreviousPage}
		disabled={currentPage === 1}
	>
		<ChevronLeft size="20" class="text-black" />
	</button>

	<!-- Exibir a Página Atual -->
	{#each { length: data.total_pages } as _, index}
		<button
			class="flex items-center px-4 py-2 bg-white text-gray-300 ease-linear font-semibold rounded-lg shadow-md hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 border border-gray-300 disabled:text-black disabled:border-gray-300 disabled:cursor-not-allowed"
			on:click={() => goToPage(index + 1)}
			disabled={currentPage === index + 1}
		>
			{index + 1}
		</button>
	{/each}

	<!-- Botão Próximo -->
	<button
		class="flex items-center px-4 py-2 bg-white text-gray-300 disabled:text-gray-300 ease-linear font-semibold rounded-lg shadow-md hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 border border:bg-gray-300 disabled:cursor-not-allowed"
		on:click={goToNextPage}
		disabled={currentPage === data.total_pages}
	>
		<ChevronRight size="20" class="text-black" />
	</button>
</div>
