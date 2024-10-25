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
