import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
	name: 'my-custom-theme',
	properties: {
		'--theme-font-family-base': `Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '8px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px solid #e0e0e0',

		'--color-primary-50': '249 240 225',
		'--color-primary-100': '248 235 215',
		'--color-primary-200': '246 230 206',
		'--color-primary-300': '240 215 176',
		'--color-primary-400': '229 184 116',
		'--color-primary-500': '218 154 57',
		'--color-primary-600': '196 139 51',
		'--color-primary-700': '164 116 43',
		'--color-primary-800': '131 92 34',
		'--color-primary-900': '107 75 28',

		'--color-secondary-50': '243 235 225',
		'--color-secondary-100': '238 229 214',
		'--color-secondary-200': '234 222 204',
		'--color-secondary-300': '222 203 174',
		'--color-secondary-400': '197 163 113',
		'--color-secondary-500': '172 124 52',
		'--color-secondary-600': '155 112 47',
		'--color-secondary-700': '129 93 39',
		'--color-secondary-800': '103 74 31',
		'--color-secondary-900': '84 61 25',

		'--color-tertiary-50': '219 219 219',
		'--color-tertiary-100': '207 207 207',
		'--color-tertiary-200': '195 195 195',
		'--color-tertiary-300': '159 159 159',
		'--color-tertiary-400': '88 88 88',
		'--color-tertiary-500': '16 16 16',
		'--color-tertiary-600': '14 14 14',
		'--color-tertiary-700': '12 12 12',
		'--color-tertiary-800': '10 10 10',
		'--color-tertiary-900': '8 8 8',

		'--color-surface-50': '255 255 255',
		'--color-surface-100': '255 255 255',
		'--color-surface-200': '255 255 255',
		'--color-surface-300': '255 255 255',
		'--color-surface-400': '255 255 255',
		'--color-surface-500': '255 255 255',
		'--color-surface-600': '230 230 230',
		'--color-surface-700': '191 191 191',
		'--color-surface-800': '153 153 153',
		'--color-surface-900': '125 125 125'
	}
};
