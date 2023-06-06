import { z } from 'zod';

export type EditMaintenanceOrderFormData = z.infer<
  typeof EditMaintenanceOrderSchema
>;

export const EditMaintenanceOrderSchema = z.object({
  symptomDescription: z.string().nonempty('Campo obrigatório'),
});
