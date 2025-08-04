import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { myCustomTheme } from './src/themes/myCustomTheme';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		screens: {
			xs: '0px',

			sm: '640px',
			

			md: '804px',
			

			lg: '1024px',
			

			xl: '1280px',
			

			'2xl': '1536px'
			
		},
		extend: {
			boxShadow: {
				custom: '0 0 1rem #0000001a'
			},
			fontFamily: {
				sans: ['Montserrat', 'sans-serif']
			}
		}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				preset: [
					'crimson',
					'gold-nouveau',
					'hamlindigo',
					'modern',
					'rocket',
					'sahara',
					'seafoam',
					'skeleton',
					'vintage',
					'wintry'
				],
				custom: [myCustomTheme] 
			}
		})
	]
} satisfies Config;
