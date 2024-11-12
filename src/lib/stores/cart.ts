import type { CartItem } from '$lib/types';
import { get } from 'svelte/store';
import { isLoading } from '$lib/stores/loading';
import { persisted } from 'svelte-persisted-store';

const serverUrl = import.meta.env.VITE_SERVER_BASE_URL;
export function cartStore() {
	const cart = persisted('cart', {
		uuid: '',
		affiliate: '',
		coupon: '',
		discount: '',
		freight_product_code: 'PAC',
		freight: {
			price: '',
			delivery_time: ''
		},
		zipcode: '',
		subtotal: '0',
		total: '0',
		cart_items: []
	});

	async function createCart() {
		try {
			const res = await fetch(`${serverUrl}/cart/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' }
			});
			if (res.ok) {
				const data = await res.json();
				cart.update((c) => ({ ...c, uuid: data.uuid }));
				return data;
			}
		} catch (err) {
			console.error(err);
		}
	}

	async function addProduct(uuid: string = get(cart).uuid, item: CartItem) {
		try {
			isLoading.set(true);
			const res = await fetch(`${serverUrl}/cart/${uuid}/product`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(item)
			});
			if (res.ok) {
				const data = await res.json();
				console.log('Updated cart data:', data);
				cart.set(data);

				return data;
			}
		} catch (err) {
			console.error(err);
		} finally {
			isLoading.set(false);
		}
	}

	async function addToCart(item: CartItem) {
		if (!item) return;
		let uuid = get(cart).uuid;
		if (!uuid) {
			const data = await createCart();
			uuid = data?.uuid ?? '';
		}
		await addProduct(uuid, item);
	}

	// function clearCart() {
	// 	cart.set(initialCart);
	// }

	return {
		...cart,
		createCart,
		addToCart,
		addProduct
	};
}
