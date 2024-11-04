import { SERVER_BASE_URL } from '$env/static/private';
import { json, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load = async ({ cookies }) => {
	const token = cookies.get('access_token');
	const document = cookies.get('userDocument');

	if (!token) {
		throw redirect(302, '/');
	}

	try {
		const res = await fetch(`${SERVER_BASE_URL}/user/${document}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!res) {
			throw new Error('Failed to fetch categories or Document');
		}

		const user = await res.json();
		return {
			token,
			user
		};
	} catch (error) {
		console.error('Error fetching categories:', error);
		return json({ success: false, message: 'SERVER_ERROR' }, { status: 500 });
	}
};
