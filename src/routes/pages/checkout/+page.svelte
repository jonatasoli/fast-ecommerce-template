<script>
	import Payment from '$lib/components/checkout/payment/payment.svelte';
	import Shipping from '$lib/components/checkout/shipping/shipping.svelte';
	import { ChevronDoubleRight } from 'svelte-heros-v2';

	let activeStep = 2; // Controle do passo ativo. 2 significa "Entrega"
	const steps = [
		{ number: 1, label: 'Login', isActive: false },
		{ number: 2, label: 'Entrega', isActive: true },
		{ number: 3, label: 'Pagamento', isActive: false },
		{ number: 4, label: 'Confirmação', isActive: false }
	];

	// Avançar para o próximo passo
	function nextStep() {
		if (activeStep < steps.length) {
			activeStep++;
		}
	}

	// Voltar para o passo anterior
	function previousStep() {
		if (activeStep > 1) {
			activeStep--;
		}
	}
</script>

<div class="flex flex-col items-center justify-center h-full p-4">
	<!-- Barra de Progresso dos Passos -->
	<div class="hidden sm:flex items-center text-sm text-gray-500 font-medium sm:text-base">
		{#each steps as step, index}
			<li class="flex items-center md:w-full">
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
					<div class="w-44 h-1 mx-4 xl:mx-8 border-b border-gray-300"></div>
				{/if}
			</li>
		{/each}
	</div>

	<!-- Renderizar o componente correspondente ao passo ativo -->
	<div class="w-full mt-8 flex flex-col items-center">
		{#if activeStep === 2}
			<Shipping {nextStep} {previousStep}  />
		{:else if activeStep === 3}
			<Payment {nextStep} {previousStep} />
		{/if}
	</div>

	<!-- Botões para navegação -->
</div>
