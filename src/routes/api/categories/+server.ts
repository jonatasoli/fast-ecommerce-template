// src/routes/api/categories.ts
import { VITE_SERVER_BASE_URL } from '$env/static/private';
import { json, type Cookies } from '@sveltejs/kit';

export async function GET({ cookies }: { cookies: Cookies }) {
	const token = cookies.get('access_token');

	if (!token) {
		return json({ success: false, message: 'Unauthorized' }, { status: 401 });
	}

	try {
		const response = await fetch(`${VITE_SERVER_BASE_URL}/catalog/categories`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!response.ok) {
			throw new Error('Failed to fetch categories');
		}

		const data = await response.json();
		return json(data); // Retorne as categorias como resposta
	} catch (error) {
		console.error('Error fetching categories:', error);
		return json({ success: false, message: 'SERVER_ERROR' }, { status: 500 });
	}
}
