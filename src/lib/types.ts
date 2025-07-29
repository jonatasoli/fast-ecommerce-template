export interface Product {
	product_id: number;
	name: string;
	uri: string;
	price: string;
	active: boolean;
	direct_sales: boolean;
	description: {
		content: string;
		composition: string;
		how_to_use: string;
	};
	image_path: string;
	installments_config: number;
	installments_list: null | any[]; // pode ser atualizado para um tipo específico se houver dados estruturados
	discount: number;
	category_id: number;
	showcase: boolean;
	show_discount: boolean;
	height: number;
	width: number;
	weight: number;
	length: number;
	diameter: number;
	quantity: number;
	sku: string;
}

export interface CreditCard {
	creditCardNumber: string;
	creditCardName: string;
	creditCardExpiration: string;
	creditCardCvv: string;
	installments: number;
	installmentsMessage: string;
	typeDocument: string;
	document: string;
}

export interface ResponseProduct {
	product: Product;
	medias: MediaItem[];
}

export interface Address {
	user_id: number;
	street: string;
	street_number: string;
	address_complement: string;
	neighborhood: string;
	city: string;
	state: string;
	country: string;
	zipcode: string;
}

export interface User {
	user_id: number | null;
	name: string;
	document: string;
	phone: string;
	email: string;
}

export interface Cart {
	uuid: string;
	affiliate: string | null;
	coupon: string | null;
	discount: string;
	freight_product_code?: string;
	freight: Freight;
	zipcode: string;
	subtotal: string;
	total: string;
	cart_items: CartItem[];
	orderId?: string;
}

export interface Freight {
	max_date: string;
	price: string;
	delivery_time: string;
}

export interface CartItem {
	product_id: number;
	name: string;
	image_path: string;
	description?: string;
	available_quantity: number;
	quantity: number;
	price: number;
	discount_price: number;
}

export interface CartAddress {
	shipping_is_payment: boolean;
	user_address_id?: number | null;
	shipping_address_id?: number | null;
	user_address: UserAddress;
	shipping_address: ShippingAddress;
	token: string | null;
}

export type BaseAddress = {
	address_id: number | null;
	user_id: number | null;
	country: string;
	city: string;
	state: string;
	neighborhood: string;
	street: string;
	street_number: string;
	address_complement: string | null;
	zipcode: string;
	active: boolean;
};

export type ShippingAddress = BaseAddress | null;

export interface UserAddress {
	active: boolean;
	address_complement: string;
	address_id: number | null;
	city: string;
	country: string;
	neighborhood: string;
	state: string;
	street: string;
	street_number: string;
	user_id: number | null;
	zipcode: string;
}

export interface UserData {
	user_id: number | null;
	name: string;
	email: string;
	phone: string;
	document: string;
}

export interface CartUser {
	user_data: User;
}

export interface Payment {
	payment_method: string;
	payment_method_id: string;
	payment_intent: string;
	customer_id: string;
	card_token: string;
	pix_qr_code: string;
	pix_qr_code_base64: string;
	pix_payment_id: number;
	gateway_provider: string;
	installments: number;
	shipping_address_id: number | null;
	user_address_id: number;
	shipping_is_payment: boolean;
	subtotal_with_fee: number;
	total_with_fee: number;
}

export interface CreditCardPayment {
	payment_gateway: string;
	card_token: string;
	card_issuer: string;
	card_brand: string;
	installments: number;
}

export type PaymentGateway = 'STRIPE' | 'MERCADO_PAGO' | 'PAYPAL';

export interface BaseCreditCardPayment {
	payment_gateway: PaymentGateway;
	installments: number;
}

export interface MercadoPagoCreditCardPayment extends BaseCreditCardPayment {
	card_token: string;
	card_issuer: string;
	card_brand: string;
}

export interface StripeCreditCardPayment extends BaseCreditCardPayment {
	number: string;
	exp_month: number;
	exp_year: number;
	cvc: string;
	name: string;
}

export interface AddPixPaymentMethodResponse {
	success: boolean;
	data: {
		pix_qr_code: string;
		pix_qr_code_base64: string;
		pix_payment_id: number;
	};
}

export interface PixPaymentStatusResponse {
	success: boolean;
	status: string;
	message: string;
}

type Description = {
	content: string;
	composition: string;
	how_to_use: string;
};

type Installments = {
	count: number;
	value: number;
};

type Variant = {
	value: string;
	label: string;
};

export interface MediaItem {
	media_id: string;
	type: 'PHOTO' | 'VIDEO';
	uri: string;
}

export type ProductItem = {
	product_id: number;
	name: string;
	image_path: string;
	category: {
		category_id: number;
		path: string;
		name: string;
	};
	uri: string;
	price: number;
	description?: Description;
	installments_list?: Installments;
	variants?: Variant[];
	direct_sales: boolean;
	discount: number;
	showcase: boolean;
	show_discount: false;
	quantity: number;
	heigth?: number;
	width?: number;
	weigth?: number;
	length?: number;
	sku: string;
};

type Response<T> = {
	success: boolean;
	data?: T;
	error?: string;
};

export interface CartPreview {
	uuid: string;
	affiliate: string;
	cart_items: CartItem[];
	coupon: string;
	discount: string;
	zipcode: string;
	freight_product_code: string;
	freight: Freight;
	subtotal: string;
	total: string;
	user_data: UserData;
	shipping_is_payment: boolean;
	user_address_id: number;
	shipping_address_id: number | null;
	payment_method: string;
	payment_method_id: string;
	payment_intent: string | null;
	customer_id: string;
	card_token: string;
	pix_qr_code: string | null;
	pix_qr_code_base64: string | null;
	pix_payment_id: string | null;
	gateway_provider: string;
	installments: number;
	subtotal_with_fee: string;
	total_with_fee: string;
}

export type CreditCardResponse = Response<Checkout>;
export type PreviewResponse = Response<Checkout>;

export interface Checkout extends Cart, Payment {
	user_data: User;
	shipping_is_payment: boolean;
	user_address_id: number;
	shipping_address_id: number | null;
}
