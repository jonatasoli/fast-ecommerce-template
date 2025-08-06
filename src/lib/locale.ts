import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const supportedFlags = ['br', 'us', 'es', 'pt', 'gb'] as const;
export type SupportedFlag = (typeof supportedFlags)[number];

const localeToFlag: Record<string, SupportedFlag> = {
	'pt-BR': 'br',
	'en-US': 'us',
	'en-GB': 'gb',
	'es-ES': 'es',
	'pt-PT': 'pt'
};

const flagToLocale: Record<SupportedFlag, string> = {
	br: 'pt-BR',
	us: 'en-US',
	gb: 'en-GB',
	es: 'es-ES',
	pt: 'pt-PT'
};


function getInitialFlag(): SupportedFlag {
	if (!browser) return 'br';
	const cookie = document.cookie
		.split('; ')
		.find((c) => c.startsWith('i18n_redirected='))
		?.split('=')[1];
	return localeToFlag[cookie || 'pt-BR'] || 'br';
}


export const locale = writable<SupportedFlag>(getInitialFlag());


export function setLocale(flag: SupportedFlag) {
	locale.set(flag);
	if (browser) {
		document.cookie = `i18n_redirected=${flagToLocale[flag]}; path=/; max-age=31536000`;
	}
	location.reload();
}
