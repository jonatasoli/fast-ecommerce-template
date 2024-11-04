<script>
	import { _ } from 'svelte-i18n';
	export let data;

	// Importa a função de tradução
</script>

<footer class="w-full font-sans">
	<div class="footer w-full bg-tertiary-500 pt-8">
		<div class="w-full px-4 xl:px-0 flex flex-col items-center">
			<div class=" mb-4">
				<p
					class="m-0 font-light text-primary-500 text-xl leading-6 uppercase pb-4 border-b border-opacity-50 border-primary-500 mb-4"
				>
					{$_('navigation.categories')}
				</p>
				<ul class="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
					{#each data.categories as link}
						<li class="inline-flex items-center min-h-10 uppercase">
							<a
								href={`/pages/categories/${link.path}`}
								class="text-sm leading-5 text-center text-gray-300 no-underline font-light hover:underline"
							>
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
				<div class="w-full py-6 border-t border-opacity-50 border-primary-500 flex justify-start">
					<address class="text-xs text-white opacity-70 leading-5">
						{$_('address')}
					</address>
				</div>
			</div>
		</div>
	</div>
</footer>
