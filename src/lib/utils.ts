import { goto } from '$app/navigation';
import { CURRENCY_MAP } from './enums';
import { getLocale } from './getLocale';
import { hideLoading, showLoading } from './stores/loading';
import { toast } from 'svelte-french-toast';

export function formatDocument(document: string) {
	
	if (/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(document)) {
		return document;
	}

	
	document = document.replace(/\D/g, '');

	
	if (document.length === 11) {
		return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
	}

	
	return document;
}

export function splitDate(date: string): { year: string; month: string } {
	const [year, month] = date.split('-');
	return { year, month };
}
export const locales = [
	{ name: 'Inglês (Estados Unidos)', value: 'en-US', isDefault: false },
	{ name: 'Inglês (Reino Unido)', value: 'en-GB', isDefault: false },
	{ name: 'Português (Brasil)', value: 'pt-BR', isDefault: true },
	{ name: 'Português (Portugal)', value: 'pt-PT', isDefault: false },
	{ name: 'Espanhol (Espanha)', value: 'es-ES', isDefault: false },
	{ name: 'Espanhol (México)', value: 'es-MX', isDefault: false },
	{ name: 'Francês (França)', value: 'fr-FR', isDefault: false },
	{ name: 'Francês (Canadá)', value: 'fr-CA', isDefault: false },
	{ name: 'Alemão (Alemanha)', value: 'de-DE', isDefault: false },
	{ name: 'Italiano (Itália)', value: 'it-IT', isDefault: false },
	{ name: 'Japonês (Japão)', value: 'ja-JP', isDefault: false },
	{ name: 'Chinês Simplificado (China)', value: 'zh-CN', isDefault: false },
	{ name: 'Chinês Tradicional (Taiwan)', value: 'zh-TW', isDefault: false },
	{ name: 'Russo (Rússia)', value: 'ru-RU', isDefault: false },
	{ name: 'Coreano (Coreia do Sul)', value: 'ko-KR', isDefault: false },
	{ name: 'Árabe (Arábia Saudita)', value: 'ar-SA', isDefault: false },
	{ name: 'Holandês (Países Baixos)', value: 'nl-NL', isDefault: false },
	{ name: 'Sueco (Suécia)', value: 'sv-SE', isDefault: false },
	{ name: 'Norueguês (Noruega)', value: 'no-NO', isDefault: false },
	{ name: 'Finlandês (Finlândia)', value: 'fi-FI', isDefault: false }
];

export function convertToSmallestUnit(amount: number): number {
	return Math.round(amount * 100);
}

export function detectCurrencyByLocale(locale: string): 'BRL' | 'USD' | 'EUR' {
	return CURRENCY_MAP[locale] || 'BRL';
}

export const supportedFlags = ['br', 'us', 'es', 'pt', 'gb'] as const;

export const flagLabels: Record<string, string> = {
	br: 'Português (BR)',
	us: 'English (US)',
	es: 'Español',
	gb: 'English (UK)',
	pt: 'Português (PT)'
};

export type SupportedFlag = (typeof supportedFlags)[number];

export function generateURI(productName: string) {
	return productName
		.toString()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-');
}

export function currencyFormatFreight(value: number, freeLabel: string, locale = 'pt-BR'): string {
	if (value === 0.01) {
		return freeLabel;
	}

	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: 'BRL'
	}).format(value);
}

export function currencyFormat(value: number, passedLocale?: string, type: string = ''): string {
	const locale = passedLocale || getLocale();
	const currency = CURRENCY_MAP[locale] || CURRENCY_MAP['pt-BR'];

	const formatter = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency
	});

	if (!value) {
		return formatter.format(0);
	}

	if (type === 'freight') {
		return formatter.format(value);
	}

	return formatter.format(value);
}

export function getRoleName(roleId: number): string {
	switch (roleId) {
		case 1:
			return 'Admin';
		case 2:
			return 'User';
		case 3:
			return 'Partner';
		default:
			return 'Unknown';
	}
}

export function handleNagigateCart() {
	showLoading();
	goto('/pages/cart');
	hideLoading();
}

export function showToast(text: string, type: string) {
	if (type === 'error') {
		toast.error(text, { duration: 3000 });
	}
	if (type === 'success') {
		toast.success(text);
	}
}

export function handleNagigateDashboard() {
	showLoading();
	goto('/pages/dashboard');
	hideLoading();
}

export function setRoleId(roleName: string): number {
	switch (roleName.toUpperCase()) {
		case 'ADMIN':
			return 1;
		case 'USER':
			return 2;
		case 'PARTNER':
			return 3;
		default:
			return 0;
	}
}

export const statusMap: Record<string, string> = {
	PAYMENT_PENDING: 'Pendente',
	PAYMENT_PAID: 'Pago',
	PAYMENT_CANCELLED: 'Cancelado',
	PREPARING_ORDER: 'Preparando',
	SHIPPING_ORDER: 'Enviado',
	GENERATE_INVOICE: 'Nota gerada',
	SHIPPING_COMPLETE: 'Entregue',
	CANCELLED: 'Cancelado'
};

/**
 * Retorna a tradução do status baseado no código do status.
 * @param statusCode - O código do status (ex: 'PAYMENT_PENDING')
 * @returns A tradução do status se encontrada, senão retorna o código original
 */
export function getStatusTranslation(statusCode: string): string {
	return statusMap[statusCode] || statusCode;
}
