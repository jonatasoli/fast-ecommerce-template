<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { cartStore } from '$lib/stores/cart';
	import { usePaymentStatus } from '$lib/stores/paymentStatus/paymentStatus';

	export let visible = false;
	export let data: any;

	let qrCodeUrl = '';
	let pixCode = '';
	let paymentStatus = 'Pendente';

	let cart = cartStore();
	let payment_method_id: string | null = null;

	const { status, start, stop, timeLeft } = usePaymentStatus({
		onSuccess: () => {
			console.log('Pagamento Aprovado! 🎉');
			paymentStatus = 'Aprovado';
		},
		onError: () => {
			console.log('Pagamento Rejeitado ❌');
			paymentStatus = 'Rejeitado';
		},
		onTimeout: () => {
			console.log('Tempo Limite Excedido ⏳');
			paymentStatus = 'Tempo Esgotado';
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
	<div class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
		<div class="bg-white rounded-lg shadow-lg p-12 max-w-4xl w-full">
			<h2 class="text-2xl font-semibold text-center">Quase Pronto!</h2>
			<p class="text-gray-600 text-center">Siga as instruções abaixo para finalizar!</p>

			<div class="grid grid-cols-2 gap-4 mt-6">
				<div class="border rounded-lg p-4 flex flex-col items-center">
					<h3 class="font-semibold">Escaneie o QR Code abaixo</h3>
					<p class="text-sm text-gray-600 text-center">
						Escolha pagar via Pix no aplicativo do seu banco e depois, escaneie o código abaixo.
					</p>
					<img class="mt-4 w-40 h-40" src={qrCodeUrl} alt="QR Code" />
				</div>

				<div class="border rounded-lg p-4 flex flex-col items-center">
					<h3 class="font-semibold">Ou copie este código para fazer o pagamento</h3>
					<p class="text-sm text-gray-600 text-center">
						Escolha pagar via Pix no aplicativo do seu banco e depois, cole o código abaixo.
					</p>
					<input
						type="text"
						class="mt-4 w-full p-2 border rounded-xl bg-gray-100 text-gray-700 text-center focus:outline-none focus:border-primary-500 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
						value={pixCode}
						readonly
					/>
					<button
						class="mt-2 px-4 py-2 bg-white border border-primary-500 font-semibold rounded-xl hover:bg-primary-200 transition-all ease-in-out duration-300 hover:bg-opacity-80 text-primary-500"
						on:click={copyToClipboard}
					>
						Copiar Código
					</button>
				</div>
			</div>

			<div class="text-center mt-6">
				<p class="text-lg font-semibold">
					Status do Pagamento: <span class="text-primary-500">{paymentStatus}</span>
				</p>
				<p class="text-sm text-gray-600">Tempo restante: {$timeLeft} segundos</p>
			</div>

			<div class="text-center mt-6">
				<button
					class="px-4 py-2 border border-red-500 font-semibold text-red-500 rounded-xl hover:bg-red-200 hover:bg-opacity-80 transition-all ease-in-out duration-300"
					on:click={() => (visible = false)}
				>
					Cancelar
				</button>
			</div>
		</div>
	</div>
{/if}
