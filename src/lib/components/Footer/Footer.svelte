<script>
	export let navLinks = [
		{ label: 'Combos', to: '#' },
		{ label: 'Lisos e Selagem', to: '#' },
		{ label: 'Penteados', to: '#' },
		{ label: 'Tratamentos', to: '#' },
		{ label: 'Cachos / Curls', to: '#' },
		{ label: 'Home Care', to: '#' },
		{ label: 'Cápsulas', to: '#' },
		{ label: 'Lavatório', to: '#' },
		{ label: 'Coloridos', to: '#' },
		{ label: 'Loiros', to: '#' }
	];

	// Importa a função de tradução
</script>

<footer class="w-full font-sans">
	<div class="footer w-full bg-homeBackground pt-8">
		<div class="w-full px-4 xl:px-0 flex flex-col items-center">
			<div class=" mb-4">
				<p
					class="m-0 font-light text-primary text-xl leading-6 uppercase pb-4 border-b border-opacity-50 border-primary mb-4"
				>
					Categorias
				</p>
				<ul class="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
					{#each navLinks as link}
						<li class="inline-flex items-center min-h-10 uppercase">
							<a
								href={link.to}
								class="text-sm leading-5 text-center text-gray-300 no-underline font-light hover:underline"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
				<div class="w-full py-6 border-t border-opacity-50 border-primary flex justify-start">
					<address class="text-xs text-white opacity-70 leading-5">
						Academia Brasileira de Beleza Hair School - CNPJ: 09.675.354/0001-00 © Todos os
						direitos reservados. 2023
					</address>
				</div>
			</div>
		</div>
	</div>
</footer>
