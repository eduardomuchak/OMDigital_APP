import { z } from 'zod';

export type PasswordRecoveryCPFFormData = z.infer<
  typeof passwordRecoverySchemaCPF
>;

export type PasswordRecoveryEmailFormData = z.infer<
  typeof passwordRecoverySchemaEmail
>;

export type PasswordRecoverySMSFormData = z.infer<
  typeof passwordRecoverySchemaSMS
>;

export const passwordRecoverySchemaCPF = z.object({
  userCPF: z.string().nonempty('Campo obrigatório').min(11, {
    message: 'O CPF deve conter 11 dígitos',
  }),
});

export const passwordRecoverySchemaEmail = z.object({
  userEmail: z.string().nonempty('Campo obrigatório').email('Email inválido'),
});

export const passwordRecoverySchemaSMS = z.object({
  userSMSNumber: z.string().nonempty('Campo obrigatório').min(11, {
    message: 'O número deve conter 11 dígitos',
  }),
});
