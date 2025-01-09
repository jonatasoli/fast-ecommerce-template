<script>
	import { ChevronDoubleRight } from 'svelte-heros-v2';
	import { _ } from 'svelte-i18n';

	let postalCode = 'Postal Code';
	let country = 'Country';
	let state = 'State';
	let city = 'City';
	let neighborhood = 'Neighborhood';
	let street = 'Street';
	let homeNumber = 'Number';
	let pleaseEnter = 'Please enter';
	let numberIsRequired = 'Number is required';
	let complement = 'Complement';
</script>

<div class="flex flex-col items-center justify-center h-full p-4">
	<div class="my-4">
		<h2 class="text-lg font-semibold text-primary-500">Endereço de entrega</h2>
	</div>
	<div class="p-3 space-y-4 w-full sm:w-3/4 border border-gray-300 flex flex-col gap-2 rounded-lg">
		<div>
			<label for="id" class="block mb-1 font-medium text-sm text-gray-700"
				>{$_('checkout.shipping.form.zipcode')}</label
			>
			<input
				id="id"
				type="text"
				bind:value={postalCode}
				readonly
				class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
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
					bind:value={country}
					readonly
					class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
				/>
			</div>

			<div class="flex-1">
				<label for="document" class="block mb-1 font-medium text-sm text-gray-700"
					>{$_('checkout.shipping.form.state')}</label
				>
				<input
					id="state"
					type="text"
					bind:value={state}
					readonly
					class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
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
					bind:value={city}
					readonly
					class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
				/>
			</div>

			<div class="flex-1">
				<label for="neighborhood" class="block mb-1 font-medium text-sm text-gray-700"
					>{$_('checkout.shipping.form.neighborhood')}</label
				>
				<input
					id="neighborhood"
					type="text"
					bind:value={neighborhood}
					readonly
					class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
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
					value={street}
					readonly
					class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500 focus:ring-0 focus:ring-primary-500"
				/>
			</div>

			<div class="flex-1">
				<label for="cep" class="block mb-1 font-medium text-sm text-gray-700"
					>{$_('checkout.shipping.form.number')}</label
				>
				<input
					id="homeNumber"
					type="text"
					bind:value={homeNumber}
					readonly
					class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out focus:ring-0 focus:ring-primary-500"
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
				bind:value={complement}
				readonly
				class="w-full focus:ring-0 focus:ring-primary-500 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out"
			/>
		</div>

		<div class="flex flex-col mt-4 w-full md:flex md:flex-row md:justify-end">
			<button
				class="md:w-28 py-2 md:px-4 my-1 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-dark transition-all ease-in-out duration-300 hover:bg-opacity-80"
			>
				<div class="flex justify-center"><ChevronDoubleRight /> Próximo</div>
			</button>
		</div>
	</div>
</div>
