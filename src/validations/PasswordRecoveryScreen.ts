import { z } from 'zod';

export type PasswordRecoveryFormData = z.infer<typeof passwordRecoverySchema>;

export const passwordRecoverySchema = z.object({
  userCPF: z
    .string()
    .min(11, {
      message: 'CPF deve conter 11 dígitos',
    })
    .max(11)
    .nonempty('Campo obrigatório'),
});
