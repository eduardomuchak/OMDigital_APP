import { Symptom } from '../../Symptoms/symptom.interface';

export interface EditedMaintenanceOrder {
  id: number | string;
  symptoms: Symptom.SymptomList[];
}
