import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Header } from '../../../components/Header';
import { ImagePicker } from '../../../components/ImagePicker';
import { Loading } from '../../../components/Loading';
import { CustomButton } from '../../../components/ui/CustomButton';
import { ErrorText } from '../../../components/ui/ErrorText';
import { TextArea } from '../../../components/ui/TextArea';
import { useAuth } from '../../../contexts/auth';
import { Attachment } from '../../../interfaces/Attachment.interface';
import { listMaintenanceOrderById } from '../../../services/GET/Maintenance/listMaintenanceOrderById';
import { createNewSymptom } from '../../../services/POST/Symptoms';
import {
  RegisterNewSymptomFormData,
  registerNewSymptomSchema,
} from '../../../validations/operador/RegisterNewSymptomScreen';
import { OperationInfoCard } from '../../manutencao/components/OperationInfoCard';

export function RegisterNewSymptom() {
  const queryClient = useQueryClient();
  const router = useRoute();
  const { id } = router.params as { id: number };
  const { goBack } = useNavigation();
  const { user, employee } = useAuth();
  if (!employee?.id) return <></>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterNewSymptomFormData>({
    defaultValues: {
      symptom: '',
    },
    resolver: zodResolver(registerNewSymptomSchema),
  });

  const [attachment, setAttachment] = useState<Attachment>({} as Attachment);

  const listMaintenanceOrder = useQuery({
    queryKey: ['listMaintenanceOrder'],
    queryFn: () => listMaintenanceOrderById(employee.id),
  });

  const mutation = useMutation({
    mutationFn: createNewSymptom,
    onSuccess: (response) => {
      const isStatusTrue = response.data.status === true;
      if (isStatusTrue) {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });
        Alert.alert('Sucesso', response.data.return[0]);
      } else {
        Alert.alert('Erro', response.data.return[0]);
      }
    },
    onError: (error) => {
      Alert.alert('Erro', JSON.stringify(error));
    },
  });

  const takeImageHandler = (image: Attachment) => {
    setAttachment(image);
  };

  function onSubmit(data: RegisterNewSymptomFormData) {
    if (attachment.uri) {
      const fileName = attachment?.uri.split('/').pop();

      const payload = {
        description: data.symptom,
        resp_id: user?.id || 0,
        maintenance_order_id: id,
        images: {
          name: [fileName],
          tmp_name: [fileName],
          base64: [attachment?.base64],
        },
      };

      mutation.mutate(payload);
    } else {
      const payload = {
        description: data.symptom,
        resp_id: user?.id || 0,
        maintenance_order_id: id,
      };

      mutation.mutate(payload);
    }
    reset();
    goBack();
  }

  if (
    listMaintenanceOrder.isLoading ||
    listMaintenanceOrder.data === undefined
  ) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-white">
      <Header title="Adicionar Novo Sintoma" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <OperationInfoCard
          maintenanceOrder={
            listMaintenanceOrder.data.filter((om) => om.id === id)[0]
          }
        />
        <View className="flex flex-1 justify-between px-6 py-4">
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
                  placeholder="Descreva o sintoma aqui"
                />
              )}
              name="symptom"
            />
            {errors.symptom?.message ? (
              <ErrorText>{errors.symptom?.message}</ErrorText>
            ) : null}
          </View>
          <View className="mb-5">
            <Text className="mb-1 font-poppinsBold text-sm leading-4 text-neutral-900">
              ANEXO (OPCIONAL)
            </Text>
            <ImagePicker onTakeImage={takeImageHandler} />
          </View>
          <CustomButton onPress={handleSubmit(onSubmit)} variant="primary">
            Cadastrar
          </CustomButton>
        </View>
      </ScrollView>
    </View>
  );
}
