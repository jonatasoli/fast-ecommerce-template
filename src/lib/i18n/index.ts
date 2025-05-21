// src/lib/i18n/index.ts
import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';

const defaultLocale = 'pt-BR';

register('pt-BR', () => import('../locale/pt.json'));
register('en-US', () => import('../locale/en.json'));
register('es-ES', () => import('../locale/es.json'));

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? window.navigator.language : defaultLocale
});
