<script lang="ts">
	import { hideLoading, showLoading } from '$lib/stores/loading';
	import type { User } from '$lib/types';
	import { _ } from 'svelte-i18n';
	export let data;
	let user: User = {
		user_id: 0,
		name: '',
		document: '',
		phone: '',
		email: '',
		addresses: [],
		password: '',
		role_id: null,
		full_name: null,
		disabled: null
	};

	$: user = data.user;

	function getAddress() {
		showLoading();
		const { addresses } = user;

		if (addresses.length === 0) {
			return '';
		}

		const address = [];

		if (addresses[0].street) address.push(addresses[0].street);
		if (addresses[0].neighborhood) address.push(addresses[0].neighborhood);
		if (addresses[0].street_number) address.push(addresses[0].street_number);
		if (addresses[0].city) address.push(addresses[0].city);
		if (addresses[0].state) address.push(addresses[0].state);
		if (addresses[0].country) address.push(addresses[0].country);
		hideLoading();
		return address.join(', ');
	}
</script>

<div class="p-4 flex flex-col max-w-2xl mx-auto">
	<div class="mb-6">
		<h1 class="text-2xl md:text-3xl font-semibold text-primary-500 text-center">
			{$_('checkout.user.title')}
		</h1>
	</div>

	<div class="p-3 flex flex-col space-y-4">
		<!-- Campo ID do Usuário -->
		<div>
			<label for="id" class="block mb-1 font-medium text-sm text-gray-700">ID do Usuário</label>
			<input
				id="id"
				type="text"
				bind:value={user.user_id}
				readonly
				class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out"
			/>
		</div>

		<!-- Campo Nome -->
		<div>
			<label for="name" class="block mb-1 font-medium text-sm text-gray-700">Nome</label>
			<input
				id="name"
				type="text"
				bind:value={user.name}
				readonly
				class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out"
			/>
		</div>

		<!-- Campo Documento -->
		<div>
			<label for="document" class="block mb-1 font-medium text-sm text-gray-700">Documento</label>
			<input
				id="document"
				type="text"
				bind:value={user.document}
				readonly
				class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out"
			/>
		</div>

		<!-- Campo Telefone -->
		<div>
			<label for="phone" class="block mb-1 font-medium text-sm text-gray-700">Telefone</label>
			<input
				id="phone"
				type="text"
				bind:value={user.phone}
				readonly
				class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out"
			/>
		</div>

		<!-- Campo Email -->
		<div>
			<label for="email" class="block mb-1 font-medium text-sm text-gray-700">Email</label>
			<input
				id="email"
				type="text"
				bind:value={user.email}
				readonly
				class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out"
			/>
		</div>

		<!-- Campo Endereço -->
		<div>
			<label for="address" class="block mb-1 font-medium text-sm text-gray-700">Endereço</label>
			<input
				id="address"
				type="text"
				value={getAddress()}
				readonly
				class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out"
			/>
		</div>

		<div>
			<label for="cep" class="block mb-1 font-medium text-sm text-gray-700">Cep</label>
			<input
				id="cep"
				type="text"
				bind:value={user.addresses[0].zipcode}
				readonly
				class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out"
			/>
		</div>

		<!-- Botão Editar -->
		<div class="flex flex-col mt-4 w-full md:flex md:flex-row md:justify-end">
			<button
				class="md:w-28 w-full py-2 px-4 md:mx-3 my-1 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-dark transition-all duration-200 ease-in-out"
			>
				Editar
			</button>

			<button
				class="md:w-28 py-2 md:px-4 my-1 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-dark transition-all duration-200 ease-in-out"
			>
				Salvar
			</button>
		</div>
	</div>
</div>

<style>
</style>
