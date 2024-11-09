<script lang="ts">
	import { Banknotes, Minus, Plus, ShoppingCart, Trash } from 'svelte-heros-v2';

	let coupon = '';
	let count = 1;

	function increment() {
		count += 1;
	}

	function decrement() {
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
				>Adicionar</button
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
		<div class="grid grid-col-1 items-center justify-center p-4 gap-5 w-full">
			<div class="flex items-center justify-center">
				<img
					src="https://s3.us-east-2.wasabisys.com/cdn.gattorosa.com.br/production/cachos/ID%2051%20combo-cachos-agjgbw.jpg"
					alt=""
					class="w-full h-full sm:max-w-56"
				/>
			</div>

			<div class="flex justify-center items-center">
				<span
					>COMBO VIBRANCE - 1 CACHOS RELAXAMENTO 1 KG + 1 CREME NEUTRALIZANTE POS RELAXAMENTO 1L</span
				>
			</div>
		</div>

		<div class="flex items-center justify-between gap-4 w-full">
			<div
				class="flex items-center gap-1 border border-gray-300 rounded-xl hover:border-primary-500"
			>
				<button on:click={decrement} class="px-2"><Minus /></button>
				<input
					bind:value={count}
					type="text"
					class="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
				/>
				<button on:click={increment} class="px-2"><Plus /></button>
			</div>
			<span class="text-xl font-semibold">R$ 419,00</span>
			<Trash class="text-primary-500" />
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

			<h3 class="text-lg font-semibold" i>R$ 200,00</h3>
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
