<script lang="ts">
	import { goto } from '$app/navigation';
	import { cartStore } from '$lib/stores/cart';
	import { hideLoading, showLoading } from '$lib/stores/loading';
	import type { Cart, CartItem } from '$lib/types';
	import { currencyFormat, currencyFormatFreight } from '$lib/utils';
	import { getToastStore, Toast } from '@skeletonlabs/skeleton';
	import { onDestroy } from 'svelte';
	import { Banknotes, Minus, Plus, ShoppingCart, Trash } from 'svelte-heros-v2';
	import { _ } from 'svelte-i18n';

	let coupon = '';
	let zipcode: string = '';
	let freight_product_code: string = 'PAC';
	const cart = cartStore();
	const freeText = $_('cart.free');
	const toastStore = getToastStore();
	function showToast(message: string) {
		const t = {
			message: `
				<div class="flex items-center space-x-2 text-gray-700">
					
					<span>${message}</span>
				</div>
			`,
			autohide: false,
			hideDismiss: true,
			classes: 'flex items-center bg-white shadow-sm'
		};

		toastStore.trigger(t);
	}

	let products: CartItem[] = [];

	$: products = $cart.cart_items;
	$: freight = $cart.freight;

	async function removeItem(product_id: number) {
		await cart.removeItem(product_id);
		await cart.refreshEstimate();
	}

	async function updateQuantity(item: CartItem, new_quantity: number) {
		showLoading();

		item.quantity = new_quantity;

		cart.updateQuantity(item.product_id, new_quantity);

		await cart.refreshEstimate();

		const res = await cart.refreshEstimate();

		if (!res) {
			coupon = '';
			cart.updateCoupon(coupon);
			showToast('Algo deu errado, tente novamente');
		}
		hideLoading();
	}

	async function estimate() {
		await cart.updateZipcode(zipcode, freight_product_code);
		const res = await cart.refreshEstimate();
		console.log(res);

		if (!res) {
			zipcode = '';
			cart.updateZipcode(zipcode, freight_product_code);
			showToast('Algo deu errado, tente novamente...');
		}
	}

	async function estimateCoupon() {
		cart.updateCoupon(coupon);
		await cart.refreshEstimate();

		const res = await cart.refreshEstimate();
		if (!res) {
			coupon = '';
			cart.updateCoupon(coupon);
			showToast('Algo deu errado, tente novamente...');
		}
	}

	function handleCheckout() {
		if (freight) {
			estimate(); // Chama a função de estimativa, se necessário
			goto('/pages/checkout'); // Redireciona para a página de checkout
		}
	}

	onDestroy(async () => {
		zipcode = '';
		coupon = '';
		cart.updateZipcode(zipcode, freight_product_code);
		cart.updateCoupon(coupon);

		await cart.refreshEstimate();
	});
</script>

{#if $cart.cart_items.length}
	<div class="grid grid-cols-1 p-4 gap-4 sm:grid-cols-2">
		<!-- cupom -->
		<div class="border border-gray-300 p-4 flex flex-col gap-2 rounded-lg">
			<div class="text-primary-500 flex items-center gap-2">
				<Banknotes size="35" />
				<h3 class="text-lg font-semibold text-primary-500">Cupom de desconto</h3>
			</div>

			<div class="flex items-center gap-4 my-7">
				<input
					type="text"
					placeholder="Cupom de desconto"
					bind:value={coupon}
					class="w-full border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-0 focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 focus:ring-primary-500 transition duration-200 ease-in-out"
				/>

				<button
					class="py-2 px-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-400 transition-all duration-200 ease-in-out"
					on:click={estimateCoupon}>Adicionar</button
				>
			</div>
		</div>

		<!-- cep -->
		<div class="border border-gray-300 p-4 flex flex-col gap-2 rounded-lg">
			<div class="text-primary-500 flex items-center gap-2">
				<ShoppingCart size="50" />
				<h3 class="text-lg font-semibold text-primary-500">
					Insira seu CEP para calcular o frete e o prazo de entrega
				</h3>
			</div>

			<div class="flex items-center gap-4 my-7">
				<input
					type="text"
					placeholder="Informe seu CEP"
					bind:value={zipcode}
					class="w-full border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-0 focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 focus:ring-primary-500 transition duration-200 ease-in-out"
				/>

				<button
					class="py-2 px-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-400 transition-all duration-200 ease-in-out active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
					on:click={estimate}>Calcular</button
				>
			</div>

			{#if freight}
				<div class="flex items-center justify-between my-3">
					<span class="text-sm font-bold"
						>Entrega - até {$cart.freight.delivery_time} dias úteis</span
					>
					<span class="text-sm font-bold"
						>{currencyFormatFreight(Number($cart.freight.price), freeText)}</span
					>
				</div>
			{/if}

			<div class="flex items-center justify-between">
				<span class="text-sm">Envio para todo o Brasil</span>
				<div class="flex items-center">
					<label class="flex items-center space-x-2 mx-2">
						<input
							class="radio border border-gray-400 w-4 h-4"
							type="radio"
							name="radio-direct"
							value="PAC"
							bind:group={freight_product_code}
						/>
						<p class="font-normal text-sm">PAC</p>
					</label>
					<label class="flex items-center space-x-2">
						<input
							class="radio border border-gray-400 w-4 h-4"
							type="radio"
							name="radio-direct"
							value="SEDEX"
							bind:group={freight_product_code}
						/>
						<p class="font-normal text-sm">SEDEX</p>
					</label>
				</div>
			</div>
		</div>

		<!-- carrinho -->

		<div
			class="flex flex-col items-center justify-center border border-gray-300 p-4 gap-2 rounded-lg"
		>
			<h1 class="text-2xl font-bold my-5">Meu Carrinho</h1>

			<div class="overflow-x-auto w-full">
				<table class="w-full bg-white border border-gray-200 rounded-lg">
					<thead>
						<tr class="bg-gray-100 border-b">
							<th
								class="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700"
								>Produto</th
							>

							<th
								class="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700"
								>Quantidade</th
							>
							<th
								class="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700 hidden sm:table-cell"
								>Preço</th
							>
							<th
								class="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700"
								>Ação</th
							>
						</tr>
					</thead>
					<tbody>
						{#each products as product}
							<tr class="border-b hover:bg-gray-50">
								<td
									class="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap flex items-center text-xs sm:text-sm"
								>
									<img
										src={product.image_path}
										alt=""
										class="w-8 h-8 sm:w-10 sm:h-10 rounded mr-2 sm:mr-3"
									/>
									<span
										class="text-gray-700 max-w-[100px] sm:max-w-[200px] truncate overflow-hidden text-ellipsis"
										>{product.name}</span
									>
								</td>

								<td class="px-4 py-2 sm:px-6 sm:py-4 text-gray-700 text-xs sm:text-sm">
									<div
										class="flex items-center justify-center w-22 sm:w-32 gap-1 border border-gray-300 rounded-xl hover:border-primary-500"
									>
										<button
											on:click={() => updateQuantity(product, product.quantity - 1)}
											disabled={product.quantity <= 1}
											class="px-1 sm:px-2 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
											><Minus /></button
										>
										<input
											bind:value={product.quantity}
											type="number"
											min="1"
											class="no-arrows text-gray-900 border-0 bg-transparent text-xs sm:text-sm font-normal focus:outline-none focus:ring-0 max-w-[3rem] text-center"
										/>
										<button
											disabled={product.quantity >= product.available_quantity}
											on:click={() => updateQuantity(product, product.quantity + 1)}
											class="px-1 sm:px-2 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
											><Plus /></button
										>
									</div>
								</td>
								<td
									class="px-4 py-2 sm:px-6 sm:py-4 text-gray-700 text-xs sm:text-sm hidden sm:table-cell"
									>{currencyFormat(product.price)}</td
								>
								<td class="px-4 py-2 sm:px-6 sm:py-4 text-xs sm:text-sm">
									<button
										class="px-2 py-1 text-xs sm:text-sm text-white bg-transparent rounded hover:bg-primary-50"
										on:click={() => {
											removeItem(product.product_id);
										}}
									>
										<Trash class="text-primary-500" />
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<!-- resumo -->
		<div
			class="flex flex-col items-center justify-center border border-gray-300 p-4 gap-2 rounded-lg"
		>
			<div class="flex justify-between w-full my-3">
				<span class="text-sm font-sans">Produtos</span><span
					>{currencyFormat(Number($cart.subtotal))}</span
				>
			</div>

			{#if $cart.discount !== '0'}
				<div class="flex justify-between w-full my-3">
					<span class="text-sm font-sans">Desconto</span><span
						>-{currencyFormat(Number($cart.discount))}</span
					>
				</div>
			{/if}

			<div class="flex justify-between w-full my-3">
				<span class="text-sm font-sans">Frete</span><span
					>{$cart.freight
						? currencyFormatFreight(Number($cart.freight.price), freeText)
						: 'R$ 0,00'}</span
				>
			</div>

			<hr class="w-full border-t-2 !border-gray-300" />

			<div class="flex justify-between w-full my-3">
				<h3 class="text-lg font-semibold">Total</h3>

				<h3 class="text-lg font-semibold">{currencyFormat(Number($cart.total))}</h3>
			</div>

			<button
				class="w-full py-2 px-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-400 transition-all duration-200 ease-in-out active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
				on:click={handleCheckout}
				disabled={!freight}
			>
				Finalizar Compra
			</button>

			<a href="/pages/dashboard"
				><span class="text-primary-700 font-bold cursor-pointer my-3 underline"
					>Continuar comprando</span
				>
			</a>
		</div>
		<div></div>

		<Toast position="tr" />
	</div>
{:else}
	<div class="flex flex-col items-center justify-center h-full">
		<h3>Seu carrinho está vazio</h3>
		<button
			class="font-bold flex justify-center items-center bg-white text-primary-500 hover:bg-primary-200 transition rounded-full px-4 py-2"
			><a href="/pages/dashboard">Continuar Comprando</a></button
		>
	</div>
{/if}

<style>
	.no-arrows::-webkit-outer-spin-button,
	.no-arrows::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Para Firefox */
	.no-arrows[type='number'] {
		-moz-appearance: textfield;
	}
</style>
