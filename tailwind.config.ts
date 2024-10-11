import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Montserrat', 'sans-serif']
			},
			colors: {
				primary: {
					DEFAULT: '#da9a39',
					dark: '#ac7c34',
					50: '#FDFBF6',
					100: '#FAF2E5',
					200: '#F5E5CB',
					300: '#F0D5AD',
					400: '#EAC68F',
					500: '#E4B671',
					600: '#E0A957',
					700: '#DA9A39',
					800: '#9B681D',
					900: '#4D340E',
					950: '#271A07'
				}
			}
		}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				preset: [] // Desativar temas padrão do Skeleton
			}
		})
	]
} satisfies Config;
