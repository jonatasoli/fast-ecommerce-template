<script lang="ts">
	import { ChevronDoubleLeft, ChevronDoubleRight } from 'svelte-heros-v2';

	export let nextStep: () => void;
	export let previousStep: () => void;
	console.log('hello confirmation');
</script>

<div>
	<span> hello confirmation </span>

	<div class="flex flex-col mt-4 w-full md:flex md:flex-row md:justify-end">
		<button
			class="md:w-28 py-2 md:px-4 my-1 bg-white font-semibold rounded-xl hover:bg-primary-200 transition-all ease-in-out duration-300 hover:bg-opacity-80"
			on:click={previousStep}
		>
			<div class="flex justify-center"><ChevronDoubleLeft /> Voltar</div>
		</button>

		<button
			class="md:w-28 py-2 md:px-4 my-1 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-dark transition-all ease-in-out duration-300 hover:bg-opacity-80"
			on:click={nextStep}
		>
			<div class="flex justify-center"><ChevronDoubleRight /> Próximo</div>
		</button>
	</div>
</div>
