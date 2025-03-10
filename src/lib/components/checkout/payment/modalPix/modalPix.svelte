<script lang="ts">
	import { cartStore } from '$lib/stores/cart';
	import { hideLoading, showLoading } from '$lib/stores/loading';
	import { onMount } from 'svelte';

	export let visible = false;
	export let qrCodeUrl = ''; 
	export let pixCode = ''; 
	let paymentStatus = 'Pendente';

	let cart = cartStore();

	async function checkPaymentStatus(paymentId: string) {
		showLoading();
		try {
			const response = await fetch(`/api/webhook`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					action: 'payment.created', 
					data: { id: paymentId } 
				})
			});
			if (response.ok) {
				const data = await response.json();
				paymentStatus = data.status;
				console.log(paymentStatus);
			} else {
				paymentStatus = 'Erro ao consultar status';
			}
		} catch (error) {
			console.error('Erro ao consultar status do pagamento:', error);
			paymentStatus = 'Erro ao consultar status';
		} finally {
			hideLoading();
		}
	}

	// Função para copiar o código Pix
	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(pixCode);
			alert('Código Pix copiado!');
		} catch (err) {
			console.error('Erro ao copiar código Pix:', err);
		}
	};

	// Atualiza os dados do Pix
	async function pixPayment() {
		const res = cart.getPaymentPix();

		if (res && res.pix_qr_code_base64 && res.pix_qr_code) {
			qrCodeUrl = `data:image/png;base64,${res.pix_qr_code_base64}`;
			pixCode = res.pix_qr_code;

			await checkPaymentStatus(res.payment_method_id);
		} else {
			console.warn('Erro ao obter código Pix');
		}
	}

	// Chama a função ao montar o componente
	onMount(() => {
		pixPayment();
	});
</script>

{#if visible}
	<div class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
		<div class="bg-white rounded-lg shadow-lg p-12 max-w-4xl w-full">
			<h2 class="text-2xl font-semibold text-center">Quase Pronto!</h2>
			<p class="text-gray-600 text-center">Siga as instruções abaixo para finalizar!</p>

			<div class="grid grid-cols-2 gap-4 mt-6">
				<!-- Seção QR Code -->
				<div class="border rounded-lg p-4 flex flex-col items-center">
					<h3 class="font-semibold">Escaneie o QR Code abaixo</h3>
					<p class="text-sm text-gray-600 text-center">
						Escolha pagar via Pix no aplicativo do seu banco e depois, escaneie o código abaixo.
					</p>
					<img class="mt-4 w-40 h-40" src={qrCodeUrl} alt="QR Code" />
				</div>

				<!-- Seção Código Pix -->
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
						class="mt-2 px-4 py-2 bg-white-500 border border-primary-500 font-semibold rounded-xl hover:bg-primary-200 transition-all ease-in-out duration-300 hover:bg-opacity-80 text-primary-500"
						on:click={copyToClipboard}
					>
						Copiar Link
					</button>
				</div>
			</div>

			<!-- Botão de Cancelar -->
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
