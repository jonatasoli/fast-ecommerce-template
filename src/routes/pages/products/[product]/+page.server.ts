import { VITE_SERVER_BASE_URL } from '$env/static/private';
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
		const response = await fetch(`${VITE_SERVER_BASE_URL}/product/${product}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!response.ok) {
			throw new Error('Failed to fetch product');
		}

		const data: Product = await response.json();

		const res = await fetch(`${VITE_SERVER_BASE_URL}/product/media/${data.uri}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!res.ok) {
			throw new Error('Failed to fetch product medias');
		}

		const dataMedia = await res.json();

		return {
			product: data,
			medias: dataMedia
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
