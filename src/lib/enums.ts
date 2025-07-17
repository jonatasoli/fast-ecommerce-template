export enum LOCALES {
	PT_BR = 'pt-br'
}

export enum CURRENCIES {
	'pt-br' = 'BRL'
}

export const CURRENCY_MAP: Record<string, 'BRL' | 'USD' | 'EUR'> = {
	'pt-BR': 'BRL',

	'en-US': 'USD',
	'en-CA': 'USD',
	'en-AU': 'USD',
	'es-MX': 'USD',
	'es-AR': 'USD',
	'en-IN': 'USD',

	'pt-PT': 'EUR',
	'en-GB': 'EUR',
	'fr-FR': 'EUR',
	'de-DE': 'EUR',
	'es-ES': 'EUR',
	'it-IT': 'EUR',
	'nl-NL': 'EUR',
	'fi-FI': 'EUR',
	'el-GR': 'EUR'
};
