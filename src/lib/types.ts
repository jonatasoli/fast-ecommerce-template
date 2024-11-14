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

export interface ResponseProduct {
	product: Product;
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
	password: string;
	document: string;
	phone: string;
	role_id: number | null;
	email: string;
	full_name: string | null;
	disabled: boolean | null;
	addresses: Address[];
}

export interface Cart {
	uuid: string;
	affiliate: string;
	coupon: string;
	discount: string;
	freight_product_code: string;
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

// types/address.ts
export interface CartAddress {
	shipping_is_payment: boolean;
	user_address_id: number | null;
	shipping_address_id: number | null;
	user_address: UserAddress;
	shipping_address: ShippingAddress;
}

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

export interface User {
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
	shipping_address_id: string;
	user_address_id: number;
	shipping_is_payment: boolean;
	subtotal_with_fee: number;
	total_with_fee: number;
}

export interface CreditCardPayment {
	creditCardNumber: string;
	creditCardName: string;
	creditCardExpiration: string;
	creditCardCvv: string;
	installments: number;
	installmentsMessage: string;
	typeDocument: string;
	document: string;
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
