// src/routes/api/user/+server.ts
import { error, type RequestHandler } from '@sveltejs/kit';
import { VITE_SERVER_BASE_URL } from '$env/static/private';
import type { User } from '$lib/types';

export const GET: RequestHandler = async ({ cookies, fetch }) => {
	try {
		const document = cookies.get('userDocument');
		const token = cookies.get('token');

		if (!document || !token) {
			throw error(400, 'USER_NOT_AUTHENTICATED');
		}

		const res = await fetch(`${VITE_SERVER_BASE_URL}/user/${document}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		});

		if (!res.ok) {
			throw error(res.status, res.status === 404 ? 'USER_NOT_FOUND' : 'SERVER_ERROR');
		}

		const data: User = await res.json();

		if (!data || !data.name) {
			throw error(400, 'USER_NOT_FOUND');
		}

		return new Response(JSON.stringify(data), { status: 200 });
	} catch {
		throw error(500, 'SERVER_ERROR');
	}
};
