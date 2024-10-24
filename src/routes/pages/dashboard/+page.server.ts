import { SERVER_BASE_URL } from '$env/static/private';
import { json } from '@sveltejs/kit';
/** @type {import('./$types').PageLoad} */
export const load = async ({ cookies }) => {
	const token = cookies.get('access_token');

	if (!token) {
		return json({ success: false, message: 'Unauthorized' }, { status: 401 });
	}

	try {
		const response = await fetch(`${SERVER_BASE_URL}/catalog/latest`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		const res = await fetch(`${SERVER_BASE_URL}/catalog/categories`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!response.ok && !res) {
			throw new Error('Failed to fetch categories');
		}

		const data = await response.json();
		const result = await res.json();

		return {
			products: data.products,
			categories: result.categories
		};
	} catch (error) {
		console.error('Error fetching categories:', error);
		return json({ success: false, message: 'SERVER_ERROR' }, { status: 500 });
	}
};
