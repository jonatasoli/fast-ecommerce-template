<script lang="ts">
	import { cartStore } from '$lib/stores/cart';
	import type { CartPreview, CreditCard } from '$lib/types';
	import { onMount } from 'svelte';
	import { ChevronDoubleRight, Pencil } from 'svelte-heros-v2';
	import { address } from '$lib/stores/address';
	import { currencyFormat } from '$lib/utils';

	$: cart = cartStore();
	export let nextStep: () => void;
	export let previousStep: () => void;
	export let data: any;

	let cartPreview: CartPreview | null = null;
	let pixLogo = '/pix-icon.svg';

	$: currentAddress = $address.user_address;

	let creditCardInfo: CreditCard = {
		creditCardNumber: '',
		creditCardName: '',
		creditCardExpiration: '',
		creditCardCvv: '',
		installments: 0,
		installmentsMessage: '',
		typeDocument: '',
		document: ''
	};

	async function getMercadoPagoMessage() {
		const res = await cart.getPaymentCreditCard();

		creditCardInfo = res;
	}
	async function getCartPreview() {
		const res = await cart.getCartPreview(data.token);
		if (res) {
			console.log(res);

			cartPreview = res;
		}
	}

	onMount(() => {
		getCartPreview();
		getMercadoPagoMessage();
	});
</script>

<div class="w-full text-center">
	<div class="flex flex-col gap-4 items-center">
		<div class="my-4 w-full">
			<h2 class="text-lg font-semibold text-primary-500">Confirmação de pagamento</h2>
		</div>

		<div
			class="p-3 md:p-6 space-y-4 w-full text-left sm:w-3/4 border border-gray-300 flex flex-col gap-2 rounded-lg mb-1 font-medium text-sm text-gray-700"
		>
			<div
				class="flex flex-col md:flex-row md:justify-between gap-2 md:border-b md:border-gray-200 py-2"
			>
				<div class="flex flex-col gap-2 border-b border-gray-200 py-2 md:border-none">
					<h3 class="text-base font-semibold text-primary-500">Login</h3>
					<span>{cartPreview?.user_data.name}</span>
					<span>{cartPreview?.user_data.email}</span>
					<span>{cartPreview?.user_data?.phone}</span>
				</div>

				<div class="flex flex-col gap-2 border-b border-gray-200 py-2 md:border-none">
					<h3 class="text-base font-semibold text-primary-500">Endereço de entrega</h3>
					<span>{cartPreview?.zipcode}</span>
					<span>{currentAddress?.street} - {currentAddress?.street_number}</span>
					<span
						>{currentAddress?.neighborhood} - {currentAddress?.city} - {currentAddress?.state}</span
					>
				</div>
			</div>

			<div class="flex flex-col gap-2">
				{#if cartPreview?.cart_items}
					{#each cartPreview.cart_items as item}
						<div class="flex justify-between items-center">
							<img width="100" height="100" src={item.image_path} alt={item.name} />
							<div class="flex flex-col gap-2">
								<span>{item.name}</span>
								<span><strong>Quantidade: {item.quantity}</strong></span>
							</div>
						</div>
						<div class="flex justify-between p-4 border-b border-gray-200 py-2">
							<div class="flex flex-col gap-2">
								<span>Unit.</span>
								<span class="text-base font-bold text-black"
									>{currencyFormat(Number(item.price))}</span
								>
							</div>
							<div class="flex flex-col gap-2">
								<span>Total</span>
								<span class="text-base font-bold text-black">
									{currencyFormat(Number(item.price * item.quantity))}</span
								>
							</div>
						</div>
					{/each}
				{/if}

				<div class="flex flex-col md:flex-row md:justify-between gap-2 py-2">
					<div class="flex flex-col gap-2">
						<h3 class="text-base font-semibold text-primary-500">Pagamento</h3>
						{#if cartPreview?.payment_method === 'credit_card'}
							<span>{creditCardInfo.creditCardName}</span>
							<span>****** {cartPreview?.payment_method_id.slice(-4)}</span>
							<span>{creditCardInfo.installmentsMessage}</span>
						{:else if cartPreview?.payment_method === 'pix'}
							<div class="flex gap-2 justify-center items-center">
								<img src={pixLogo} alt="pixLogo" />
								<span class="text-base font-bold text-black">PIX</span>
							</div>
						{/if}
					</div>
					<div></div>

					<div class="flex flex-col gap-2 py-2">
						<div class="flex gap-2 justify-between">
							<span>Subtotal:</span>
							<span class="text-base font-bold text-black">
								{currencyFormat(Number(cartPreview?.subtotal))}</span
							>
						</div>
						<div class="flex justify-between">
							<span>Frete:</span>
							<span class="text-base font-bold text-black">
								{currencyFormat(Number(cartPreview?.freight.price))}</span
							>
						</div>
						<div class="flex justify-between">
							<span>Desconto:</span>
							<span class="text-base font-bold text-black">
								{currencyFormat(Number(cartPreview?.discount))}</span
							>
						</div>
						<div class="flex justify-between">
							<span>Total:</span>
							<span class="text-base font-bold text-black">
								{currencyFormat(Number(cartPreview?.total))}</span
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="flex flex-col sm:flex-row sm:justify-center gap-2 py-2 mt-4 w-full sm:p-3">
	<button
		class="py-2 sm:w-72 flex-1 sm:flex-none my-1 bg-white border border-primary-500 font-semibold rounded-xl hover:bg-primary-200 transition-all ease-in-out duration-300 hover:bg-opacity-80 text-primary-500"
		on:click={previousStep}
	>
		<div class="flex justify-center"><Pencil /> Alterar Método de Pagamento</div>
	</button>

	<button
		class="py-2 flex-1 sm:w-72 sm:flex-none my-1 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-dark transition-all ease-in-out duration-300 hover:bg-opacity-80"
		on:click={nextStep}
	>
		<div class="flex justify-center"><ChevronDoubleRight /> Confirmar Pedido</div>
	</button>
</div>
