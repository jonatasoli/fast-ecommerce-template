<script lang="ts">
	import { cartStore } from '$lib/stores/cart';
	import { hideLoading, isLoading, showLoading } from '$lib/stores/loading';
	import type { CartItem } from '$lib/types';
	import { currencyFormat } from '$lib/utils';
	import { Banknotes, Minus, Plus, ShoppingCart, Trash } from 'svelte-heros-v2';

	let coupon = '';

	const cart = cartStore();

	let products: CartItem[] = [];

	$: products = $cart.cart_items;

	$: !products ? showLoading : hideLoading;

	function increment(count) {
		count += 1;
	}

	function decrement(count) {
		if (count > 0) count -= 1;
	}
</script>

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
				>Adicionar</button
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
				bind:value={coupon}
				class="w-full border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-0 focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 focus:ring-primary-500 transition duration-200 ease-in-out"
			/>

			<button
				class="py-2 px-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-400 transition-all duration-200 ease-in-out"
				>Calcular</button
			>
		</div>

		<div class="flex items-center justify-between">
			<span class="text-sm">Envio para todo o Brasil</span>
			<div class=" flex items-center">
				<label class="flex items-center space-x-2 mx-2">
					<input
						class="radio border border-gray-400 w-4 h-4"
						type="radio"
						checked
						name="radio-direct"
						value="1"
					/>
					<p class="font-normal text-sm">PAC</p>
				</label>
				<label class="flex items-center space-x-2">
					<input
						class="radio border border-gray-400 w-4 h-4"
						type="radio"
						name="radio-direct"
						value="2"
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
									alt={product.name}
									class="w-8 h-8 sm:w-10 sm:h-10 rounded mr-2 sm:mr-3"
								/>
								<span
									class="text-gray-700 max-w-[100px] sm:max-w-[200px] truncate overflow-hidden text-ellipsis"
									>{product.name}</span
								>
							</td>

							<td class="px-4 py-2 sm:px-6 sm:py-4 text-gray-700 text-xs sm:text-sm">
								<div
									class="flex items-center justify-center w-24 sm:w-32 gap-1 border border-gray-300 rounded-xl hover:border-primary-500"
								>
									<button on:click={decrement} class="px-1 sm:px-2"><Minus /></button>
									<input
										bind:value={product.quantity}
										type="text"
										class="text-gray-900 border-0 bg-transparent text-xs sm:text-sm font-normal focus:outline-none focus:ring-0 max-w-[2rem] text-center"
									/>
									<button on:click={increment} class="px-1 sm:px-2"><Plus /></button>
								</div>
							</td>
							<td
								class="px-4 py-2 sm:px-6 sm:py-4 text-gray-700 text-xs sm:text-sm hidden sm:table-cell"
								>{currencyFormat(product.price)}</td
							>
							<td class="px-4 py-2 sm:px-6 sm:py-4 text-xs sm:text-sm">
								<button
									class="px-2 py-1 text-xs sm:text-sm text-white bg-transparent rounded hover:bg-primary-50"
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
			<span class="text-sm font-sans">Produtos</span><span>R$ 197,00</span>
		</div>

		<div class="flex justify-between w-full my-3">
			<span class="text-sm font-sans">Frete</span><span>R$ 50,00</span>
		</div>

		<hr class="w-full border-t-2 !border-gray-300" />

		<div class="flex justify-between w-full my-3">
			<h3 class="text-lg font-semibold">Total</h3>

			<h3 class="text-lg font-semibold">R$ 200,00</h3>
		</div>

		<button
			class="w-full py-2 px-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-400 transition-all duration-200 ease-in-out"
			>Finalizar Compra</button
		>

		<a href="/pages/dashboard"
			><span class="text-primary-700 font-bold cursor-pointer my-3 underline"
				>Continuar comprando</span
			>
		</a>
	</div>
</div>
