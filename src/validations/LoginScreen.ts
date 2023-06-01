import { z } from 'zod';

export type LoginFormData = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  userCPF: z
    .string()
    .min(11, {
      message: 'O CPF deve conter 11 dígitos',
    })
    .nonempty('Campo obrigatório'),
  password: z
    .string()
    .min(3, {
      message: 'A senha deve conter no mínimo 3 caracteres',
    })
    .max(20)
    .nonempty('Campo obrigatório'),
});
