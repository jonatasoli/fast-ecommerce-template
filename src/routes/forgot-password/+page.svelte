<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { ChevronRight } from 'svelte-heros-v2';
	import { hideLoading, showLoading } from '$lib/stores/loading';
	import { showToast } from '$lib/utils';
	import { Toaster } from 'svelte-french-toast';
	import { onMount } from 'svelte';
	import Inputmask from 'inputmask';

	const logo = import.meta.env.VITE_URL_LOGO;
	const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

	let error = '';
	let document = '';
	let success = '';
	let inputRef: HTMLInputElement | null = null;

	async function handleRequestResetPassword(event: Event) {
		event.preventDefault();

		if (!document || document.trim().length < 11) {
			error = 'Por favor, insira um CPF válido (11 dígitos)';
			showToast(error, 'error');
			return;
		}

		let data = document.replace(/\D/g, '');

		try {
			showLoading();
			const response = await fetch(
				`${BASE_URL}/user/request-reset-password?document=${encodeURIComponent(data)}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			if (response.ok) {
				success = 'Link de recuperação enviado com sucesso!';
				showToast('Enviamos um link de recuperação para seu e-mail cadastrado.', 'success');
			} else {
				const errorData = await response.json();
				error = errorData.detail?.[0]?.msg || 'Não encontramos este CPF em nosso sistema.';
				showToast(error, 'error');
			}
		} catch (err) {
			error = 'Erro ao conectar com o servidor. Tente novamente.';
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
	class="request-reset-password flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 bg-gray-50"
>
	<a href="/" class="mb-8">
		<img src={logo} alt="Logo" width="220" class="hover:opacity-90 transition-opacity" />
	</a>

	<div class="w-full max-w-md p-8 rounded-xl bg-white shadow-lg">
		<div class="text-center mb-6">
			<h1 class="text-2xl font-bold text-gray-800 mb-2">Esqueceu sua senha?</h1>
			<p class="text-gray-600">Digite seu CPF para receber o link de recuperação</p>
		</div>

		<form class="flex flex-col gap-5" method="POST" on:submit={handleRequestResetPassword}>
			<div class="space-y-1">
				<label for="document" class="block text-sm font-medium text-gray-700">
					CPF (somente números)
				</label>
				<input
					id="document"
					name="document"
					bind:value={document}
					bind:this={inputRef}
					placeholder="000.000.000-00"
					class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-400 transition duration-200"
					type="text"
				/>
			</div>

			{#if error}
				<div class="text-red-500 text-sm text-center py-2 px-3 bg-red-50 rounded-lg">
					{error}
				</div>
			{/if}

			<button
				class="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center disabled:bg-primary-300 disabled:cursor-not-allowed"
				type="submit"
				disabled={success.length > 0}
			>
				Enviar link de recuperação
			</button>

			{#if success}
				<div class="text-green-500 text-sm text-center py-2 px-3 bg-green-50 rounded-lg">
					{success}
				</div>
			{/if}
		</form>

		<div class="mt-6 pt-5 border-t border-gray-200">
			<a
				href="/auth/login"
				class="flex items-center justify-center text-primary-500 hover:text-primary-600 font-medium text-sm"
			>
				<ChevronRight class="w-4 h-4 transform rotate-180 mr-1" />
				Voltar para o login
			</a>
		</div>
	</div>

	<Toaster position="top-right" />
</div>
