import { SERVER_BASE_URL } from '$env/static/private';
import { json } from '@sveltejs/kit';
/** @type {import('./$types').PageLoad} */
export const load = async ({ params, cookies }) => {
	const token = cookies.get('access_token');
	const category = params.category || '';
	const offset = 10;

	if (!token) {
		return json({ success: false, message: 'Unauthorized' }, { status: 401 });
	}

	try {
		const response = await fetch(
			`${SERVER_BASE_URL}/catalog/category/products/${category}?offset=${offset}`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);

		if (!response.ok) {
			throw new Error('Failed to fetch categories');
		}

		const data = await response.json();

		return {
			products: data.products,
			page: data.page,
			offset: data.offset,
			total_records: data.total_records,
			total_pages: data.total_pages,
			path: category
		};
	} catch (error) {
		console.error('Error fetching categories:', error);
		return json({ success: false, message: 'SERVER_ERROR' }, { status: 500 });
	}
};

/** @type {import('@sveltejs/kit').Actions} */
export const actions = {
	changePage: async ({ request, cookies, params }) => {
		const token = cookies.get('access_token');
		const formData = await request.formData();
		const category = params.category;
		const direction = formData.get('direction'); // 'next' ou 'previous'
		let offset = 10;

		if (!token) {
			return json({ success: false, message: 'Unauthorized' }, { status: 401 });
		}

		// Ajusta o offset com base na direção (next ou previous)
		if (direction === 'next') {
			offset += 10;
		} else if (direction === 'previous') {
			offset = Math.max(0, offset - 10); // Garantir que o offset não seja menor que 0
		}

		try {
			const response = await fetch(
				`${SERVER_BASE_URL}/catalog/category/products/${category}?offset=${offset}`,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);

			if (!response.ok) {
				throw new Error('Failed to fetch products');
			}

			const data = await response.json();

			return {
				products: data.products,
				page: Math.floor(offset / 10) + 1,
				offset: data.offset,
				total_records: data.total_records,
				total_pages: data.total_pages,
				path: category
			};
		} catch (error) {
			console.error('Error fetching products:', error);
			return json({ success: false, message: 'SERVER_ERROR' }, { status: 500 });
		}
	}
};
