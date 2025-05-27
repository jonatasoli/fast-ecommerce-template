import { browser } from '$app/environment';
import { locale } from 'svelte-i18n';

export function syncLocaleWithCookie() {
	if (!browser) return;

	const match = document.cookie.match(/(^| )i18n_redirected=([^;]+)/);
	const cookieLocale = match ? decodeURIComponent(match[2]) : null;

	if (cookieLocale) {
		locale.set(cookieLocale);
	}
}
