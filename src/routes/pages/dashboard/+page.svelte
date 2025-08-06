<script lang="ts">
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	import CategoriesCard from '$lib/components/CategoriesCard/CategoriesCard.svelte';
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
	<CategoriesCard {latestCategories} />
</div>
