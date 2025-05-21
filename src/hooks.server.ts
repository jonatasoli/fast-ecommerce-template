import { redirect, type Handle } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';

export const handle: Handle = async ({ event, resolve }) => {
	const lang = event.request.headers.get('accept-language')?.split(',')[0] || 'pt-BR';
	const url = new URL(event.request.url);
	const accessToken = event.cookies.get('access_token');

	const protectedPaths = url.pathname.includes('/pages');
	const isHomePage = url.pathname === '/';

	if (!accessToken && protectedPaths) {
		throw redirect(302, '/');
	}

	if (accessToken && isHomePage) {
		throw redirect(302, '/pages/dashboard');
	}

	const existingLocale = event.cookies.get('i18n_redirected');
	if (!existingLocale) {
		event.cookies.set('i18n_redirected', lang, {
			path: '/',
			maxAge: 60 * 60 * 24 * 30
		});
	}

	locale.set(lang);

	// Resolve a requisição
	const response = await resolve(event);
	return response;
};
