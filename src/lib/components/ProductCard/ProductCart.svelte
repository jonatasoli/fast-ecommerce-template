<script lang="ts">
	import { goto } from '$app/navigation';
	import { currencyFormat } from '$lib/utils';
	import { _ } from 'svelte-i18n';
	import { cartStore } from '$lib/stores/cart';
	import type { CartItem } from '$lib/types';

	export let latestProducts;
	export let columns = 'xl:grid-cols-4';

	$: cart = cartStore();

	async function handleAddToCart(product: CartItem) {
		if (!product) {
			return;
		}

		await cart.addToCart({
			image_path: product.image_path,
			name: product.name,
			price: product.price,
			product_id: product.product_id,
			quantity: 1,
			discount_price: product.discount_price || 0,
			available_quantity: product.quantity
		});

		await goto('/pages/cart');
	}
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 {columns} gap-8 p-4">
	{#each latestProducts as product}
		<div
			class=" flex flex-col rounded-3xl border border-primary-500 overflow-hidden shadow-lg lg:w-64"
		>
			<a href={`/pages/products/${product.product_id}`}>
				<div class="relative w-full h-0 pb-[76.03%] overflow-hidden">
					<img
						class="absolute top-0 left-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
						src={product.image_path}
						alt={product.name}
					/>
				</div>

				<div class="product-item__content p-3 pb-4 flex-1">
					<div
						class="name font-medium text-base leading-5 min-h-[2.5rem] mb-1 hover:text-primaryHover"
					>
						{#if product.name.length > 35}
							{product.name.slice(0, 35)}...
						{:else}
							{product.name}
						{/if}
					</div>

					<div class="container-price flex flex-col gap-2 mt-6">
						<p class="price text-primary-500 font-semibold text-xl m-0">
							{currencyFormat(product.price)}
						</p>
					</div>
				</div>
			</a>
			{#if product.quantity}
				<button
					on:click={() => handleAddToCart(product)}
					class="w-full inline-flex justify-center items-center text-white bg-primary-500 cursor-pointer text-xl py-4 transition-all duration-300 hover:bg-opacity-80"
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
