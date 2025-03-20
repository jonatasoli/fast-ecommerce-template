<script lang="ts">
	import '../../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { _ } from 'svelte-i18n';
	import {
		storeHighlightJs,
		initializeStores,
		Drawer,
		getDrawerStore
	} from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml';
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import SideBar from '$lib/components/SideBar/SideBar.svelte';

	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);
	initializeStores();
	const logo = import.meta.env.VITE_URL_LOGO;

	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { MagnifyingGlass, ShoppingCart, UserCircle, Bars3 } from 'svelte-heros-v2';
	import PageHeader from '$lib/components/Navigation/Navigation.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Loading from '$lib/components/Loading/Loading.svelte';
	import { hideLoading, isLoading, showLoading } from '$lib/stores/loading';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { Toaster } from 'svelte-french-toast';
	import { setSearchQuery } from '$lib/stores/search';

	const popupFeatured: PopupSettings = {
		event: 'click',
		target: 'popupFeatured',
		placement: 'bottom'
	};

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	export let data;
	let search = '';
	let welcomeMessage = $_('userMenu.welcome').replace('{user}', data.user.name || 'Usuário');

	const drawerStore = getDrawerStore();

	function doSearch(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			showLoading();
			setSearchQuery(search);

			goto(`/pages/search?q=${encodeURIComponent(search)}`);

			hideLoading();
		}
	}

	function drawerOpen(): void {
		drawerStore.open({});
	}

	function handleOrders() {
		showLoading();
		goto('/pages/orders');
		hideLoading();
	}

	function drawerClose(): void {
		drawerStore.close();
	}

	async function logout() {
		const resp = await fetch(`/api/auth/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await resp.json();
		if (data.success) {
			goto('/');
		}
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
			background="bg-tertiary-500"
			padding="p-2"
			class="flex justify-center items-center"
		>
			<div slot="lead">
				<div class="flex items-start">
					<button class="sm:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<Bars3 size="30" class="text-primary-500" />
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
							class="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-primary-500 rounded-l-lg py-2 transition duration-300 ease focus:outline-none focus:ring-0 focus:border-primary-500 hover:border-primary-500 shadow-sm focus:shadow"
							placeholder={$_('header.type')}
							bind:value={search}
							on:keydown={doSearch}
						/>
						<button
							class="flex items-center justify-center rounded-r-lg bg-transparent p-2 border border-primary-500 border-l-0 text-sm text-white transition-all shadow-sm hover:shadow focus:bg-primary-500 focus:shadow-none active:bg-primary-500 hover:bg-primary-500 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
							type="button"
						>
							<MagnifyingGlass class="h-5 w-5 text-primary-500 hover:text-black" />
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
						class="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-primary-500 rounded-l-lg py-2 transition duration-300 ease focus:outline-none focus:ring-0 focus:border-primary-500 hover:border-primary-500 shadow-sm focus:shadow"
						placeholder={$_('header.type')}
						bind:value={search}
						on:keydown={doSearch}
					/>
					<button
						class="flex items-center justify-center rounded-r-lg bg-transparent p-2 border border-primary-500 border-l-0 text-sm text-white transition-all shadow-sm hover:shadow focus:bg-primary-500 focus:shadow-none active:bg-primary-500 hover:bg-primary-500 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
						type="button"
					>
						<MagnifyingGlass class="h-5 w-5 text-primary-500 hover:text-black" />
					</button>
				</div>

				<button
					class="flex items-center justify-center rounded-full bg-transparent p-2 transition-all shadow-sm hover:shadow focus:bg-white focus:shadow-none active:bg-white hover:bg-white active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
					type="button"
					use:popup={popupFeatured}
				>
					<UserCircle size="30" class="text-primary-500" />
					{#if !data.token}
						<div
							class="card p-2 w-60 shadow-xl flex items-center justify-center"
							data-popup="popupFeatured"
						>
							<div class="flex items-center justify-center">
								<button
									class="m-1 px-4 py-2 bg-primary-500 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-primary-600 hover:shadow-xl hover:-translate-y-1 focus:ring-4 focus:ring-primary-200 focus:outline-none active:bg-primary-700"
								>
									{$_('userMenu.myAccount')}
								</button>
							</div>
							<div class="arrow bg-surface-100-800-token"></div>
						</div>
					{:else}
						<div
							class="card p-2 w-60 shadow-xl flex items-center justify-center"
							data-popup="popupFeatured"
						>
							<div
								class="flex flex-col w-full items-center justify-center border-primary-500 border-b border-opacity-50 my-1 py-2"
							>
								<span class="text-slate-500 cursor-default w-full hover:text-primary-500">
									{welcomeMessage}
								</span>
							</div>
							<div class="flex flex-col text-slate-500 my-1 py-2">
								<span class="cursor-pointer hover:text-primary-500 transition-colors">
									<a href="/pages/orders">Meus pedidos</a>
								</span>
								<span class="cursor-pointer hover:text-primary-500 transition-colors"
									><a href="/pages/profile">Perfil</a></span
								>
								<span
									class="cursor-pointer hover:text-primary-500 transition-colors"
									on:click={logout}>Sair</span
								>
							</div>
							<div class="arrow bg-surface-100-800-token"></div>
						</div>
					{/if}
				</button>

				<a href="/pages/cart">
					<button
						class="flex items-center justify-center rounded-full bg-transparent p-2 transition-all shadow-sm hover:shadow focus:bg-white focus:shadow-none active:bg-white hover:bg-white active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
						type="button"
					>
						<ShoppingCart size="30" class="text-primary-500" />
					</button>
				</a>
			</div>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="pageHeader">
		<AppBar padding="p-0" class="hidden sm:flex w-full"><PageHeader {data} /></AppBar>
	</svelte:fragment>

	<Loading visible={$isLoading} />
	<Toaster position="top-right" />

	<slot />

	<svelte:fragment slot="pageFooter"><Footer {data} /></svelte:fragment>
</AppShell>

<style>
	[data-popup] {
		/* Display */
		display: none;
		/* Position */
		position: absolute;
		top: 0;
		left: 0;
		/* Transitions */
		transition-property: opacity;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 0.15s;
	}
</style>
