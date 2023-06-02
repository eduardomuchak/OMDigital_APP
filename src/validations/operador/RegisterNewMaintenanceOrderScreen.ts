import { z } from 'zod';

export type RegisterNewMaintenanceOrderFormData = z.infer<
  typeof registerNewMaintenanceOrderSchema
>;

export const registerNewMaintenanceOrderSchema = z.object({
  propertyCode: z.string().nonempty('Campo obrigatório'),
  counter: z.string().nonempty('Campo obrigatório'),
  startDate: z.date(),
  endDate: z.date(),
  symptom: z.string().nonempty('Campo obrigatório'),
});
