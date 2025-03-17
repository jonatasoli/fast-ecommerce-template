/** @type {import('./$types').PageLoad} */
export const load = async ({ cookies }) => {
	const token = cookies.get('access_token');

	return {
		token
	};
};
