import { z } from 'zod';

export type RegisterNewRequestFormData = z.infer<
  typeof registerNewRequestSchema
>;

export const registerNewRequestSchema = z.object({
  propertyCode: z.string().nonempty('Campo obrigatório'),
  counter: z.string().nonempty('Campo obrigatório'),
  symptom: z.string().nonempty('Campo obrigatório'),
});
