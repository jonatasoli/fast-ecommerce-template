/** @type {import('./$types').PageLoad} */
export const load = async ({ cookies }) => {
	const token = cookies.get('access_token');
	const i18nRedirected = cookies.get('i18n_redirected') || null;

	return {
		token,
		i18nRedirected
	};
};
