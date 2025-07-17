<script lang="ts">
	import { mercadoPagoService } from '$lib/plugins/mercadopago';
	import { cartStore } from '$lib/stores/cart';
	import { hideLoading, showLoading } from '$lib/stores/loading';

	import { ChevronDoubleLeft, ChevronDoubleRight } from 'svelte-heros-v2';
	import { _ } from 'svelte-i18n';
	import Flatpickr from 'svelte-flatpickr';
	import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect';
	import 'flatpickr/dist/flatpickr.css';
	import 'flatpickr/dist/plugins/monthSelect/style.css';
	import 'flatpickr/dist/themes/confetti.css';
	import { convertToSmallestUnit, splitDate } from '$lib/utils';
	import { paymentMethod } from '$lib/stores/paymentStore';
	import { getStripeInstallments } from '$lib/plugins/stripe';

	type PaymentMethod = 'credit_card' | 'pix';
	export let data: any;

	export let nextStep: () => void;
	export let previousStep: () => void;

	let value = '';
	let formattedValue = '';

	$: cart = cartStore();

	let optionInstallments: { label: string; value: number }[] = [];
	let optionsDocuments: ('CPF' | 'CNPJ')[] = ['CPF', 'CNPJ'];

	let creditCardBrand: string = '';
	const groupName = 'select-group';
	let selectedInstallments: number = 0;
	let credit_card_number = '5555555555554444';
	let credit_card_name = 'APRO';
	let type_document = 'CPF';
	let document = '12345678909';
	let cvv = '123';
	$: ({ year, month } = splitDate(formattedValue));

	let payment_type: PaymentMethod = 'credit_card';

	$: paymentMethod.set(payment_type);

	let options = {
		plugins: [new monthSelectPlugin({ shorthand: true, dateFormat: 'Y-m' })],
		disableMobile: true
	};

	$: card = {
		cardNumber: credit_card_number,
		cardholderName: credit_card_name,
		cardExpirationMonth: month,
		cardExpirationYear: year,
		securityCode: cvv,
		identificationType: type_document,
		identificationNumber: document
	};

	async function getInstallments() {
		console.log(data);

		optionInstallments = []; // Sempre limpa antes de popular

		try {
			showLoading();

			if (data.i18nRedirected === 'pt-br') {
				const res: any = await mercadoPagoService.getInstallments({
					amount: $cart.total,
					bin: credit_card_number,
					paymentTypeId: 'credit_card'
				});

				const { payer_costs: payerCosts } = res[0];

				optionInstallments = payerCosts.map((payerCost: any) => ({
					label: payerCost.recommended_message,
					value: payerCost.installments
				}));

				creditCardBrand = res[0].payment_method_id;
			} else if (data.i18nRedirected === 'en-US') {
				optionInstallments = Array.from({ length: 12 }, (_, i) => ({
					label: `${i + 1}x sem juros`,
					value: i + 1
				}));
			}
		} catch (error) {
			console.error('Erro ao obter parcelas:', error);
		} finally {
			hideLoading();
		}
	}

	function getRecommendedMessage(
		installments: number,
		options: { label: string; value: number }[]
	): string | null {
		const option = options.find((option) => option.value === installments);
		return option ? option.label : null;
	}

	async function createCardToken() {
		showLoading();

		const message = getRecommendedMessage(selectedInstallments, optionInstallments);

		const tokenResponse = await mercadoPagoService.createCardToken(card);

		if (tokenResponse) {
			const { id, last_four_digits: lastFourDigits } = tokenResponse;
			await cart.addMercadoPagoCreditCardPayment({
				card_token: id,
				installments: selectedInstallments,
				payment_gateway: 'MERCADOPAGO',
				card_issuer: lastFourDigits,
				card_brand: creditCardBrand
			});
		}

		cart.setPaymentCreditCard({
			creditCardNumber: card.cardNumber,
			creditCardName: card.cardholderName,
			creditCardExpiration: `${card.cardExpirationMonth}/${card.cardExpirationYear}`,
			creditCardCvv: card.securityCode,
			installments: selectedInstallments || 0,
			installmentsMessage: message || '',
			typeDocument: card.identificationType,
			document: card.identificationNumber
		});

		nextStep();
		hideLoading();
	}

	async function createCardPix() {
		showLoading();
		await cart.addPixPaymentMethod(data.token);
		nextStep();
		hideLoading();
	}

	async function createStripePayment() {
		const message = getRecommendedMessage(selectedInstallments, optionInstallments);
		try {
			showLoading();
			await cart.addMercadoPagoCreditCardPayment({
				payment_gateway: 'STRIPE',
				number: card.cardNumber,
				exp_month: Number(card.cardExpirationMonth),
				exp_year: Number(card.cardExpirationYear),
				cvc: card.securityCode,
				name: card.cardholderName,
				installments: selectedInstallments
			});

			cart.setPaymentCreditCard({
				creditCardNumber: card.cardNumber,
				creditCardName: card.cardholderName,
				creditCardExpiration: `${card.cardExpirationMonth}/${card.cardExpirationYear}`,
				creditCardCvv: card.securityCode,
				installments: selectedInstallments || 0,
				installmentsMessage: message || '',
				typeDocument: card.identificationType,
				document: card.identificationNumber
			});

			nextStep();
		} catch {
		} finally {
			hideLoading();
		}
	}

	function handleSubmit() {
		if ($paymentMethod === 'credit_card') {
			if (data.i18nRedirected === 'pt-br') {
				createCardToken();
			} else if (data.i18nRedirected === 'en-US') {
				createStripePayment();
			}
		}

		if ($paymentMethod === 'pix') {
			createCardPix();
		}
	}
</script>

<div class="w-full text-center my-4">
	<div class="flex flex-col gap-4 items-center">
		<div class="my-4 w-full">
			<h2 class="text-lg font-semibold text-primary-500">Formas de pagamento</h2>
		</div>

		<div
			class="p-3 flex w-full sm:w-3/4 border border-gray-300 text-gray-600 gap-2 rounded-lg justify-center font-semibold text-base"
		>
			<label class="flex items-center space-x-2 mx-2">
				<input
					class="radio border border-gray-400 w-4 h-4"
					type="radio"
					name="radio-direct"
					value="credit_card"
					bind:group={payment_type}
				/>
				<p class="">Cartão de crédito</p>
			</label>
			<label class="flex items-center space-x-2">
				<input
					class="radio border border-gray-400 w-4 h-4"
					type="radio"
					name="radio-direct"
					value="pix"
					bind:group={payment_type}
				/>
				<p class=" ">Pix</p>
			</label>
		</div>
		{#if $paymentMethod === 'credit_card'}
			<div
				class="p-3 space-y-4 w-full text-left sm:w-3/4 border border-gray-300 text-gray-600 flex flex-col gap-2 rounded-lg"
			>
				<div>
					<label for="credit_card_number" class="block mb-1 font-medium text-sm text-gray-700"
						>{$_('checkout.payment.credit_card_number')}</label
					>
					<input
						id="credit_card_number"
						type="text"
						bind:value={credit_card_number}
						on:blur={getInstallments}
						class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
					/>
				</div>

				<div>
					<label for="credit_card_name" class="block mb-1 font-medium text-sm text-gray-700"
						>{$_('checkout.payment.credit_card_name')}</label
					>
					<input
						id="credit_card_name"
						type="text"
						bind:value={credit_card_name}
						class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
					/>
				</div>

				<div>
					<label for="document1" class="block mb-1 font-medium text-sm text-gray-700"
						>{$_('checkout.payment.type_card')}</label
					>

					<select
						id="select"
						bind:value={type_document}
						class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
					>
						{#each optionsDocuments as option}
							<option
								value={option}
								class="text-sm transition-colors duration-200 ease-in-out hover:bg-primary-500 hover:text-white"
							>
								{option}
							</option>
						{/each}
					</select>
				</div>

				<div>
					<label for="document" class="block mb-1 font-medium text-sm text-gray-700"
						>{$_('checkout.payment.document')}</label
					>
					<input
						id="document"
						type="text"
						bind:value={document}
						readonly
						class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
					/>
				</div>

				<div class="w-full flex justify-between gap-5">
					<div class="flex-1">
						<label for="validity" class="block mb-1 font-medium text-sm text-gray-700"
							>{$_('checkout.payment.credit_card_validate')}</label
						>

						<div class="w-full h-full">
							<Flatpickr
								children={null}
								{options}
								bind:value
								bind:formattedValue
								placeholder="selecione uma data"
								name="date"
								class="w-full border border-gray-300  text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
							/>
						</div>
					</div>

					<div class="flex-1">
						<label for="cvv" class="block mb-1 font-medium text-sm text-gray-700"
							>{$_('checkout.payment.credit_card_cvv')}</label
						>
						<input
							id="cvv"
							type="text"
							value={cvv}
							class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500 focus:ring-0 focus:ring-primary-500"
						/>
					</div>
				</div>
				<div>
					<label for="cep" class="block mb-1 font-medium text-sm text-gray-700"
						>{$_('checkout.payment.installments')}</label
					>

					<select
						id="select"
						bind:value={selectedInstallments}
						class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
						disabled={!optionInstallments.length}
					>
						{#each optionInstallments as option}
							<option
								value={option.value}
								class="text-sm transition-colors duration-200 ease-in-out hover:bg-primary-500 hover:text-white"
							>
								{option.label}
							</option>
						{/each}
					</select>
				</div>
			</div>
		{:else if $paymentMethod === 'pix'}
			<div
				class="p-3 space-y-4 w-full items-center sm:w-3/4 border border-gray-300 text-gray-600 flex flex-col gap-2 rounded-lg"
			>
				<h2 class="text-lg font-semibold text-primary-500">PIX com QR code</h2>
			</div>
		{/if}
		<div class="flex flex-col mt-4 w-full md:flex md:flex-row md:justify-center">
			<button
				class="md:w-28 py-2 md:px-4 my-1 bg-white font-semibold rounded-xl hover:bg-primary-200 transition-all ease-in-out duration-300 hover:bg-opacity-80"
				on:click={previousStep}
			>
				<div class="flex justify-center"><ChevronDoubleLeft /> Voltar</div>
			</button>

			<button
				class="md:w-28 py-2 md:px-4 my-1 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-dark transition-all ease-in-out duration-300 hover:bg-opacity-80"
				on:click={handleSubmit}
			>
				<div class="flex justify-center"><ChevronDoubleRight /> Próximo</div>
			</button>
		</div>
	</div>
</div>

<style>
</style>
