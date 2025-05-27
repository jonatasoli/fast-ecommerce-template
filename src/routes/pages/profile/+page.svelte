<script lang="ts">
	import { hideLoading, showLoading } from '$lib/stores/loading';
	import type { User } from '$lib/types';
	import { locales } from '$lib/utils.js';
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
	let lang = data.i18nRedirected;

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

	function changeLanguage(event: Event) {
		const selectedLang = (event.target as HTMLSelectElement).value;
		document.cookie = `i18n_redirected=${selectedLang}; path=/; max-age=31536000`;
		const cookie = document.cookie;
		location.reload();
	}
</script>

<div class="p-4 flex flex-col max-w-2xl mx-auto">
	<div class="mb-6">
		<h1 class="text-2xl md:text-3xl font-semibold text-primary-500 text-center">
			{$_('checkout.user.title')}
		</h1>
	</div>

	<div class="p-3 flex flex-col space-y-4 w-full">
		<div>
			<label for="id" class="block mb-1 font-medium text-sm text-gray-700"
				>{$_('checkout.user.idUser')}</label
			>
			<input
				id="id"
				type="text"
				bind:value={user.user_id}
				readonly
				class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out"
			/>
		</div>

		<div>
			<label for="name" class="block mb-1 font-medium text-sm text-gray-700"
				>{$_('checkout.user.name')}</label
			>
			<input
				id="name"
				type="text"
				bind:value={user.name}
				readonly
				class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out"
			/>
		</div>

		<div>
			<label for="document" class="block mb-1 font-medium text-sm text-gray-700"
				>{$_('checkout.user.document')}</label
			>
			<input
				id="document"
				type="text"
				bind:value={user.document}
				readonly
				class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out"
			/>
		</div>

		<div>
			<label for="phone" class="block mb-1 font-medium text-sm text-gray-700"
				>{$_('checkout.user.phone')}</label
			>
			<input
				id="phone"
				type="text"
				bind:value={user.phone}
				readonly
				class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out"
			/>
		</div>

		<div>
			<label for="email" class="block mb-1 font-medium text-sm text-gray-700"
				>{$_('checkout.user.email')}</label
			>
			<input
				id="email"
				type="text"
				bind:value={user.email}
				readonly
				class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out"
			/>
		</div>

		<div>
			<label for="address" class="block mb-1 font-medium text-sm text-gray-700"
				>{$_('checkout.user.address')}</label
			>
			<input
				id="address"
				type="text"
				value={getAddress()}
				readonly
				class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out"
			/>
		</div>

		<div>
			<label for="cep" class="block mb-1 font-medium text-sm text-gray-700"
				>{$_('checkout.user.zipcode')}</label
			>
			<input
				id="cep"
				type="text"
				bind:value={user.addresses[0].zipcode}
				readonly
				class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out"
			/>
		</div>

		<div>
			<label for="language" class="block mb-1 font-medium text-sm text-gray-700"
				>Escolha o idioma:</label
			>
			<select
				id="language"
				on:change={changeLanguage}
				bind:value={lang}
				class="w-full border border-gray-300 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 transition duration-200 ease-in-out"
			>
				{#each locales as locale}
					<option value={locale.value}>{locale.name}</option>
				{/each}
			</select>
		</div>

		<div class="flex flex-col mt-4 w-full md:flex md:flex-row md:justify-end">
			<button
				class="md:w-28 w-full py-2 px-4 md:mx-3 my-1 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-dark transition-all duration-200 ease-in-out"
			>
				{$_('buttons.edit')}
			</button>

			<button
				class="md:w-28 py-2 md:px-4 my-1 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-dark transition-all duration-200 ease-in-out"
			>
				{$_('buttons.save')}
			</button>
		</div>
	</div>
</div>

<style>
</style>
