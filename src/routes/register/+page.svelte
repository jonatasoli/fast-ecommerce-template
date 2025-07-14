<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { ChevronRight } from 'svelte-heros-v2';
	import { goto } from '$app/navigation';
	import { initializeStores, Toast, getToastStore } from '@skeletonlabs/skeleton';

	const logo = import.meta.env.VITE_URL_LOGO;

	initializeStores();

	let error = '';
	let loading = false;
	let documentType = 'CPF';
	let formData = {
		name: '',
		username: '',
		email: '',
		password: '',
		document: '',
		phone: '',
		terms: false
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

	function openTerms() {
		// Substitua pela URL real dos termos de uso
		window.open('/termos-de-uso', '_blank');
	}

	async function handleSignup(event: Event) {
		event.preventDefault();

		if (!formData.terms) {
			error = 'Você deve aceitar os termos e condições para continuar';
			showToast(error, 'bg-red');
			return;
		}

		const data = {
			name: formData.name,
			username: formData.username,
			mail: formData.email,
			password: formData.password,
			document: formData.document,
			document_type: documentType,
			phone: formData.phone,
			terms: formData.terms
		};

		try {
			loading = true;
			const response = await fetch('https://staging.api.gattorosa.com.br/user/signup', {
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
				error = errorData.detail?.[0]?.msg || errorData.message || 'Erro ao realizar cadastro.';
				showToast(error, 'bg-red');
			}
		} catch (err) {
			console.error('Registration error:', err);
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
			<div>
				<label for="name" class="block mb-1 font-medium text-gray-700">
					{$_('register.name')}
				</label>
				<input
					id="name"
					name="name"
					bind:value={formData.name}
					placeholder={$_('register.name')}
					class="w-full border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-0 focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 focus:ring-primary-500 transition duration-200 ease-in-out"
					type="text"
					required
				/>
			</div>

			<div>
				<label for="username" class="block mb-1 font-medium text-gray-700">
					{$_('register.username')}
				</label>
				<input
					id="username"
					name="username"
					bind:value={formData.username}
					placeholder={$_('register.username')}
					class="w-full border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-0 focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 focus:ring-primary-500 transition duration-200 ease-in-out"
					type="text"
					required
				/>
			</div>

			<div>
				<label for="email" class="block mb-1 font-medium text-gray-700">
					{$_('register.email')}
				</label>
				<input
					id="email"
					name="email"
					bind:value={formData.email}
					placeholder={$_('register.email')}
					class="w-full border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-0 focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 focus:ring-primary-500 transition duration-200 ease-in-out"
					type="email"
					required
				/>
			</div>

			<div>
				<label for="password" class="block mb-1 font-medium text-gray-700">
					{$_('register.password')}
				</label>
				<input
					id="password"
					name="password"
					bind:value={formData.password}
					placeholder={$_('register.password')}
					class="w-full border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-0 focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 focus:ring-primary-500 transition duration-200 ease-in-out"
					type="password"
					required
					minlength="6"
				/>
			</div>

			<div>
				<label for="documentType" class="block mb-1 font-medium text-gray-700">
					Tipo de Documento
				</label>
				<select
					id="documentType"
					bind:value={documentType}
					class="w-full border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-0 focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 focus:ring-primary-500 transition duration-200 ease-in-out"
				>
					<option value="CPF">CPF</option>
					<option value="CNPJ">CNPJ</option>
				</select>
			</div>

			<div>
				<label for="document" class="block mb-1 font-medium text-gray-700">
					{$_('register.document')}
				</label>
				<input
					id="document"
					name="document"
					bind:value={formData.document}
					placeholder={documentType === 'CPF' ? '000.000.000-00' : '00.000.000/0000-00'}
					class="w-full border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-0 focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 focus:ring-primary-500 transition duration-200 ease-in-out"
					type="text"
					required
				/>
			</div>

			<div>
				<label for="phone" class="block mb-1 font-medium text-gray-700">
					{$_('register.phone')}
				</label>
				<input
					id="phone"
					name="phone"
					bind:value={formData.phone}
					placeholder="(00) 00000-0000"
					class="w-full border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-0 focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 focus:ring-primary-500 transition duration-200 ease-in-out"
					type="tel"
					required
				/>
			</div>

			<div class="flex items-start mt-2">
				<div class="flex items-center h-5">
					<input
						id="terms"
						name="terms"
						bind:checked={formData.terms}
						type="checkbox"
						class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
						required
					/>
				</div>
				<div class="ml-3 text-sm">
					<label for="terms" class="font-medium text-gray-700">
						Eu li e aceito os <button type="button" on:click={openTerms} class="text-primary-600 hover:underline">Termos e Condições</button>
					</label>
					{#if !formData.terms && error.includes('termos')}
						<p class="mt-1 text-red-600">Você deve aceitar os termos para continuar</p>
					{/if}
				</div>
			</div>

			{#if error && !error.includes('termos')}
				<div class="text-red-500 text-sm text-center">
					{error}
				</div>
			{/if}

			<div class="mt-4">
				<button
					class="font-bold w-full bg-primary-500 hover:bg-primary-400 transition text-white rounded-full px-4 py-2 disabled:opacity-50"
					type="submit"
					disabled={loading}
				>
					{loading ? 'Carregando...' : $_('register.submit')}
				</button>
			</div>
		</form>

		<div class="mt-6 text-center text-sm">
			Já tem uma conta?{' '}
			<a href="/" class="font-medium text-primary-600 hover:underline">
				{$_('register.login')}
			</a>
		</div>
	</div>

	<Toast rounded="rounded-lg" position="tr" />
</div>
