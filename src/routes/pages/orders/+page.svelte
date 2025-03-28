<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { hideLoading, showLoading } from '$lib/stores/loading';
	import { currencyFormat, getStatusTranslation, showToast } from '$lib/utils';
	import { onMount } from 'svelte';
	const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

	export let data;

	let orders = data.orders;

	function statusColor(status: string) {
		return status === 'PAYMENT_PENDING' ? 'text-primary-600' : 'text-green-600';
	}

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('pt-BR').format(date);
	}

	async function getOrders() {
		try {
			showLoading();
			const res = await fetch(`${BASE_URL}/order/user/${data.user.user_id}`, {
				headers: {
					Authorization: `Bearer ${data.token}`
				}
			});

			if (!res.ok) {
				throw new Error('Falha ao buscar pedidos');
			}

			const ordersData = await res.json();
			orders = ordersData;
		} catch (err) {
			showToast('Falha ao Buscar Pedidos', 'error');
		} finally {
			hideLoading();
		}
	}

	onMount(() => {
		getOrders();
	});
</script>

<div class="flex flex-col items-center gap-4 p-4">
	<h2 class="text-lg font-semibold text-primary-500">{$_('orderPage.myOrder')}</h2>
	{#each orders as order}
		<div class="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full max-w-xl">
			<h2 class="text-lg font-bold text-primary-500">{$_('orderPage.order')} {order.order_id}</h2>
			<p class="text-sm text-gray-600">
				<strong>{$_('orderPage.status')}</strong>
				<span class="font-medium {statusColor(order.order_status)}">
					{getStatusTranslation(order.order_status)}
				</span>
			</p>
			<p class="text-sm text-gray-600"><strong>{$_('orderPage.date')}</strong> {formatDate(order.order_date)}</p>

			<div class="mt-2 border-t py-2">
				{#each order.products as products}
					<p class="text-sm font-semibold text-gray-900">{products.name}</p>
					<p class="text-sm text-gray-600">
						<strong>{$_('orderPage.unitValue')}</strong>  {currencyFormat(products.price)}
					</p>
					<p class="text-sm text-gray-600"><strong>{$_('orderPage.quantity')}</strong> {products.quantity}</p>
				{/each}
			</div>
		</div>
	{/each}
</div>
