<script lang="ts">
	import { currencyFormat } from '$lib/utils';
	import { ChevronLeft, ChevronRight } from 'svelte-heros-v2';
	import { _ } from 'svelte-i18n';
	export let data;

	let currentPage = 1;

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
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
		{#each data.products as product}
			<div
				class="flex flex-col rounded-3xl border border-primary-500 overflow-hidden shadow-lg lg:w-64"
			>
				<a href={`/pages/products/${product.product_id}`}>
					<div class="relative w-full h-0 pb-[76.03%] overflow-hidden">
						<img
							class="absolute top-0 left-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
							src={product.image_path}
							alt={product.name}
						/>
					</div>
				</a>
				<div class="product-item__content p-3 pb-4 flex-1">
					<div class="name font-medium text-base leading-5 min-h-[2.5rem] mb-1">{product.name}</div>

					<div class="container-price flex flex-col gap-2 mt-6">
						<p class="price text-primary-500 font-semibold text-xl m-0">
							{currencyFormat(product.price)}
						</p>
					</div>
				</div>
				{#if product.quantity}
					<button
						class="product-item__buy w-full inline-flex justify-center items-center text-white bg-primary-500 cursor-pointer text-xl py-4 transition-all duration-300 hover:bg-opacity-80"
					>
						{$_('productItem.buy')}
					</button>
				{:else}
					<div class="flex justify-center items-center text-slate-400 text-xl py-4">
						<span>{$_('productItem.outOfStock')}</span>
					</div>
				{/if}
			</div>
		{/each}
	</div>
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
