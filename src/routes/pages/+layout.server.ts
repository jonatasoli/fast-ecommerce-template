import { SERVER_BASE_URL } from '$env/static/private';
import { json, redirect } from '@sveltejs/kit';
/** @type {import('./$types').PageLoad} */
export const load = async ({ cookies }) => {
	const token = cookies.get('access_token');

	if (!token) {
		throw redirect(302, '/');
	}

	try {
		const response = await fetch(`${SERVER_BASE_URL}/catalog/categories`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!response.ok) {
			throw new Error('Failed to fetch categories');
		}

		const data = await response.json();
		return {
			categories: data.categories
		};
	} catch (error) {
		console.error('Error fetching categories:', error);
		return json({ success: false, message: 'SERVER_ERROR' }, { status: 500 });
	}
};
