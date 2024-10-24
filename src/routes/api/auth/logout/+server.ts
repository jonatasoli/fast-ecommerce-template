import { json, type Cookies } from '@sveltejs/kit';

export async function POST({ cookies }: { cookies: Cookies }) {
	cookies.delete('access_token', { path: '/' });
	cookies.delete('userDocument', { path: '/' });

	return json({
		success: true
	});
}
