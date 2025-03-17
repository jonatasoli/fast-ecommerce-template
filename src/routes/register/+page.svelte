<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { ChevronRight } from 'svelte-heros-v2';
	import { goto } from '$app/navigation';
	import { initializeStores, Toast, getToastStore } from '@skeletonlabs/skeleton';

	const logo = import.meta.env.VITE_URL_LOGO;

	initializeStores();

	let error = '';
	let loading = false;
	let inputType = 'text';
	let formData = {
		name: '',
		username: '',
		email: '',
		password: '',
		document: '',
		phone: ''
	};

	const toastStore = getToastStore();

	function showToast(message: string, bgColor: string) {
		const t = {
			message,
			autohide: false,
			hideDismiss: true,
			background: bgColor,
			classes: `${bgColor} text-white`
		};
		toastStore.trigger(t);
	}

	async function handleSignup(event: Event) {
		event.preventDefault();

		const data = {
			name: formData.name,
			username: formData.username,
			mail: formData.email,
			password: formData.password,
			document: formData.document,
			phone: formData.phone
		};

		try {
			loading = true;
			const response = await fetch('/user/signup', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				const result = await response.json();
				showToast(`Cadastro realizado com sucesso! Bem-vindo, ${result.name}`, 'bg-primary-500');
				goto('/pages/dashboard');
			} else {
				const errorData = await response.json();
				error = errorData.message || 'Erro ao realizar cadastro.';
				showToast('Falha no cadastro. Tente novamente.', 'bg-red');
			}
		} catch (err) {
			error = 'Erro de conexão. Tente novamente mais tarde.';
			showToast(error, 'bg-red');
		} finally {
			loading = false;
		}
	}
</script>

<div class="register flex flex-col items-center justify-center min-h-screen px-4 sm:px-8">
	<a href="/" class="mb-6">
		<img src={logo} alt="Logo" width="200" />
	</a>

	<div class="w-full max-w-md mt-4 p-4 rounded-lg bg-white sm:shadow-custom">
		<p class="text-center text-xl text-primary-500 font-medium mb-4">
			{$_('register.title')}
		</p>

		<form class="register__form flex flex-col gap-4" method="POST" on:submit={handleSignup}>
			{#each Object.keys(formData) as field}
				<div>
					<label for={field} class="block mb-1 font-medium text-gray-700">
						{$_(`register.${field}`)}
					</label>
					<input
						id={field}
						name={field}
						bind:value={formData[field]}
						placeholder={$_(`register.${field}`)}
						class="w-full border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-0 focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 focus:ring-primary-500 transition duration-200 ease-in-out"
						type="text"
					/>
				</div>
			{/each}

			{#if error}
				<div class="text-red-500 text-sm text-center">
					{error}
				</div>
			{/if}

			<div class="mt-6">
				<button
					class="font-bold w-full bg-primary-500 hover:bg-primary-400 transition text-white rounded-full px-4 py-2"
					type="submit"
					disabled={loading}
				>
					{$_('register.submit')}
				</button>
			</div>
		</form>

		<div class="mt-4 flex flex-col items-center gap-4">
			<a href="/" class="block w-full">
				<button
					class="font-bold w-full flex justify-center items-center bg-white text-primary-500 hover:bg-primary-400 transition rounded-full px-4 py-2"
				>
					{$_('register.login')}
					<ChevronRight class="w-5 h-5" />
				</button>
			</a>
		</div>
	</div>

	<Toast rounded="rounded-lg" position="tr" />
</div>
