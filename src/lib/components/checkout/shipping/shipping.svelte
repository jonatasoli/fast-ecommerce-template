<script lang="ts">
	import { ChevronDoubleRight } from 'svelte-heros-v2';
	import { _ } from 'svelte-i18n';
	import { cartStore } from '$lib/stores/cart';
	import { address, getAddressByZipcode } from '$lib/stores/address';
	$: cart = cartStore();

	export let nextStep: () => void;
	export let previousStep: () => void;
	export let data: any;

	let shippingAddress = {
		active: true,
		address_complement: '',
		address_id: null,
		city: '',
		country: '',
		neighborhood: '',
		state: '',
		street: '',
		street_number: '',
		user_id: null,
		zipcode: ''
	};
	let shippingIsPayment: boolean = true;

	$: currentAddress = $address.user_address;
	$: zipcode = $cart.zipcode;

	$: if (zipcode) {
		getAddressByZipcode(zipcode, 'user_address');
	}

	async function handleSubmitcurrentAddress() {
		await cart.addUserCart(data.token);
		await cart.addAddressCart({
			shipping_is_payment: shippingIsPayment,
			user_address: currentAddress,
			shipping_address: shippingAddress,
			token: data.token,
			user_address_id: null,
			shipping_address_id: null
		});

		nextStep();
	}
</script>

<div class="my-4">
	<h2 class="text-lg font-semibold text-primary-500">Endereço de entrega</h2>
</div>
<div
	class="p-3 space-y-4 w-full sm:w-3/4 border border-gray-300 text-gray-600 flex flex-col gap-2 rounded-lg"
>
	<div>
		<label for="id" class="block mb-1 font-medium text-sm text-gray-700"
			>{$_('checkout.shipping.form.zipcode')}</label
		>
		<input
			id="id"
			type="text"
			bind:value={currentAddress.zipcode}
			readonly
			class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
		/>
	</div>

	<div class="w-full flex justify-between gap-5">
		<div class="flex-1">
			<label for="name" class="block mb-1 font-medium text-sm text-gray-700"
				>{$_('checkout.shipping.form.country')}</label
			>
			<input
				id="name"
				type="text"
				bind:value={currentAddress.country}
				class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
			/>
		</div>

		<div class="flex-1">
			<label for="document" class="block mb-1 font-medium text-sm text-gray-700"
				>{$_('checkout.shipping.form.state')}</label
			>
			<input
				id="state"
				type="text"
				bind:value={currentAddress.state}
				class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
			/>
		</div>
	</div>

	<div class="w-full flex justify-between gap-5">
		<div class="flex-1">
			<label for="phone" class="block mb-1 font-medium text-sm text-gray-700"
				>{$_('checkout.shipping.form.city')}</label
			>
			<input
				id="form.city"
				type="text"
				bind:value={currentAddress.city}
				class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
			/>
		</div>

		<div class="flex-1">
			<label for="neighborhood" class="block mb-1 font-medium text-sm text-gray-700"
				>{$_('checkout.shipping.form.neighborhood')}</label
			>
			<input
				id="neighborhood"
				type="text"
				bind:value={currentAddress.neighborhood}
				class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
			/>
		</div>
	</div>

	<div class="w-full flex justify-between gap-5">
		<div class="flex-1">
			<label for="address" class="block mb-1 font-medium text-sm text-gray-700"
				>{$_('checkout.shipping.form.street')}</label
			>
			<input
				id="street"
				type="text"
				value={currentAddress.street}
				class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500 focus:ring-0 focus:ring-primary-500"
			/>
		</div>

		<div class="flex-1">
			<label for="cep" class="block mb-1 font-medium text-sm text-gray-700"
				>{$_('checkout.shipping.form.number')}</label
			>
			<input
				id="homeNumber"
				type="text"
				bind:value={currentAddress.street_number}
				class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
			/>
		</div>
	</div>

	<div>
		<label for="cep" class="block mb-1 font-medium text-sm text-gray-700"
			>{$_('checkout.shipping.form.complement')}</label
		>
		<input
			id="complement"
			type="text"
			bind:value={currentAddress.address_complement}
			class="w-full focus:ring-0 focus:ring-primary-500 border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out"
		/>
	</div>

	<div class="flex flex-col mt-4 w-full md:flex md:flex-row md:justify-end">
		<button
			class="md:w-28 py-2 md:px-4 my-1 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-dark transition-all ease-in-out duration-300 hover:bg-opacity-80"
			on:click={handleSubmitcurrentAddress}
		>
			<div class="flex justify-center"><ChevronDoubleRight /> Próximo</div>
		</button>
	</div>
</div>
