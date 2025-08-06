<script>
	import Confirmation from '$lib/components/checkout/confirmation/confirmation.svelte';
	import Finish from '$lib/components/checkout/finish/finish.svelte';
	import Payment from '$lib/components/checkout/payment/payment.svelte';
	import Shipping from '$lib/components/checkout/shipping/shipping.svelte';
	import { isLoading } from '$lib/stores/loading';

	export let data;

	let activeStep = 2;
	const steps = [
		{ number: 1, label: 'Login', isActive: false },
		{ number: 2, label: 'Entrega', isActive: true },
		{ number: 3, label: 'Pagamento', isActive: false },
		{ number: 4, label: 'Confirmação', isActive: false },
		{ number: 5, label: 'finish', isActive: false }
	];

	
	function nextStep() {
		$isLoading = true;
		if (activeStep < steps.length) {
			activeStep++;

			$isLoading = false;
		}
		$isLoading = false;
	}

	
	function previousStep() {
		$isLoading = true;
		if (activeStep > 1) {
			activeStep--;
			$isLoading = false;
		}
		$isLoading = false;
	}
</script>

<div class="flex flex-col items-center h-full p-4">
	
	<div
		class="hidden sm:flex w-full h-full mt-8 sm:w-3/4 items-center justify-center text-sm text-gray-500 font-medium sm:text-base"
	>
		{#each steps as step, index}
			<li class="flex items-center justify-between w-full">
				<div class="flex items-center whitespace-nowrap">
					<span
						class="w-6 h-6 lg:w-10 lg:h-10 border rounded-full flex justify-center items-center mr-3 text-sm
				{step.number === activeStep
							? 'text-white bg-primary-600 border-primary-200'
							: 'text-gray-400 bg-gray-100 border-gray-200'}"
					>
						{step.number}
					</span>
					{step.label}
				</div>

				{#if index < steps.length - 1}
					<div class="flex-grow mx-2 border-t border-gray-300"></div>
				{/if}
			</li>
		{/each}
	</div>

	<!-- Renderizar o componente correspondente ao passo ativo -->
	<div class="w-full h-full mt-8 flex flex-col items-center justify-center">
		{#if activeStep === 2}
			<Shipping {nextStep} {previousStep} {data} />
		{:else if activeStep === 3}
			<Payment {nextStep} {previousStep} {data} />
		{:else if activeStep === 4}
			<Confirmation {nextStep} {previousStep} {data} />
		{:else if activeStep === 5}
			<Finish {data} />
		{/if}
	</div>
</div>
