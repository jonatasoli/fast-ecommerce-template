<script lang="ts">
	import '../../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import {
		storeHighlightJs,
		initializeStores,
		Drawer,
		getDrawerStore
	} from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import SideBar from '$lib/components/SideBar/SideBar.svelte';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);
	initializeStores();
	const logo = import.meta.env.VITE_URL_LOGO;

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { MagnifyingGlass, ShoppingCart, UserCircle, Bars3 } from 'svelte-heros-v2';
	import PageHeader from '$lib/components/Navigation/Navigation.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	export let data;
	let search = '';
	const drawerStore = getDrawerStore();

	function doSearch() {
		console.log(search);
	}

	function drawerOpen(): void {
		drawerStore.open({});
	}

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<Drawer><SideBar {data} on:close={drawerClose} /></Drawer>
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<AppBar
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
			background="bg-black"
			padding="p-2"
			class="flex justify-center items-center"
		>
			<div slot="lead">
				<div class="flex items-start">
					<button class="sm:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<Bars3 size="30" class="text-primary" />
					</button>
					<div
						class="flex-none inline-flex items-center justify-center h-12 md:h-16 w-[180px] sm:w-[250px]"
					>
						<a href="/pages/dashboard" class="cursor-pointer">
							<img src={logo} alt="Logo" class="h-full w-auto" />
						</a>
					</div>
				</div>
				<div class="flex w-screen items-center justify-center">
					<div class="h-10 flex flex-1 mx-4 sm:hidden w-[300px]">
						<input
							class="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-primary rounded-l-lg py-2 transition duration-300 ease focus:outline-none focus:ring-0 focus:border-primary hover:border-primary shadow-sm focus:shadow"
							placeholder="Digite o que você procura"
						/>
						<button
							class="flex items-center justify-center rounded-r-lg bg-transparent p-2 border border-primary border-l-0 text-sm text-white transition-all shadow-sm hover:shadow focus:bg-primary focus:shadow-none active:bg-primary hover:bg-primary active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
							type="button"
						>
							<MagnifyingGlass class="h-5 w-5 text-primary hover:text-black" />
						</button>
					</div>
				</div>
			</div>
			<div
				slot="trail"
				class="flex space-x-4 items-center justify-center xs:absolute xs:top-0 sm:relative"
			>
				<div
					class="relative h-10 w-full md:w-[400px] max-w-full md:max-w-[400px] sm:w-[200px] hidden sm:flex"
				>
					<input
						class="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-primary rounded-l-lg py-2 transition duration-300 ease focus:outline-none focus:ring-0 focus:border-primary hover:border-primary shadow-sm focus:shadow"
						placeholder="Digite o que você procura"
					/>
					<button
						class="flex items-center justify-center rounded-r-lg bg-transparent p-2 border border-primary border-l-0 text-sm text-white transition-all shadow-sm hover:shadow focus:bg-primary focus:shadow-none active:bg-primary hover:bg-primary active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
	</svelte:fragment>

	<svelte:fragment slot="pageHeader">
		<AppBar padding="p-0" class="hidden sm:flex w-full"><PageHeader {data} /></AppBar>
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
</AppShell>
