<script>
	import { _ } from 'svelte-i18n';
	const logo = import.meta.env.VITE_URL_LOGO;
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-4">
	<div class="flex flex-col items-center">
		<!-- Logo -->
		<a href="/" class="mb-8">
			<img src={logo} alt="Logo" class="w-56 sm:w-80" />
		</a>

		<!-- Mensagem de erro -->
		<p class="text-lg font-medium mb-6 text-primary-500 text-center">
			{$_('pageNotFound.notFound')}, <br />
			{$_('pageNotFound.tryAgain')}
		</p>

		<!-- Botão -->
		<a href="/" class="px-6 py-1 bg-primary-500 rounded-lg hover:bg-primary-600 transition">
			<button class="font-bold transition text-white px-4 py-2">
				{$_('pageNotFound.home')}
			</button>
		</a>
	</div>
</div>
