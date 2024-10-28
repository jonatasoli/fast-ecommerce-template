<script>
	import { currencyFormat } from '$lib/utils';
	import { _ } from 'svelte-i18n';
	export let data;

	$: latestProducts = data ? data.products.slice(0, 4) : [];

	$: latestCategories = data ? data.categories.slice(0, 3) : [];
</script>

<div class="flex flex-col justify-center items-center">
	<h1 class="text-primary text-2xl lg:text-5xl font-light my-8 mt-8 mb-4 text-center uppercase">
		{$_('navigation.latest')}
	</h1>
</div>

<div class="flex justify-center items-center mb-12">
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
		{#each latestProducts as product}
			<div
				class=" flex flex-col rounded-3xl border border-primary overflow-hidden shadow-lg lg:w-64"
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
						<p class="price text-primary font-semibold text-xl m-0">
							{currencyFormat(product.price)}
						</p>
					</div>
				</div>
				{#if product.quantity}
					<button
						class="product-item__buy w-full inline-flex justify-center items-center text-white bg-primary cursor-pointer text-xl py-4 transition-all duration-300 hover:bg-opacity-80"
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
<div class="sm:flex sm:flex-wrap justify-center">
	{#each latestCategories as category}
		<a
			href={`/pages/categories/${category.path}`}
			class=" relative pt-8 overflow-hidden w-full lg:w-96 sm:m-5"
		>
			<div class=" relative pt-8 overflow-hidden w-full lg:w-96 sm:m-5">
				<div class="feature-item__link overflow-hidden bg-white lg:h-56">
					<img
						src={category.image_path}
						alt={category.name}
						class="w-full h-full object-cover transition-transform duration-200 ease-in-out hover:scale-105"
					/>
				</div>
				<div
					class="feature-item__label bg-primary text-white text-center text-lg leading-8 flex w-full max-w-xs items-center uppercase justify-center h-12 absolute left-1/2 transform -translate-x-1/2 top-0"
				>
					{category.name}
				</div>
			</div>
		</a>
	{/each}
</div>
