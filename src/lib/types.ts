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
