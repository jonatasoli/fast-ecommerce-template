<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { MagnifyingGlass, ShoppingCart, UserCircle, Bars3 } from 'svelte-heros-v2';

	const logo = import.meta.env.VITE_URL_LOGO;
	let search = '';
	const drawerStore = getDrawerStore();

	function drawerOpen(): void {
		drawerStore.open({});
	}

	function doSearch() {
		console.log(search);
	}
</script>

<div>
	<div class="flex items-center justify-between">
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

		<div class="flex pr-2">
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
				<a href="/pages/cart"><ShoppingCart size="30" class="text-primary" /></a>
			</button>
		</div>
	</div>
	<div class="flex w-screen items-center justify-center">
		<div class="h-10 flex flex-1 mx-4 sm:hidden w-[300px]">
			<input
				class="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-primary-500 rounded-l-lg py-2 transition duration-300 ease focus:outline-none focus:ring-0 focus:border-primary-500 hover:border-primary-500 shadow-sm focus:shadow"
				placeholder="Digite o que você procura"
			/>
			<button
				class="flex items-center justify-center rounded-r-lg bg-transparent p-2 border border-primary-500 border-l-0 text-sm text-white transition-all shadow-sm hover:shadow focus:bg-primary-500 focus:shadow-none active:bg-primary-500 hover:bg-primary-500 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
				type="button"
			>
				<MagnifyingGlass class="h-5 w-5 text-primary-500 hover:text-black" />
			</button>
		</div>
	</div>

	<div
		class="relative h-10 w-full md:w-[400px] max-w-full md:max-w-[400px] sm:w-[200px] hidden sm:flex"
	>
		<input
			class="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-primary-500 rounded-l-lg py-2 transition duration-300 ease focus:outline-none focus:ring-0 focus:border-primary-500 hover:border-primary-500 shadow-sm focus:shadow"
			placeholder="Digite o que você procura"
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
	>
		<UserCircle size="30" class="text-primary" />
	</button>

	<button
		class="flex items-center justify-center rounded-full bg-transparent p-2 transition-all shadow-sm hover:shadow focus:bg-white focus:shadow-none active:bg-white hover:bg-white active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
		type="button"
	>
		<a href="/pages/cart"> <ShoppingCart size="30" class="text-primary-500" /></a>
	</button>
</div>
