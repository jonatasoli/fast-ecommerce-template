import { VITE_SERVER_BASE_URL } from '$env/static/private';
import { json, type Cookies } from '@sveltejs/kit';

export async function POST({ request, cookies }: { request: Request; cookies: Cookies }) {
	const token = cookies.get('access_token');
	const requestBody = await request.json();
	const cart = requestBody.cart;

	if (!token) {
		return json({ success: false, message: 'Unauthorized' }, { status: 401 });
	}

	try {
		const response = await fetch(`${VITE_SERVER_BASE_URL}/cart/${cart.uuid}/payment/credit_card`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(requestBody)
		});

		const data = await response.json();
		if (!data.uuid) {
			throw new Error('Failed to fetch credit_card');
		}

		return json({ success: true, data });
	} catch (error) {
		console.error('Failed to fetch credit_card', error);
		return json({ success: false, message: 'SERVER_ERROR' }, { status: 500 });
	}
}
