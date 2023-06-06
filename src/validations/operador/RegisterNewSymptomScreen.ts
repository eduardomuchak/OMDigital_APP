import { z } from 'zod';

export type RegisterNewSymptomFormData = z.infer<
  typeof registerNewSymptomSchema
>;

export const registerNewSymptomSchema = z.object({
  symptom: z.string().nonempty('Campo obrigatório'),
});
