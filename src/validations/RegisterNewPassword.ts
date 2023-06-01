import { z } from 'zod';

export type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty('Campo obrigatório')
      .min(6, 'A senha deve conter no mínimo 6 caracteres'),
    passwordConfirmation: z.string().nonempty('Campo obrigatório'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'],
  });
