<script lang="ts">
	import { _ } from 'svelte-i18n';
	export const layout = false;
	let username = '';
	import { ChevronRight } from 'svelte-heros-v2'; // Usando biblioteca de ícones
	const logo = import.meta.env.VITE_URL_LOGO;

	let password = '';
	let error = '';

	function onSubmit() {
		// Lógica para login
	}

	function handleForgotPassword() {
		// Lógica para recuperação de senha
	}
</script>

<div class="login flex flex-col items-center justify-center min-h-screen px-4 sm:px-8">
	<a href="/" class="mb-6">
		<img src={logo} alt="Logo" width="200" />
	</a>

	<div class="w-full max-w-md mt-4 p-4 rounded-lg bg-white sm:shadow-custom">
		<p class="text-center text-xl text-primary font-medium mb-4">
			{$_('login.title')}
		</p>

		<form class="login__form flex flex-col gap-4">
			<!-- Campo de usuário -->
			<div>
				<label class="block mb-1 font-medium text-gray-700">
					{$_('login.username')}
				</label>
				<input
					bind:value={username}
					placeholder={$_('login.username')}
					class="w-full border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-0 focus:border-primary hover:border-primary placeholder-gray-400 placeholder-opacity-75 focus:ring-primary transition duration-200 ease-in-out"
					type="text"
				/>
			</div>

			<!-- Campo de senha -->
			<div>
				<label class="block mb-1 font-medium text-gray-700">
					{$_('login.password')}
				</label>
				<input
					type="password"
					bind:value={password}
					placeholder={$_('login.password')}
					class="w-full border border-gray-300 rounded-xl px-3 focus:outline-none focus:ring-0 focus:border-primary hover:border-primary placeholder-gray-400 placeholder-opacity-75 focus:ring-primary transition duration-200 ease-in-out"
				/>
			</div>

			<!-- Exibição de erro -->
			{#if error}
				<div class="text-red-500 text-sm text-center">
					{error}
				</div>
			{/if}
		</form>

		<!-- Botão de login -->
		<div class=" mt-6">
			<button
				class="font-bold w-full bg-primary hover:bg-primaryHover transition text-white rounded-full px-4 py-2"
				on:click={onSubmit}
			>
				{$_('login.submit')}
			</button>
		</div>

		<!-- Botões de recuperação e registro -->
		<div class="mt-4 flex flex-col items-center gap-4">
			<button
				class="font-bold w-full flex justify-center items-center bg-white text-primary hover:bg-primaryHover-hover transition rounded-full px-4 py-2"
				on:click={handleForgotPassword}
			>
				{$_('login.forgotPassword')}
				<ChevronRight class="w-5 h-5 " />
			</button>

			<a href="/register" class="block w-full">
				<button
					class="font-bold w-full flex justify-center items-center bg-white text-primary hover:bg-primaryHover-hover transition rounded-full px-4 py-2"
				>
					{$_('login.register')}
					<ChevronRight class="w-5 h-5" />
				</button>
			</a>
		</div>
	</div>
</div>
