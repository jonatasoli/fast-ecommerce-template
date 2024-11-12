import { VITE_SERVER_BASE_URL } from '$env/static/private';
import { json, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load = async ({ cookies }) => {
	const token = cookies.get('access_token');
	const document = cookies.get('userDocument');

	if (!token) {
		throw redirect(302, '/');
	}

	try {
		const response = await fetch(`${VITE_SERVER_BASE_URL}/catalog/categories`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		const res = await fetch(`${VITE_SERVER_BASE_URL}/user/${document}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!response.ok && !res) {
			throw new Error('Failed to fetch categories or Document');
		}

		const data = await response.json();
		const user = await res.json();
		return {
			categories: data.categories,
			token,
			user
		};
	} catch (error) {
		console.error('Error fetching categories:', error);
		return json({ success: false, message: 'SERVER_ERROR' }, { status: 500 });
	}
};
