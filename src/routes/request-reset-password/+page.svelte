<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { showToast } from '$lib/utils';
	import { Toaster } from 'svelte-french-toast';
	import { onMount } from 'svelte';
	import Inputmask from 'inputmask';
	import { hideLoading, showLoading } from '$lib/stores/loading';

	export let data;
	const token = data.token;

	const logo = import.meta.env.VITE_URL_LOGO;
	const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

	let error = '';
	let loading = false;

	let formData = {
		token,
		document: '',
		password: '',
		confirmPassword: ''
	};
	let inputRef: HTMLInputElement | null = null;

	function validate() {
		if (formData.password !== formData.confirmPassword) {
			error = 'As senhas não coincidem';
			return false;
		}
		if (formData.password.length < 8) {
			error = 'A senha deve ter pelo menos 8 caracteres';
			return false;
		}
		return true;
	}

	async function handleResetPassword(event: Event) {
		event.preventDefault();

		if (!validate()) {
			showToast(error, 'error');
			return;
		}

		try {
			showLoading();
			const response = await fetch(
				`${BASE_URL}/user/reset-password?token=${encodeURIComponent(formData.token)}`,
				{
					method: 'PATCH',
					body: JSON.stringify({
						document: formData.document.replace(/\D/g, ''),
						password: formData.password
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			if (response.ok) {
				showToast('Senha redefinida com sucesso!', 'success');
				setTimeout(() => goto('/'), 1500);
			} else {
				const errorData = await response.json();
				error = errorData.detail?.[0]?.msg || 'Token inválido ou expirado';
				showToast(error, 'error');
			}
		} catch (err) {
			error = 'Erro ao conectar com o servidor';
			showToast(error, 'error');
		} finally {
			hideLoading();
		}
	}

	onMount(() => {
		if (inputRef) {
			const mask = new Inputmask('999.999.999-99');
			mask.mask(inputRef);
		}
	});
</script>

<div
	class="reset-password flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 bg-gray-50"
>
	<a href="/" class="mb-8">
		<img src={logo} alt="Logo" width="220" class="hover:opacity-90 transition-opacity" />
	</a>

	<div class="w-full max-w-md p-8 rounded-xl bg-white shadow-lg">
		<div class="text-center mb-6">
			<h1 class="text-2xl font-bold text-gray-800 mb-2">Redefinir Senha</h1>
			<p class="text-gray-600">Crie uma nova senha para sua conta</p>
		</div>

		<form class="flex flex-col gap-4" method="POST" on:submit={handleResetPassword}>
			<div>
				<label for="document" class="block mb-1 text-sm font-medium text-gray-700">
					CPF (somente números)
				</label>
				<input
					id="document"
					name="document"
					bind:value={formData.document}
					bind:this={inputRef}
					placeholder="000.000.000-00"
					class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-400 transition duration-200"
					required
				/>
			</div>

			<div>
				<label for="password" class="block mb-1 text-sm font-medium text-gray-700">
					Nova Senha
				</label>
				<div class="relative">
					<input
						id="password"
						name="password"
						bind:value={formData.password}
						type="password"
						placeholder="Mínimo 8 caracteres"
						class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-400 transition duration-200"
						minlength="8"
						required
					/>
				</div>
			</div>

			<div>
				<label for="confirmPassword" class="block mb-1 text-sm font-medium text-gray-700">
					Confirmar Senha
				</label>
				<input
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					bind:value={formData.confirmPassword}
					placeholder="Repita a senha"
					class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-400 transition duration-200"
					minlength="8"
					required
				/>
			</div>

			{#if error}
				<div class="text-red-500 text-sm text-center py-2 px-3 bg-red-50 rounded-lg">
					{error}
				</div>
			{/if}

			<button
				class="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center mt-2"
				type="submit"
				disabled={loading}
			>
				Redefinir Senha
			</button>
		</form>

		<div class="mt-6 pt-5 border-t border-gray-200 text-center">
			<p class="text-sm text-gray-500">
				Não recebeu o código? <a
					href="/forgot-password"
					class="text-primary-500 hover:text-primary-600 font-medium">Solicitar novo link</a
				>
			</p>
		</div>
	</div>

	<Toaster position="top-right" />
</div>