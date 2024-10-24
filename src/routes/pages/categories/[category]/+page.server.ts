import { SERVER_BASE_URL } from '$env/static/private';
import { json } from '@sveltejs/kit';
/** @type {import('./$types').PageLoad} */
export const load = async ({ params, cookies }) => {
	const token = cookies.get('access_token');
	const category = params.category;
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
