// hooks.server.ts
import { redirect, type Handle } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';

export const handle: Handle = async ({ event, resolve }) => {
	const lang = event.request.headers.get('accept-language')?.split(',')[0];
	const url = new URL(event.request.url);
	const accessToken = event.cookies.get('access_token');

	const protectedPaths = url.pathname.includes('/pages');
	const isHomePage = url.pathname === '/';

	if (!accessToken && protectedPaths) {
		throw redirect(302, '/');
	}

	if (accessToken && isHomePage) {
		throw redirect(302, '/pages/dashboard'); // Redireciona para a área autenticada
	}

	if (lang) {
		locale.set(lang);
	}

	const response = await resolve(event);
	return response;
};
