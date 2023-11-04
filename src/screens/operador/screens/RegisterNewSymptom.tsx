import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Header } from '../../../components/Header';
import { ImagePicker } from '../../../components/ImagePicker';
import { Loading } from '../../../components/Loading';
import { NetworkStatus } from '../../../components/NetworkStatus';
import { CustomButton } from '../../../components/ui/CustomButton';
import { ErrorText } from '../../../components/ui/ErrorText';
import { TextArea } from '../../../components/ui/TextArea';
import { useAuth } from '../../../contexts/auth';
import useCheckInternetConnection from '../../../hooks/useCheckInternetConnection';
import { Attachment } from '../../../interfaces/Attachment.interface';
import { listMaintenanceOrderById } from '../../../services/GET/Maintenance/listMaintenanceOrderById';
import {
  RegisterNewSymptomFormData,
  registerNewSymptomSchema,
} from '../../../validations/operador/RegisterNewSymptomScreen';
import { OperationInfoCard } from '../../manutencao/components/OperationInfoCard';
import RedirectToSyncScreen from '../components/RedirectToSyncScreen';
import useCreateSymptoms from '../hooks/symptoms/useCreateSymptom.hook';

export function RegisterNewSymptom() {
  const queryClient = useQueryClient();
  const router = useRoute();
  const { id } = router.params as { id: number };
  const { goBack } = useNavigation();
  const { isConnected } = useCheckInternetConnection();
  const { user, employee } = useAuth();
  const { createSymptomMutation, addSymptomToQueue } = useCreateSymptoms();
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

  const takeImageHandler = (image: Attachment) => {
    setAttachment(image);
  };

  function onSubmit(data: RegisterNewSymptomFormData) {
    if (isConnected) {
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

        createSymptomMutation.mutate(payload);
      } else {
        const payload = {
          description: data.symptom,
          resp_id: user?.id || 0,
          maintenance_order_id: id,
        };

        createSymptomMutation.mutate(payload);
      }
    } else {
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

        addSymptomToQueue(payload);
        Alert.alert(
          'Sucesso',
          'O sintoma foi adicionado à fila de sincronização e será cadastrado assim que o dispositivo estiver conectado à internet.',
        );
        goBack();
      } else {
        const payload = {
          description: data.symptom,
          resp_id: user?.id || 0,
          maintenance_order_id: id,
        };

        addSymptomToQueue(payload);
        Alert.alert(
          'Sucesso',
          'O sintoma foi adicionado à fila de sincronização e será cadastrado assim que o dispositivo estiver conectado à internet.',
        );
        goBack();
      }
    }
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
      {!isConnected && <NetworkStatus />}
      {isConnected && <RedirectToSyncScreen />}
    </View>
  );
}
