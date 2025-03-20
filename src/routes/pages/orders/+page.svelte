<script lang="ts">
	import { getStatusTranslation } from '$lib/utils.js';

	export let data;

	const orders = data.orders;

	function statusColor(status: string) {
		return status === 'PAYMENT_PENDING' ? 'text-primary-600' : 'text-green-600';
	}

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('pt-BR').format(date);
	}
</script>

<div class="flex flex-col items-center gap-4 p-4">
	<h2 class="text-lg font-semibold text-primary-500">Meus pedidos</h2>
	{#each orders as order}
		<div class="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full max-w-xl">
			<h2 class="text-lg font-bold text-primary-500">Pedido {order.order_id}</h2>
			<p class="text-sm text-gray-600">
				<strong>Status:</strong>
				<span class="font-medium {statusColor(order.order_status)}">
					{getStatusTranslation(order.order_status)}
				</span>
			</p>
			<p class="text-sm text-gray-600"><strong>Data:</strong> {formatDate(order.order_date)}</p>

			<div class="mt-2 border-t py-2">
				{#each order.products as products}
					<p class="text-sm font-semibold text-gray-900">{products.name}</p>
					<p class="text-sm text-gray-600">
						<strong>Valor unitário:</strong> R$ {products.price}
					</p>
					<p class="text-sm text-gray-600"><strong>Quantidade:</strong> {products.quantity}</p>
				{/each}
			</div>
		</div>
	{/each}
</div>
