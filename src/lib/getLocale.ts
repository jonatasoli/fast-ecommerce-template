
import { browser } from '$app/environment';
import type { Cookies } from '@sveltejs/kit';

export function getLocale(cookies?: Cookies): string {
	const fallback = 'pt-BR';

	
	if (browser) {
		const match = document.cookie.match(/(?:^|; )i18n_redirected=([^;]*)/);
		return match ? decodeURIComponent(match[1]) : fallback;
	}

	
	if (cookies) {
		return cookies.get('i18n_redirected') ?? fallback;
	}

	
	return fallback;
}
