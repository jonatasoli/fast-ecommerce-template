<script lang="ts">
	import { _ } from 'svelte-i18n';
	export const layout = false;

	import { ChevronRight } from 'svelte-heros-v2';
	import { goto } from '$app/navigation';
	const logo = import.meta.env.VITE_URL_LOGO;
	import { initializeStores, Toast, getToastStore } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { loginSchema } from '$lib/schemas/login.js';

	initializeStores();

	export let data;
	let notification = true;
	let error = '';
	let loading = false;
	let username = '';
	let password = '';
	const toastStore = getToastStore();
	function showToast(message: string, bgColor: string) {
		const t = {
			message: message,
			autohide: false,
			hideDismiss: true,
			background: bgColor,
			classes: `${bgColor} text-white`
		};
		toastStore.trigger(t);
	}

	async function handleLogin(formData: FormData) {
		const form = {
			username: formData.get('username') as string,
			password: formData.get('password') as string
		};

		const data = {
			username: form.username.replace(/\D/g, ''),
			password
		};

		const result = loginSchema.safeParse(data);

		if (result) {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response) {
				showToast($_('login.success'), 'bg-primary-500');
				goto('/pages/dashboard');
			} else {
				showToast($_('login.failure'), 'bg-red');
				error = 'Falha ao fazer login, verifique suas credenciais.';
			}
		}
	}
	function handleForgotPassword() {}
</script>

<div class="login flex flex-col items-center justify-center min-h-screen px-4 sm:px-8">
	<a href="/" class="mb-6">
		<img src={logo} alt="Logo" width="200" />
	</a>

	<div class="w-full max-w-md mt-4 p-4 rounded-lg bg-white sm:shadow-custom">
		<p class="text-center text-xl text-primary-500 font-medium mb-4">
			{$_('login.title')}
		</p>

		<form
			class="login__form flex flex-col gap-4"
			method="POST"
			use:enhance={async ({ formData }) => {
				await handleLogin(formData);
			}}
		>
			<div>
				<label for="username" class="block mb-1 font-medium text-gray-700">
					{$_('login.username')}
				</label>
				<input
					id="username"
					name="username"
					bind:value={username}
					placeholder={$_('login.username')}
					class="w-full border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-0 focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 focus:ring-primary-500 transition duration-200 ease-in-out"
					type="text"
				/>
			</div>

			<div>
				<label for="password" class="block mb-1 font-medium text-gray-700">
					{$_('login.password')}
				</label>
				<input
					id="password"
					name="password"
					type="password"
					bind:value={password}
					placeholder={$_('login.password')}
					class="w-full border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-0 focus:border-primary-500 hover:border-primary-500 placeholder-gray-400 placeholder-opacity-75 focus:ring-primary-500 transition duration-200 ease-in-out"
				/>
			</div>

			{#if error}
				<div class="text-red-500 text-sm text-center">
					{error}
				</div>
			{/if}

			<div class="mt-6">
				<button
					class="font-bold w-full bg-primary-500 hover:bg-primary-400 transition text-white rounded-full px-4 py-2"
					type="submit"
				>
					{$_('login.submit')}
				</button>
			</div>
		</form>

		<div class="mt-4 flex flex-col items-center gap-4">
			<button
				class="font-bold w-full flex justify-center items-center bg-white text-primary-500 hover:bg-primary-400 transition rounded-full px-4 py-2"
				on:click={handleForgotPassword}
			>
				{$_('login.forgotPassword')}
				<ChevronRight class="w-5 h-5 " />
			</button>

			<a href="/register" class="block w-full">
				<button
					class="font-bold w-full flex justify-center items-center bg-white text-primary-500 hover:bg-primary-400 transition rounded-full px-4 py-2"
				>
					{$_('login.register')}
					<ChevronRight class="w-5 h-5" />
				</button>
			</a>
		</div>
	</div>

	<Toast rounded="rounded-lg" position="tr" />
</div>
