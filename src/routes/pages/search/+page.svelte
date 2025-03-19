<script lang="ts">
	import Pagination from '$lib/components/Pagination/Pagination.svelte';
	import ProductCart from '$lib/components/ProductCard/ProductCart.svelte';
	import { searchQuery } from '$lib/stores/search';
	import { _ } from 'svelte-i18n';

	export let data;

	$: latestProducts = data ? data.products : [];

	$: currentPage = data ? data.page : 1;
	$: totalPages = data ? data.total_pages : 1;

	function handlePageChange() {
		console.log(`Navegando para a página ${currentPage}`);
	}
</script>

<div class="flex flex-col justify-start items-center text-center mb-12 mt-8">
	<h1 class="text-lg sm:text-3xl font-semibold text-primary-500">Resultados para : {$searchQuery}</h1>
	<ProductCart {latestProducts} columns="md:grid-cols-3" />

	<Pagination {currentPage} {totalPages} onPageChange={handlePageChange} />
</div>
