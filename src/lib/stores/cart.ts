import type {
	Cart,
	CartAddress,
	CartItem,
	CartUser,
	CreditCard,
	CreditCardPayment,
	Payment,
	ShippingAddress,
	User,
	UserAddress,
	UserData
} from '$lib/types';
import { get } from 'svelte/store';
import { hideLoading, isLoading, showLoading } from '$lib/stores/loading';
import { persisted } from 'svelte-persisted-store';
import { address } from './address';

const serverUrl = import.meta.env.VITE_SERVER_BASE_URL;

const initialffiliate: string = '';

const coupon: string = '';

const userData: CartUser = {
	user_data: {
		user_id: null,
		name: '',
		email: '',
		phone: '',
		document: ''
	}
};

const initialCart: Cart = {
	uuid: '',
	affiliate: '',
	coupon: '',
	discount: '',
	freight_product_code: 'PAC',
	freight: {
		max_date: '',
		price: '',
		delivery_time: ''
	},
	zipcode: '',
	subtotal: '0',
	total: '0',
	cart_items: []
};

const paymentCreditCard: CreditCard = {
	creditCardNumber: '',
	creditCardName: '',
	creditCardExpiration: '',
	creditCardCvv: '',
	installments: 1,
	installmentsMessage: '',
	typeDocument: '',
	document: ''
};

const payment: Payment = {
	payment_method: '',
	payment_method_id: '',
	payment_intent: '',
	customer_id: '',
	card_token: '',
	pix_qr_code: '',
	pix_qr_code_base64: '',
	pix_payment_id: 0,
	gateway_provider: '',
	installments: 0,
	shipping_address_id: '',
	user_address_id: 0,
	shipping_is_payment: false,
	subtotal_with_fee: 0,
	total_with_fee: 0
};

export function cartStore() {
	const cart = persisted('cart', initialCart);
	const creditCard = persisted('creditCard', paymentCreditCard);
	const affiliate = persisted('affiliate', initialffiliate);
	const user = persisted('user', userData);

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
			if (newQuantity < 1) return state;

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

	function setPaymentCreditCard(paymentCreditCardUser: CreditCard) {
		creditCard.set(paymentCreditCardUser);
	}

	function updateCoupon(newCoupon: string) {
		cart.update((state) => ({
			...state,
			coupon: newCoupon
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
					freight:
						currentCart.zipcode && currentCart.freight
							? {
									max_date: currentCart.freight.max_date,
									delivery_time: currentCart.freight.delivery_time,
									price: currentCart.freight.price
								}
							: null,
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

	async function addUserCart(token: string) {
		try {
			const uuid = get(cart).uuid;
			const currentCart = get(cart);
			const currentUser = get(user);

			if (!uuid) return;
			showLoading();

			const res = await fetch(`${serverUrl}/cart/${uuid}/user`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
				body: JSON.stringify({
					...currentCart,
					affiliate: currentCart.affiliate,
					coupon: currentCart.coupon
				})
			});

			if (!res) {
				console.log('ERROR_ADD_USER_CART');
			}
			const data = await res.json();

			setUserCart(data.user_data);
			console.log('resposta do user:', currentUser);
			return data;
		} catch {
			console.log('ERROR_ADD_USER_CART');
		} finally {
			hideLoading();
		}
	}

	function setUserCart(userCart) {
		user.user_data = userCart;
	}

	async function addAddressCart(address: CartAddress) {
		try {
			const uuid = get(cart).uuid;
			const currentCart = get(cart);
			const currentUser = get(user);

			if (!uuid) return;
			showLoading();

			const res = await fetch(`${serverUrl}/cart/${uuid}/address`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${address.token}` },
				body: JSON.stringify({
					cart: {
						...currentCart,
						affiliate: currentCart.affiliate,
						coupon: currentCart.coupon,
						user_data: currentUser
					},
					address: {
						shipping_is_payment: address.shipping_is_payment,
						user_address: {
							...address.user_address,
							user_id: currentUser.user_id,
							address_id: null,
							active: true,
							address_complement: address.user_address.address_complement || ''
						},
						shipping_address: {
							...address.shipping_address,
							user_id: currentUser.user_id,
							address_id: null,
							active: true,
							address_complement: address.shipping_address?.address_complement || ''
						}
					}
				})
			});

			if (!res.ok) {
				console.error('ERROR_ADD_ADDRESS_CART', res.status);
				return;
			}

			const data = await res.json();

			const { shipping_is_payment, shipping_address_id, user_address_id, ...restCart } = data;

			setShippingIsPayment(shipping_is_payment);
			setShippingAddress(address.shipping_address ?? null);
			setUserAddress(address.user_address);
			setShippingAddressId(shipping_address_id);
			setUserAddressId(user_address_id);
			cart.update((current) => ({
				...current,
				...restCart
			}));
			console.log('Resposta do servidor:', data);
		} catch (error) {
			console.error('ERROR_ADD_ADDRESS_CART', error);
		} finally {
			hideLoading();
		}
	}

	function setShippingIsPayment(value: boolean) {
		address.shipping_is_payment = value;
	}

	function setShippingAddress(shippingAddress: ShippingAddress) {
		address.shipping_address = shippingAddress;
	}

	function setUserAddress(userAddress: UserAddress) {
		address.user_address = userAddress;
	}

	function setShippingAddressId(shippingAddressId: number | null) {
		address.shipping_address_id = shippingAddressId;
	}

	function setUserAddressId(userAddressId: number) {
		address.user_address_id = userAddressId;
	}

	async function addMercadoPagoCreditCardPayment(payment: CreditCardPayment, token: string) {
		try {
			const uuid = get(cart).uuid;
			const currentCart = get(cart);

			if (!uuid) {
				return;
			}
			showLoading();

			const res = await fetch(`${serverUrl}/cart/${uuid}/payment/credit_card`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
				body: JSON.stringify({
					cart: {
						...currentCart,
						affiliate: affiliate,
						coupon: coupon,
						shipping_is_payment: address.shipping_is_payment,
						user_address_id: address.user_address_id,
						user_data: user
					},
					payment
				})
			});

			if (!res) {
				throw new Error('ERROR_ADD_MERCADO_PAGO_CREDIT_CARD_PAYMENT');
			}

			return res.json();
		} catch {
			throw new Error('ERROR_ADD_MERCADO_PAGO_CREDIT_CARD_PAYMENT');
		} finally {
			hideLoading();
		}
	}

	return {
		subscribe: cart.subscribe,
		createCart,
		addUserCart,
		addAddressCart,
		addToCart,
		addProduct,
		clearCart,
		removeItem,
		setPaymentCreditCard,
		refreshEstimate,
		updateQuantity,
		updateZipcode,
		updateCoupon,
		addMercadoPagoCreditCardPayment
	};
}
