import { superValidate } from 'sveltekit-superforms';
import { fail, redirect } from '@sveltejs/kit';
import { loginSchema } from '$lib/schemas/login';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	
	const form = await superValidate(zod(loginSchema));
	return { form };
};

export const actions = {
	default: async ({ request, fetch }) => {
	
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
	
			return fail(400, { form });
		}

		const { username, password } = form.data;

	
		const payload = {
			username,
			password
		};

		try {
	
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});

			const data = await res.json();


			if (data.message === 'INVALID_CREDENTIALS') {
				return fail(401, {
					error: 'Credenciais inválidas',
					form
				});
			}

			if (!data.success) {
				return fail(422, {
					error: 'Erro ao fazer login',
					form
				});
			}

			throw redirect(302, '/');
		} catch {
			return fail(500, {
				error: 'Erro no servidor, tente novamente mais tarde',
				form
			});
		}
	}
};
