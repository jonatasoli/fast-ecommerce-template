<script lang="ts">
	import { goto } from '$app/navigation';
	import { cartStore } from '$lib/stores/cart';
	import { hideLoading, showLoading } from '$lib/stores/loading';
	import { onMount } from 'svelte';
	import { CheckCircle } from 'svelte-heros-v2';
	import ModalPix from '../payment/modalPix/modalPix.svelte';
	import { isOpenModal, showPixModal } from '$lib/stores/modalPix';
	import { showToast } from '$lib/utils';

	export let data: any;

	let checkout = false;
	let pending = false;

	$: cart = cartStore();

	function handlenagigateHome() {
		showLoading();
		goto('/pages/dashboard');
		hideLoading();
	}

	function handleNagigateCart() {
		showLoading();
		goto('/pages/cart');
		hideLoading();
	}

	async function getPayment() {
		const paymentType = cart.getPaymentType();
		showLoading();
		pending = true;
		console.log(paymentType)

		if (!paymentType) return;

		try {
			if (paymentType === 'CREDIT-CARD') {
				const res = await cart.finishCheckout(data.token);

				if (res.order_id) {
					checkout = true;

					cart.clearCart();
					cart.clearAffiliate();
				}
			}
			if (paymentType === 'PIX') {
				showPixModal();
			}
		} catch (err) {
			showToast('Erro ao finalizar o Checkout', 'error');
		} finally {
			hideLoading();
			pending = false;
		}
	}
	onMount(() => {
		getPayment();
	});
</script>

<div class="w-full text-center my-4">
	{#if checkout}
		<div class="flex flex-col gap-4 items-center w-full">
			<CheckCircle class="text-primary-500" size="63" />
			<h2 class="text-lg font-semibold text-primary-500">Seu pagamento está sendo processado</h2>
			<span>Em breve você receberá um e-mail com os detalhes do pedido</span>
			<button
				class="py-2 flex-1 sm:w-72 sm:flex-none my-1 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-dark transition-all ease-in-out duration-300 hover:bg-opacity-80"
				on:click={handlenagigateHome}>Voltar para a página inicial</button
			>
		</div>
	{:else if pending}
		<div class="flex flex-col gap-4 items-center w-full">
			<h2 class="text-lg font-semibold text-primary-500">Aguarde um momento...</h2>
			<span> Por favor aguarde, não feche ou atualize a página! </span>
		</div>
	{:else}
		<div class="flex flex-col gap-4 items-center w-full">
			<h2 class="text-lg font-semibold text-primary-500">Erro ao realizar o pedido</h2>
			<span>
				Houve um problema ao realizar o seu pedido, verifique o email enviado e tente novamente em
				instantes
			</span>
			<button
				class="py-2 flex-1 sm:w-72 sm:flex-none my-1 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-dark transition-all ease-in-out duration-300 hover:bg-opacity-80"
				on:click={handleNagigateCart}>Voltar para o carrinho</button
			>
		</div>
	{/if}

	<ModalPix visible={$isOpenModal} {data} />
</div>
