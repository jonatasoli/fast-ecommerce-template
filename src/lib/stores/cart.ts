import type {
	Cart,
	CartAddress,
	CartItem,
	CreditCard,
	CreditCardPayment,
	Payment,
	ShippingAddress,
	User,
	UserAddress
} from '$lib/types';
import { get } from 'svelte/store';
import { hideLoading, isLoading, showLoading } from '$lib/stores/loading';
import { persisted } from 'svelte-persisted-store';
import { address } from './address';

const serverUrl = import.meta.env.VITE_SERVER_BASE_URL;

const initialffiliate: string = '';

const coupon: string = '';

const userData: User = {
	user_id: null,
	name: '',
	email: '',
	phone: '',
	document: ''
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
	installments: 0,
	installmentsMessage: '',
	typeDocument: '',
	document: ''
};

const initialPayment: Payment = {
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
	shipping_address_id: 0,
	user_address_id: 0,
	shipping_is_payment: false,
	subtotal_with_fee: 0,
	total_with_fee: 0
};

export function cartStore() {
	const cart = persisted<Cart>('cart', initialCart);
	const creditCard = persisted('creditCard', paymentCreditCard);
	const affiliate = persisted('affiliate', initialffiliate);
	const user = persisted('user', userData);
	const payment = persisted('payment', initialPayment);

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

	function getPaymentCreditCard() {
		const message = get(creditCard);

		return message;
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

	function clearAffiliate() {
		affiliate.set(initialffiliate);
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

			if (!uuid) return;
			showLoading();

			const res = await fetch(`${serverUrl}/cart/${uuid}/user`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
				body: JSON.stringify({
					...currentCart,
					affiliate: currentCart.affiliate ?? '',
					coupon: currentCart.coupon ?? ''
				})
			});

			if (!res) {
				console.log('ERROR_ADD_USER_CART');
			}

			const data = await res.json();

			data.affiliate = data.affiliate ?? '';
			data.coupon = data.coupon ?? '';

			const { user_data: userCart, ...restcart } = data;

			setUserCart(userCart);
			setCart(restcart);
			console.log(currentCart);

			return data;
		} catch (error) {
			console.log('ERROR_ADD_USER_CART', error);
		} finally {
			hideLoading();
		}
	}

	function setUserCart(userCart: User) {
		user.set(userCart);
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

			if (!res) {
				console.error('ERROR_ADD_ADDRESS_CART', res);
				return;
			}

			const data = await res.json();

			const { shipping_is_payment, shipping_address_id, user_address_id, ...restCart } = data;

			setShippingIsPayment(shipping_is_payment);
			setShippingAddress(address.shipping_address ?? null);
			setUserAddress(address.user_address);
			setShippingAddressId(shipping_address_id);
			setUserAddressId(user_address_id);
			setCart(restCart);
		} catch (error) {
			console.error('ERROR_ADD_ADDRESS_CART', error);
		} finally {
			hideLoading();
		}
	}

	function setShippingIsPayment(value: boolean) {
		address.update((addr) => {
			addr.shipping_is_payment = value;
			return addr;
		});
	}

	function setShippingAddress(shippingAddress: ShippingAddress) {
		address.update((addr) => {
			addr.shipping_address = shippingAddress;
			return addr;
		});
	}

	function setUserAddress(userAddress: UserAddress) {
		address.update((addr) => {
			addr.user_address = userAddress;
			return addr;
		});
	}

	function setCart(userCart: Cart) {
		cart.set(userCart);
	}

	function setShippingAddressId(shippingAddressId: number | null) {
		address.update((addr) => {
			addr.shipping_address_id = shippingAddressId;
			return addr;
		});
	}

	function setUserAddressId(userAddressId: number) {
		address.update((addr) => {
			addr.user_address_id = userAddressId;
			return addr;
		});
	}

	function setPayment(paymentUser: Payment) {
		payment.set(paymentUser);
	}

	async function addMercadoPagoCreditCardPayment(payment: CreditCardPayment) {
		try {
			const uuid = get(cart).uuid;
			const currentCart = get(cart);
			const currentUser = get(user);
			const currentAffiliate = get(affiliate);
			const currentAddress = get(address);

			if (!uuid) {
				throw new Error('UUID do carrinho não encontrado.');
			}

			showLoading();

			const res = await fetch(`/api/mercadoPago`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					cart: {
						...currentCart,
						affiliate: currentAffiliate ?? null,
						coupon: coupon ?? null,
						shipping_is_payment: currentAddress?.shipping_is_payment ?? false,
						user_address_id: currentAddress?.user_address_id ?? null,
						user_data: currentUser ?? {}
					},
					payment
				})
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.message || 'Erro ao processar pagamento.');
			}

			const data = await res.json();

			return data;
		} catch (error) {
			console.error('Erro no pagamento:', error);
			throw new Error('ERROR_ADD_MERCADO_PAGO_CREDIT_CARD_PAYMENT');
		} finally {
			hideLoading();
		}
	}

	async function getCartPreview(token: string) {
		try {
			showLoading();
			const uuid = get(cart).uuid;
			if (!uuid) return;

			const res = await fetch(`${serverUrl}/cart/${uuid}/preview`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
			});

			const responseData = await res.json();

			if (!responseData) {
				throw new Error('ERROR_GET_PREVIEW');
			}

			setCart(responseData);
			setUserAddressId(responseData.user_address_id);
			setShippingAddressId(responseData.shipping_address_id);
			setShippingIsPayment(responseData.shipping_is_payment);
			setPayment(responseData);
			return responseData;
		} catch (err) {
			console.error(err);
		} finally {
			hideLoading();
		}
	}
	async function finishCheckout(token: string) {
		const uuid = get(cart).uuid;
		const currentCart = get(cart);
		const currentAffiliate = get(affiliate);
		const currentAddress = get(address);
		const currentPayment = get(payment);

		try {
			if (!uuid) {
				return;
			}

			const res = await fetch(`${serverUrl}/cart/${uuid}/checkout`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
				body: JSON.stringify({
					...currentCart,
					...currentPayment,
					affiliate: currentAffiliate,
					coupon: coupon,
					shipping_is_payment: currentAddress.shipping_is_payment,
					user_address_id: currentAddress.user_address_id,
					shipping_address_id: currentAddress.shipping_address_id
				})
			});
			const data = await res.json();

			if (!data) return;

			console.log(data);

			return data;
		} catch (err) {
			console.error(err);
		}
	}

	return {
		subscribe: cart.subscribe,
		createCart,
		getPaymentCreditCard,
		addUserCart,
		setUserAddress,
		getCartPreview,
		addAddressCart,
		addToCart,
		addProduct,
		clearCart,
		clearAffiliate,
		removeItem,
		setPaymentCreditCard,
		refreshEstimate,
		updateQuantity,
		updateZipcode,
		updateCoupon,
		addMercadoPagoCreditCardPayment,
		finishCheckout
	};
}
