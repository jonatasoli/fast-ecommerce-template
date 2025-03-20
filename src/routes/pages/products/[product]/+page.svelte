<script lang="ts">
	import { goto } from '$app/navigation';
	import { cartStore } from '$lib/stores/cart';
	import type { CartItem, ResponseProduct } from '$lib/types';
	import { currencyFormat } from '$lib/utils';
	import { ChevronDown, ChevronRight } from 'svelte-heros-v2';
	import { _ } from 'svelte-i18n';

	export let data: ResponseProduct;

	let isExpandedComposition = false;
	let isExpandedUse = false;
	$: cart = cartStore();

	async function addToCart() {
		await cart.addToCart({
			image_path: data.product.image_path,
			name: data.product.name,
			price: Number(data.product.price),
			product_id: data.product.product_id,
			quantity: 1,
			discount_price: data.product.discount || 0,
			available_quantity: data.product.quantity
		});

		await goto('/pages/cart');
	}
</script>

<div class="md:hidden flex justify-center p-4 my-2">
	<div
		class="flex flex-col items-center justify-center p-10 space-y-4 max-w-auto mx-auto bg-white rounded-lg shadow-lg"
	>
		<img
			src={data.product.image_path}
			alt={data.product.name}
			class="w-full h-72 object-cover rounded-lg"
		/>

		<h1 class="text-lg sm:text-xl md:text-2xl font-semibold text-primary-500 text-center">
			{data.product.name}
		</h1>

		<p class="text-gray-600 text-center text-sm sm:text-base md:text-lg">
			{@html data.product.description.content}
		</p>

		<p class="text-md sm:text-lg md:text-xl font-semibold text-primary-500">
			{currencyFormat(Number(data.product.price))}
		</p>

		<button
			class="w-full py-2 px-4 bg-primary-500 text-white font-semibold rounded-md hover:bg-primary-dark transition-all duration-200 ease-in-out"
			on:click={addToCart}
		>
			{$_('cart.AddCart')}
		</button>

		<div class="w-full py-4">
			{#if data.product.description.content}
				<ul class="text-primary-500">
					<li class="border-b border-gray-200 py-2">
						<a
							href="#"
							class="hover:text-gray-200 flex justify-between"
							on:click|preventDefault={() => (isExpandedComposition = !isExpandedComposition)}
						>
							<h2 class="text-lg sm:text-xl font-semibold text-primary-500">
								{$_('productDetails.composition')}
							</h2>
							<span class="ml-2">
								{#if isExpandedComposition}
									<ChevronDown />
								{:else}
									<ChevronRight />
								{/if}
							</span>
						</a>

						<ul
							class={`ml-4 mt-2 transition-all duration-300 ease-in-out ${isExpandedComposition ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
						>
							<li class="py-2">
								<a href="#" class="hover:text-gray-200">{data.product.description.composition}</a>
							</li>
						</ul>
					</li>
				</ul>
			{/if}

			{#if data.product.description.how_to_use}
				<ul class="text-primary-500">
					<li class="py-2">
						<a
							href="#"
							class="hover:text-gray-200 flex justify-between"
							on:click|preventDefault={() => (isExpandedUse = !isExpandedUse)}
						>
							<h2 class="text-lg sm:text-xl font-semibold text-primary-500">
								{$_('productDetails.howToUse')}
							</h2>
							<span class="ml-2">
								{#if isExpandedUse}
									<ChevronDown />
								{:else}
									<ChevronRight />
								{/if}
							</span>
						</a>

						<ul
							class={`ml-4 mt-2 transition-all duration-300 ease-in-out ${isExpandedUse ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
						>
							<li class="py-2">
								<a href="#" class="hover:text-gray-200">{data.product.description.how_to_use}</a>
							</li>
						</ul>
					</li>
				</ul>
			{/if}
		</div>
	</div>
</div>

<div class="hidden md:flex md:flex-col container mx-auto p-8 my-16 pt-16">
	<div class="hidden md:flex md:items-start md:justify-between">
		<img
			src={data.product.image_path}
			alt={data.product.name}
			class="md:w-modal-slim h-96 object-cover rounded-lg"
		/>

		<div class="mt-4 md:mt-0 md:w-1/2 md:ml-8">
			<h1 class="text-2xl font-semibold text-primary-500">{data.product.name}</h1>

			<p class="text-lg font-semibold text-primary-500 mt-2">
				{currencyFormat(Number(data.product.price))}
			</p>

			<p class="text-sm text-gray-600 mt-2">
				em até 3x de {currencyFormat(Number(data.product.price) / 3)} sem juros
			</p>

			<p class="text-gray-600 mt-4">{@html data.product.description.content}</p>

			<button
				class="w-full py-2 px-4 bg-primary-500 text-white font-semibold rounded-md mt-4 hover:bg-primary-700 transition-all duration-200 ease-in-out"
				on:click={addToCart}
			>
				{$_('cart.AddCart')}
			</button>

			<div class="w-full py-4 mt-4">
				{#if data.product.description.composition}
					<ul class="text-primary-500">
						<li class="border-b border-gray-200 py-2">
							<a
								href="#"
								class="hover:text-gray-200 flex justify-between"
								on:click|preventDefault={() => (isExpandedComposition = !isExpandedComposition)}
							>
								<h2 class="text-xl font-semibold text-primary-500">
									{$_('productDetails.composition')}
								</h2>
								<span class="ml-2">
									{#if isExpandedComposition}
										<ChevronDown />
									{:else}
										<ChevronRight />
									{/if}
								</span>
							</a>

							<ul
								class={`ml-4 mt-2 transition-all duration-300 ease-in-out ${isExpandedComposition ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
							>
								<li class="py-2">
									<a href="#" class=" text-gray-600">{@html data.product.description.composition}</a
									>
								</li>
							</ul>
						</li>
					</ul>
				{/if}

				{#if data.product.description.how_to_use}
					<ul class="text-primary-500 mt-4">
						<li class="py-2">
							<a
								href="#"
								class="hover:text-gray-200 flex justify-between"
								on:click|preventDefault={() => (isExpandedUse = !isExpandedUse)}
							>
								<h2 class="text-xl font-semibold text-primary-500">
									{$_('productDetails.howToUse')}
								</h2>
								<span class="ml-2">
									{#if isExpandedUse}
										<ChevronDown />
									{:else}
										<ChevronRight />
									{/if}
								</span>
							</a>

							<ul
								class={`ml-4 mt-2 transition-all duration-300 ease-in-out ${isExpandedUse ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
							>
								<li class="py-2">
									<p class="text-gray-600">{@html data.product.description.how_to_use}</p>
								</li>
							</ul>
						</li>
					</ul>
				{/if}
			</div>
		</div>
	</div>
</div>
