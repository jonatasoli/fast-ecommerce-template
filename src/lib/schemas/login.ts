import { z } from 'zod';

export const loginSchema = z.object({
	username: z
		.string()
		.min(1, 'Usuário é obrigatório')
		.regex(/^\d{11}$/, 'Usuário deve ser um CPF válido de 11 dígitos'),
	password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
});
