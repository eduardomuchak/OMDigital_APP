import { z } from 'zod';

export type RegisterNewActivityFormData = z.infer<
  typeof registerNewActivitySchema
>;

export const registerNewActivitySchema = z.object({
  activity: z.string().nonempty('Campo obrigatório'),
  note: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
});
