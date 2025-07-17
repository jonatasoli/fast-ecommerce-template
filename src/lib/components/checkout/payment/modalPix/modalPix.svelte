<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { cartStore } from '$lib/stores/cart';
	import { usePaymentStatus } from '$lib/stores/paymentStatus/paymentStatus';
	import { showLoading } from '$lib/stores/loading';
	import { handleNagigateDashboard, showToast } from '$lib/utils';

	export let visible = false;
	export let data: any;

	let qrCodeUrl = '';
	let pixCode = '';
	let paymentStatus = 'Pendente';
	let buttonTimout: boolean = false;

	let cart = cartStore();
	let payment_method_id: string | null = null;

	const { status, start, stop, timeLeft } = usePaymentStatus({
		onSuccess: () => {
			showToast('Pagamento Aprovado!', 'success');
			paymentStatus = 'Aprovado';
		},
		onError: () => {
			showToast('Pagamento Rejeitado', 'error');
			paymentStatus = 'Rejeitado';
		},
		onTimeout: () => {
			showToast('Tempo Limite Excedido', 'error');
			paymentStatus = 'Tempo Esgotado';
			showLoading();
			buttonTimout = true;
			cart.clearCart();
			cart.clearAffiliate();
		}
	});

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(pixCode);
			alert('Código Pix copiado!');
		} catch (err) {
			console.error('Erro ao copiar código Pix:', err);
		}
	};

	async function pixPayment() {
		const res = cart.getPaymentPix();

		if (res && res.pix_qr_code_base64 && res.pix_qr_code) {
			qrCodeUrl = `data:image/png;base64,${res.pix_qr_code_base64}`;
			pixCode = res.pix_qr_code;
			payment_method_id = res.payment_method_id;

			if (payment_method_id) {
				console.log('Iniciando monitoramento do pagamento:', payment_method_id);
				await cart.finishCheckout(data.token);
				start(payment_method_id);
			}
		} else {
			console.warn('Erro ao obter código Pix');
		}
	}

	onMount(() => {
		pixPayment();
	});

	onDestroy(() => {
		stop();
	});
</script>

{#if visible}
	<div
		class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4 sm:p-0"
	>
		<div class="bg-white rounded-lg shadow-lg p-6 sm:p-12 max-w-md sm:max-w-4xl w-full">
			<h2 class="text-xl sm:text-2xl font-semibold text-center">Quase Pronto!</h2>
			<p class="text-gray-600 text-center text-sm sm:text-base">
				Siga as instruções abaixo para finalizar!
			</p>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:mt-6">
				<div class="border rounded-lg p-4 flex flex-col items-center text-center">
					<h3 class="font-semibold text-sm sm:text-base">Escaneie o QR Code abaixo</h3>
					<p class="text-xs sm:text-sm text-gray-600">
						Escolha pagar via Pix no aplicativo do seu banco e depois, escaneie o código abaixo.
					</p>
					<img class="mt-2 sm:mt-4 w-32 h-32 sm:w-40 sm:h-40" src={qrCodeUrl} alt="QR Code" />
				</div>

				<div class="border rounded-lg p-4 flex flex-col items-center text-center">
					<h3 class="font-semibold text-sm sm:text-base">
						Ou copie este código para fazer o pagamento
					</h3>
					<p class="text-xs sm:text-sm text-gray-600">
						Escolha pagar via Pix no aplicativo do seu banco e depois, cole o código abaixo.
					</p>
					<input
						type="text"
						class="mt-2 sm:mt-4 w-full p-2 border rounded-xl bg-gray-100 text-gray-700 text-center text-xs sm:text-base focus:outline-none focus:border-primary-500 transition duration-200 ease-in-out"
						value={pixCode}
						readonly
					/>
					<button
						class="mt-2 px-3 py-2 text-xs sm:text-sm bg-white border border-primary-500 font-semibold rounded-xl hover:bg-primary-200 transition-all ease-in-out duration-300 text-primary-500"
						on:click={copyToClipboard}
					>
						Copiar Código
					</button>
				</div>
			</div>

			<div class="text-center mt-4 sm:mt-6">
				<p class="text-sm sm:text-lg font-semibold">
					Status do Pagamento: <span class="text-primary-500">{paymentStatus}</span>
				</p>
				<p class="text-xs sm:text-sm text-gray-600">Tempo restante: {$timeLeft} segundos</p>
			</div>

			<div class="text-center mt-4 sm:mt-6">
				{#if !buttonTimout}
					<button
						class="px-3 sm:px-4 py-2 text-xs sm:text-sm border border-red-500 font-semibold text-red-500 rounded-xl hover:bg-red-200 transition-all ease-in-out duration-300"
						on:click={() => (visible = false)}
					>
						Cancelar
					</button>
				{:else}
					<button
						class="py-2 sm:w-72 my-1 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-dark transition-all ease-in-out duration-300"
						on:click={handleNagigateDashboard}
					>
						Voltar para o carrinho
					</button>
				{/if}
			</div>
		</div>
	</div>
{/if}
