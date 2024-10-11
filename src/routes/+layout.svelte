<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import logo from '$lib/assets/logo.png';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { MagnifyingGlass, ShoppingCart, UserCircle } from 'svelte-heros-v2';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	let search = '';

	function doSearch() {
		console.log(search);
	}
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->

		<AppBar
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
			background="bg-black "
		>
			<div slot="lead" class="w-1/3">
				<div class="flex-none inline-flex items-center h-12 md:h-16">
					<img src={logo} alt="Gatto Rosa" class="h-full w-auto" />
				</div>
			</div>

			<div slot="trail" class="w-2/3 flex">
				<div class="relative flex">
					<input
						class="w- bg-transparent placeholder:text-slate-400 text-white text-sm border border-primary rounded-l-md py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary shadow-sm focus:shadow"
						placeholder="Digite o que você procura"
					/>
					<button
						class="flex items-center justify-center rounded-r-md bg-transparent p-2 border border-primary border-l-0 text-sm text-white transition-all shadow-sm hover:shadow focus:bg-primary focus:shadow-none active:bg-primary hover:bg-primary active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
						type="button"
					>
						<MagnifyingGlass class="h-5 w-5 text-primary hover:text-black" />
					</button>
				</div>
				<button
					class="flex items-center justify-center rounded-full bg-transparent p-2 transition-all shadow-sm hover:shadow focus:bg-white focus:shadow-none active:bg-white hover:bg-white active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
					type="button"
				>
					<UserCircle size="30" class="text-primary" />
				</button>

				<button
					class="flex items-center justify-center rounded-full bg-transparent p-2 transition-all shadow-sm hover:shadow focus:bg-white focus:shadow-none active:bg-white hover:bg-white active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
					type="button"
				>
					<ShoppingCart size="30" class="text-primary" />
				</button>
			</div>
		</AppBar>
		<!-- <AppBar background="bg-black " style="width: 100%;">
			<div slot="lead" class="flex items-center justify-between">
				<div>
					<div class="flex-none inline-flex items-center h-12 md:h-16">
						<img src={logo} alt="Gatto Rosa" class="h-full w-auto" />
					</div>
					<div class=" max-w-sm min-w-[200px] flex justify-around">
						<div class="relative flex">
							<input
								class="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-primary rounded-l-md pl-10 pr-0 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary shadow-sm focus:shadow"
								placeholder="Digite o que você procura"
							/>
							<button
								class="flex items-center justify-center rounded-r-md bg-transparent p-2 border border-primary border-l-0 text-sm text-white transition-all shadow-sm hover:shadow focus:bg-primary focus:shadow-none active:bg-primary hover:bg-primary active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
								type="button"
							>
								<MagnifyingGlass class="h-5 w-5" />
							</button>
						</div>

						<button
							class="flex items-center justify-center rounded-r-md bg-transparent p-2 border border-primary border-l-0 text-sm text-white transition-all shadow-sm hover:shadow focus:bg-primary focus:shadow-none active:bg-primary hover:bg-primary active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
							type="button"
						>
							<UserCircle class="h-5 w-5" />
						</button>

						<button
							class="flex items-center justify-center rounded-r-md bg-transparent p-2 border border-primary border-l-0 text-sm text-white transition-all shadow-sm hover:shadow focus:bg-primary focus:shadow-none active:bg-primary hover:bg-primary active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
							type="button"
						>
							<ShoppingCart class="h-5 w-5" />
						</button>
					</div>
				</div>
			</div>
		</AppBar> -->
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
