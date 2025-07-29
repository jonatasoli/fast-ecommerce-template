<script lang="ts">
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	import ProductCart from '$lib/components/ProductCard/ProductCart.svelte';

	import { _ } from 'svelte-i18n';

	export let data;

	$: latestProducts = data ? data.products.slice(0, 4) : [];

	$: latestCategories = data ? data.categories.slice(0, 3) : [];
</script>

<div class="flex flex-col justify-center items-center">
	<h1 class="text-primary-500 text-2xl lg:text-5xl font-light my-8 mt-8 mb-4 text-center uppercase">
		{$_('navigation.latest')}
	</h1>
</div>

<div class="flex justify-center items-center mb-12 sm:hidden">
	<Carousel height="h-80" images={data.showcase} />
</div>

<div class="flex justify-center items-center mb-12">
	<ProductCart {latestProducts} />
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
					class="feature-item__label bg-primary-500 text-white text-center text-lg leading-8 flex w-full max-w-xs items-center uppercase justify-center h-12 absolute left-1/2 transform -translate-x-1/2 top-0"
				>
					{category.name}
				</div>
			</div>
		</a>
	{/each}
</div>
