import { superValidate } from 'sveltekit-superforms';
import { fail, redirect } from '@sveltejs/kit';
import { loginSchema } from '$lib/schemas/login';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	// Inicializa o formulário utilizando o schema de validação
	const form = await superValidate(zod(loginSchema));
	return { form };
};

export const actions = {
	default: async ({ request, fetch }) => {
		// Valida os dados do formulário com superValidate
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			// Retorna erro 400 se a validação falhar
			return fail(400, { form });
		}

		const { username, password } = form.data;

		// Exemplo de payload para a API de autenticação
		const payload = {
			username,
			password
		};

		try {
			// Envia a requisição para a API de login
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});

			const data = await res.json();

			// Validação de credenciais
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
