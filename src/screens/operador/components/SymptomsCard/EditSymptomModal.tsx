import { zodResolver } from '@hookform/resolvers/zod';
import { PencilSimple } from 'phosphor-react-native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { ErrorText } from '../../../../components/ui/ErrorText';
import { CustomModal } from '../../../../components/ui/Modal';
import { TextArea } from '../../../../components/ui/TextArea';
import { Symptom } from '../../../../services/POST/Symptoms/symptom.interface';
import {
  EditMaintenanceOrderFormData,
  EditMaintenanceOrderSchema,
} from '../../../../validations/operador/EditMaintenanceOrderScreen';

interface EditSymptomModalProps {
  symptom: Symptom.SymptomList;
  onEditSymptom: (editedSymptom: { id: number; descricao: string }) => void;
}

export function EditSymptomModal({
  symptom,
  onEditSymptom,
}: EditSymptomModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<EditMaintenanceOrderFormData>({
    defaultValues: {
      symptomDescription: symptom.description,
    },
    resolver: zodResolver(EditMaintenanceOrderSchema),
  });

  function onSubmit() {
    const symptomDescription = getValues('symptomDescription');

    onEditSymptom({ id: symptom.id, descricao: symptomDescription });
    setIsModalVisible(false);
  }

  return (
    <>
      <TouchableOpacity
        className="h-full justify-center rounded-br-lg rounded-tr-lg bg-nepomuceno-dark-blue p-2"
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <PencilSimple size={24} weight="bold" color="white" />
      </TouchableOpacity>

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <Text className="mb-4 text-center font-poppinsBold text-lg">
          Editar Sintoma
        </Text>
        <View className="mb-4">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextArea
                required
                onBlur={onBlur}
                label="Sintoma"
                onChangeText={onChange}
                value={value}
                placeholder="Digite"
              />
            )}
            name="symptomDescription"
          />
          {errors.symptomDescription?.message ? (
            <ErrorText>{errors.symptomDescription?.message}</ErrorText>
          ) : null}
        </View>

        <View className="flex flex-row justify-between">
          <View className="w-[48%]">
            <CustomButton
              variant="cancel"
              onPress={() => setIsModalVisible(false)}
            >
              Cancelar
            </CustomButton>
          </View>
          <View className="w-[48%]">
            <CustomButton variant="primary" onPress={handleSubmit(onSubmit)}>
              Confirmar
            </CustomButton>
          </View>
        </View>
      </CustomModal>
    </>
  );
}
