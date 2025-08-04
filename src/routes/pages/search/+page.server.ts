import { VITE_SERVER_BASE_URL } from '$env/static/private';
import { detectCurrencyByLocale } from '$lib/utils';
import { showToast } from '$lib/utils';
import { json, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load = async ({ url, cookies }) => {
	const token = cookies.get('access_token');
	const searchQuery = url.searchParams.get('q') || '';
	const locale = cookies.get('i18n_redirected') || 'pt-BR';
	const currency = detectCurrencyByLocale(locale);

	if (!token) {
		throw redirect(302, '/');
	}

	try {
		
		const response = await fetch(
			`${VITE_SERVER_BASE_URL}/catalog/?search=${encodeURIComponent(searchQuery)}&page=1&offset=16&currency=${currency}`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);

		if (!response.ok) {
			throw new Error('Failed to fetch products');
		}

		const data = await response.json();

		return {
			products: data.products,
			token,
			offset: data.offset,
			page: data.page,
			total_records: data.total_records,
			total_pages: data.total_pages
		};
	} catch {
		
		showToast(`Erro ao buscar produtos`, 'error');
		return json({ success: false, message: 'SERVER_ERROR' }, { status: 500 });
	}
};
