import { VITE_SERVER_BASE_URL } from '$env/static/private';
import { showToast } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load = async ({ cookies }) => {
	const token = cookies.get('access_token');
	const document = cookies.get('userDocument');

	if (!token) {
		throw redirect(302, '/');
	}

	try {
		const response = await fetch(`${VITE_SERVER_BASE_URL}/user/${document}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!response.ok) {
			throw new Error('Falha ao buscar detalhes do usuário');
		}

		const user = await response.json();

		const res = await fetch(`${VITE_SERVER_BASE_URL}/order/user/${user.user_id}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!res.ok) {
			throw new Error('Falha ao buscar pedidos');
		}

		const orders = await res.json();

		return {
			orders,
			token,
			user
		};
	} catch {
		showToast(`Erro ao Buscar Pedidos`, 'error');
		throw redirect(302, '/erro'); 
	}
};
