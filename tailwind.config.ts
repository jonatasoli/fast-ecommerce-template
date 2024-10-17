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
		screens: {
			xs: '0px',

			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '804px',
			// => @media (min-width: 804px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px'
			// => @media (min-width: 1536px) { ... }
		},
		extend: {
			boxShadow: {
				custom: '0 0 1rem #0000001a' // Sombra personalizada
			},
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
				},
				primaryHover: {
					DEFAULT: '#E4A647',
					hover: '#F9E9D2'
				},
				homeBackground: {
					DEFAULT: '#101010'
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
