import type { Cart, CartItem } from '$lib/types';
import { get } from 'svelte/store';
import { isLoading } from '$lib/stores/loading';
import { persisted } from 'svelte-persisted-store';

const serverUrl = import.meta.env.VITE_SERVER_BASE_URL;

// Estado inicial do carrinho
const initialCart: Cart = {
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
};

export function cartStore() {
	const cart = persisted('cart', initialCart);

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

				cart.set(data);

				return data;
			}
		} catch (err) {
			console.error(err);
		} finally {
			isLoading.set(false);
		}
	}

	async function updateQuantity(productId: number, newQuantity: number) {
		cart.update((state) => {
			// Verifica se a quantidade é válida
			if (newQuantity < 1) return state;

			// Atualiza a quantidade do produto no carrinho
			const updatedItems = state.cart_items.map((item) =>
				item.product_id === productId ? { ...item, quantity: newQuantity } : item
			);

			return {
				...state,
				cart_items: updatedItems
			};
		});
	}

	function updateZipcode(newZipcode: string, freightProductCode: string) {
		cart.update((state) => ({
			...state,
			zipcode: newZipcode,
			freight_product_code: freightProductCode
		}));
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

	function clearCart() {
		cart.set(initialCart);
	}

	function removeItem(id: number) {
		try {
			isLoading.set(true);
			cart.update((currentCart) => {
				const updatedCartItems = currentCart.cart_items.filter((p) => p.product_id !== id);
				const updatedUuid = updatedCartItems.length === 0 ? '' : currentCart.uuid;
				return { ...currentCart, cart_items: updatedCartItems, uuid: updatedUuid };
			});
		} catch (err) {
			console.error(err);
		} finally {
			isLoading.set(false);
		}
	}

	async function refreshEstimate() {
		try {
			isLoading.set(true);
			const currentCart = get(cart);

			const res = await fetch(`${serverUrl}/cart/${currentCart.uuid}/estimate`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					uuid: currentCart.uuid,
					cart_items: currentCart.cart_items,
					subtotal: currentCart.subtotal,
					total: currentCart.total,
					zipcode: currentCart.zipcode,
					freight_product_code: currentCart.freight_product_code,
					coupon: currentCart.coupon,
					affiliate: currentCart.affiliate
				})
			});
			if (res.ok) {
				const data = await res.json();
				cart.set(data);

				return data;
			}
		} catch (err) {
			console.error(err);
		} finally {
			isLoading.set(false);
		}
	}

	return {
		subscribe: cart.subscribe,
		createCart,
		addToCart,
		addProduct,
		clearCart,
		removeItem,
		refreshEstimate,
		updateQuantity,
		updateZipcode
	};
}
