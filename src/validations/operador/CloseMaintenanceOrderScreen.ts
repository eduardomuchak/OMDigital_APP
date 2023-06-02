import { z } from 'zod';

export type CloseMaintenanceOrderFormData = z.infer<
  typeof CloseMaintenanceOrderSchema
>;

export const CloseMaintenanceOrderSchema = z.object({
  counter: z.string().nonempty('Campo obrigatório'),
  endDate: z.date().refine((date) => {
    const hour = date.getHours();
    const minutes = date.getMinutes();
    return hour !== 0 || minutes !== 0;
  }, 'Selecione um horário válido'),
  comments: z.string().optional(),
});
