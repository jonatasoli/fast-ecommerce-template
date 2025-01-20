<script lang="ts">
	import { ChevronDoubleLeft, ChevronDoubleRight } from 'svelte-heros-v2';
	import { _ } from 'svelte-i18n';
	export let nextStep: () => void;
	export let previousStep: () => void;

	let credit_card_number = '12345';
	let credit_card_name = 'name';
	let document = 'document';
	let validity = 'City';
	let cvv = 'Street';
	let installments = 'Number';
	let payment_type: string = 'credit_card';
</script>

<div class="w-full text-center">
	<div class="flex flex-col gap-4 items-center">
		<div class="my-4 w-full">
			<h2 class="text-lg font-semibold text-primary-500">Formas de pagamento</h2>
		</div>

		<div
			class="p-3 flex w-full sm:w-3/4 border border-gray-300 gap-2 rounded-lg justify-center font-semibold text-base"
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
		<div
			class="p-3 space-y-4 w-full text-left sm:w-3/4 border border-gray-300 flex flex-col gap-2 rounded-lg"
		>
			<div>
				<label for="credit_card_number" class="block mb-1 font-medium text-sm text-gray-700"
					>{$_('checkout.payment.credit_card_number')}</label
				>
				<input
					id="credit_card_number"
					type="text"
					bind:value={credit_card_number}
					class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
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
					readonly
					class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
				/>
			</div>

			<div>
				<label for="document1" class="block mb-1 font-medium text-sm text-gray-700"
					>{$_('checkout.payment.type_card')}</label
				>
				<input
					id="document1"
					type="text"
					bind:value={document}
					readonly
					class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
				/>
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
					class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
				/>
			</div>

			<div class="w-full flex justify-between gap-5">
				<div class="flex-1">
					<label for="validity" class="block mb-1 font-medium text-sm text-gray-700"
						>{$_('checkout.payment.credit_card_validate')}</label
					>
					<input
						id="validity"
						type="text"
						bind:value={validity}
						readonly
						class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
					/>
				</div>

				<div class="flex-1">
					<label for="cvv" class="block mb-1 font-medium text-sm text-gray-700"
						>{$_('checkout.payment.credit_card_cvv')}</label
					>
					<input
						id="cvv"
						type="text"
						value={cvv}
						readonly
						class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500 focus:ring-0 focus:ring-primary-500"
					/>
				</div>
			</div>
			<div>
				<label for="cep" class="block mb-1 font-medium text-sm text-gray-700"
					>{$_('checkout.payment.installments')}</label
				>
				<input
					id="installments"
					type="text"
					bind:value={installments}
					readonly
					class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
				/>
			</div>

			<div class="flex flex-col mt-4 w-full md:flex md:flex-row md:justify-end">
				<button
					class="md:w-28 py-2 md:px-4 my-1 bg-white font-semibold rounded-xl hover:bg-primary-200 transition-all ease-in-out duration-300 hover:bg-opacity-80"
					on:click={nextStep}
				>
					<div class="flex justify-center"><ChevronDoubleLeft /> Voltar</div>
				</button>

				<button
					class="md:w-28 py-2 md:px-4 my-1 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-dark transition-all ease-in-out duration-300 hover:bg-opacity-80"
					on:click={nextStep}
				>
					<div class="flex justify-center"><ChevronDoubleRight /> Próximo</div>
				</button>
			</div>
		</div>
	</div>
</div>
