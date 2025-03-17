import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { paymentId } = await request.json();
	const userToken = cookies.get('access_token');

	if (!userToken) {
		return new Response(JSON.stringify({ success: false, message: 'Token não encontrado' }), {
			status: 401
		});
	}

	try {
		const response = await fetch(
			`${import.meta.env.VITE_SERVER_BASE_URL}/payment/payment_status?gateway_payment_id=${paymentId}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userToken}`
				}
			}
		);

		if (!response.ok) {
			return new Response(JSON.stringify({ success: false, message: 'Erro ao buscar status' }), {
				status: response.status
			});
		}

		const data = await response.json();
		return new Response(JSON.stringify({ success: true, data }), { status: 200 });
	} catch (error) {
		console.error('Erro na API:', error);
		return new Response(JSON.stringify({ success: false, message: 'Erro interno do servidor' }), {
			status: 500
		});
	}
};
