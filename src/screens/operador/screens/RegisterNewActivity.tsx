import { ScrollView, View } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { Header } from '../../../components/Header';
import { Loading } from '../../../components/Loading';
import { CustomButton } from '../../../components/ui/CustomButton';
import { CustomDateTimePicker } from '../../../components/ui/CustomDateTimePicker';
import { ErrorText } from '../../../components/ui/ErrorText';
import { Input } from '../../../components/ui/Input';
import { TextArea } from '../../../components/ui/TextArea';
import { useAuth } from '../../../contexts/auth';
import { fetchOMFromAPI } from '../../../services/GET/OMs/fetchAllOms/fetchOM';
import { createNewMaintenanceOrderStage } from '../../../services/POST/Stages';
import {
  RegisterNewActivityFormData,
  registerNewActivitySchema,
} from '../../../validations/operador/RegisterNewActivityScreen';
import { OperationInfoCard } from '../../manutencao/components/OperationInfoCard';

export function RegisterNewActivity() {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterNewActivityFormData>({
    defaultValues: {
      activity: '',
      note: '',
      startDate: new Date(),
      endDate: new Date(new Date().setHours(new Date().getHours() + 1)),
    },
    resolver: zodResolver(registerNewActivitySchema),
  });
  const { goBack } = useNavigation();
  const { user } = useAuth();

  const route = useRoute();
  const { id } = route.params as { id: number };

  const listMaintenanceOrder = useQuery({
    queryKey: ['listMaintenanceOrder'],
    queryFn: fetchOMFromAPI,
  });

  const mutation = useMutation({
    mutationFn: createNewMaintenanceOrderStage,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });
    },
  });

  const onSubmit = (data: RegisterNewActivityFormData) => {
    const insertDates = {
      ...data,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
    };

    const startDay = insertDates.startDate.split('T')[0];
    const startHour = insertDates.startDate.split('T')[1].split('.')[0];

    const endDay = insertDates.endDate.split('T')[0];
    const endHour = insertDates.endDate.split('T')[1].split('.')[0];

    const payload = {
      maintenance_order_id: id,
      description: insertDates.activity,
      obs: insertDates.note || '',
      start_date: startDay,
      start_hr: startHour,
      end_date: endDay,
      end_hr: endHour,
      resp_id: user?.id || 0,
    };

    mutation.mutate(payload);

    reset();
    goBack();
  };

  if (
    listMaintenanceOrder.isLoading ||
    listMaintenanceOrder.data === undefined
  ) {
    return <Loading />;
  }

  return (
    <View className="flex flex-1 flex-col bg-white">
      <Header title="Adicionar Nova Etapa" />
      <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1">
        <OperationInfoCard
          maintenanceOrder={
            listMaintenanceOrder.data.filter((om) => om.id === id)[0]
          }
        />
        <View className="flex flex-1 px-6 py-4">
          <View className="mb-4">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  required
                  label="ETAPA"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="activity"
            />
            {errors.activity?.message ? (
              <ErrorText>{errors.activity?.message}</ErrorText>
            ) : null}
          </View>
          <View className="mb-4">
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <CustomDateTimePicker
                  value={new Date(value)}
                  onDateSelect={onChange}
                  label="Data e hora de início"
                  mode="datetime"
                />
              )}
              name="startDate"
            />
            {errors.startDate?.message ? (
              <ErrorText>{errors.startDate?.message}</ErrorText>
            ) : null}
          </View>
          <View className="mb-4">
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <CustomDateTimePicker
                  value={new Date(value)}
                  onDateSelect={onChange}
                  label="Data e hora de término"
                  mode="datetime"
                />
              )}
              name="endDate"
            />
            {errors.endDate?.message ? (
              <ErrorText>{errors.endDate?.message}</ErrorText>
            ) : null}
          </View>
          <View className="mb-4">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextArea
                  onBlur={onBlur}
                  label="Observações"
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite"
                />
              )}
              name="note"
            />
            {errors.note?.message ? (
              <ErrorText>{errors.note?.message}</ErrorText>
            ) : null}
          </View>
          <CustomButton variant="primary" onPress={handleSubmit(onSubmit)}>
            Cadastrar
          </CustomButton>
        </View>
      </ScrollView>
    </View>
  );
}
