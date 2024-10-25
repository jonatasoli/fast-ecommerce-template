import { SERVER_BASE_URL } from '$env/static/private';
import type { Product } from '$lib/types.js';

/** @type {import('./$types').PageLoad} */
export const load = async ({ params, cookies }) => {
	const token = cookies.get('access_token');
	const product = params.product || '';

	if (!token) {
		return {
			error: true,
			status: 401,
			message: 'Unauthorized'
		};
	}

	try {
		const response = await fetch(`${SERVER_BASE_URL}/product/${product}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!response.ok) {
			throw new Error('Failed to fetch product');
		}

		const data: Product = await response.json();

		return {
			product: data
		};
	} catch (error) {
		console.error('Error fetching product:', error);
		return {
			error: true,
			status: 500,
			message: 'SERVER_ERROR'
		};
	}
};
