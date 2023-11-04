import { Alert, ScrollView, Text, View } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Header } from '../../../components/Header';
import { ImagePicker } from '../../../components/ImagePicker';
import { Loading } from '../../../components/Loading';
import { NetworkStatus } from '../../../components/NetworkStatus';
import { CustomButton } from '../../../components/ui/CustomButton';
import { CustomDateTimePicker } from '../../../components/ui/CustomDateTimePicker';
import { ErrorText } from '../../../components/ui/ErrorText';
import { Input } from '../../../components/ui/Input';
import { TextArea } from '../../../components/ui/TextArea';
import { useAuth } from '../../../contexts/auth';
import useCheckInternetConnection from '../../../hooks/useCheckInternetConnection';
import { Attachment } from '../../../interfaces/Attachment.interface';
import { listMaintenanceOrderById } from '../../../services/GET/Maintenance/listMaintenanceOrderById';
import { handleTimezone } from '../../../utils/handleTimezone';
import {
  RegisterNewActivityFormData,
  registerNewActivitySchema,
} from '../../../validations/operador/RegisterNewActivityScreen';
import { OperationInfoCard } from '../../manutencao/components/OperationInfoCard';
import RedirectToSyncScreen from '../components/RedirectToSyncScreen';
import useCreateStage from '../hooks/stages/useCreateStage.hook';

export function RegisterNewActivity() {
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
      endDate: new Date(),
    },
    resolver: zodResolver(registerNewActivitySchema),
  });
  const { goBack } = useNavigation();
  const { user, employee } = useAuth();
  if (!employee?.id) return <></>;

  const { isConnected } = useCheckInternetConnection();
  const { createStageMutation, addActivityToCreateQueue } = useCreateStage();

  const route = useRoute();
  const { id } = route.params as { id: number };

  const [attachment, setAttachment] = useState<Attachment>({} as Attachment);

  const listMaintenanceOrder = useQuery({
    queryKey: ['listMaintenanceOrder'],
    queryFn: () => listMaintenanceOrderById(employee.id),
  });

  if (
    listMaintenanceOrder.isLoading ||
    listMaintenanceOrder.data === undefined
  ) {
    return <Loading />;
  }

  const foundOM = listMaintenanceOrder.data.filter((om) => om.id === id)[0];
  const statusToHideDate = foundOM.status !== 2 && foundOM.status < 4;

  const takeImageHandler = (image: Attachment) => {
    setAttachment(image);
  };

  const onSubmit = (data: RegisterNewActivityFormData) => {
    if (isConnected) {
      if (statusToHideDate) {
        if (!attachment.uri) {
          const payload = {
            maintenance_order_id: id,
            description: data.activity,
            obs: data.note || '',
            start_date: null,
            start_hr: null,
            end_date: null,
            end_hr: null,
            resp_id: user?.id || 0,
          };
          createStageMutation.mutate(payload);
        } else {
          const fileName = attachment.uri.split('/').pop();

          const payload = {
            maintenance_order_id: id,
            description: data.activity,
            obs: data.note || '',
            start_date: null,
            start_hr: null,
            end_date: null,
            end_hr: null,
            resp_id: user?.id || 0,
            images: {
              name: [fileName],
              tmp_name: [fileName],
              base64: [attachment?.base64],
            },
          };
          createStageMutation.mutate(payload);
        }
      } else {
        if (data.startDate.toISOString() === data.endDate.toISOString()) {
          Alert.alert(
            'Erro',
            'A data de início não pode ser igual a data de término',
          );

          return;
        } else if (data.startDate > data.endDate) {
          Alert.alert(
            'Erro',
            'A data de início não pode ser maior que a data de término',
          );
          return;
        } else {
          const datesWithCorrectTimezone = {
            startDate: handleTimezone(data.startDate),
            endDate: handleTimezone(data.endDate),
          };

          const insertDates = {
            ...data,
            startDate: datesWithCorrectTimezone.startDate.toISOString(),
            endDate: datesWithCorrectTimezone.endDate.toISOString(),
          };

          const startDay = insertDates.startDate.split('T')[0];
          const startHour = insertDates.startDate.split('T')[1].split('.')[0];

          const endDay = insertDates.endDate.split('T')[0];
          const endHour = insertDates.endDate.split('T')[1].split('.')[0];

          if (!attachment.uri) {
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
            createStageMutation.mutate(payload);
          } else {
            const fileName = attachment.uri.split('/').pop();

            const payload = {
              maintenance_order_id: id,
              description: insertDates.activity,
              obs: insertDates.note || '',
              start_date: startDay,
              start_hr: startHour,
              end_date: endDay,
              end_hr: endHour,
              resp_id: user?.id || 0,
              images: {
                name: [fileName],
                tmp_name: [fileName],
                base64: [attachment?.base64],
              },
            };
            createStageMutation.mutate(payload);
          }
        }
      }
    } else {
      if (statusToHideDate) {
        if (!attachment.uri) {
          const payload = {
            maintenance_order_id: id,
            description: data.activity,
            obs: data.note || '',
            start_date: null,
            start_hr: null,
            end_date: null,
            end_hr: null,
            resp_id: user?.id || 0,
          };
          addActivityToCreateQueue(payload);
          Alert.alert(
            'Sucesso',
            'A atividade foi adicionada à fila de sincronização e será cadastrada assim que o dispositivo estiver conectado à internet',
          );
          goBack();
        } else {
          const fileName = attachment.uri.split('/').pop();

          const payload = {
            maintenance_order_id: id,
            description: data.activity,
            obs: data.note || '',
            start_date: null,
            start_hr: null,
            end_date: null,
            end_hr: null,
            resp_id: user?.id || 0,
            images: {
              name: [fileName],
              tmp_name: [fileName],
              base64: [attachment?.base64],
            },
          };
          addActivityToCreateQueue(payload);
          Alert.alert(
            'Sucesso',
            'A atividade foi adicionada à fila de sincronização e será cadastrada assim que o dispositivo estiver conectado à internet',
          );
          goBack();
        }
      } else {
        if (data.startDate.toISOString() === data.endDate.toISOString()) {
          Alert.alert(
            'Erro',
            'A data de início não pode ser igual a data de término',
          );

          return;
        } else if (data.startDate > data.endDate) {
          Alert.alert(
            'Erro',
            'A data de início não pode ser maior que a data de término',
          );
          return;
        } else {
          const datesWithCorrectTimezone = {
            startDate: handleTimezone(data.startDate),
            endDate: handleTimezone(data.endDate),
          };

          const insertDates = {
            ...data,
            startDate: datesWithCorrectTimezone.startDate.toISOString(),
            endDate: datesWithCorrectTimezone.endDate.toISOString(),
          };

          const startDay = insertDates.startDate.split('T')[0];
          const startHour = insertDates.startDate.split('T')[1].split('.')[0];

          const endDay = insertDates.endDate.split('T')[0];
          const endHour = insertDates.endDate.split('T')[1].split('.')[0];

          if (!attachment.uri) {
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
            addActivityToCreateQueue(payload);
            Alert.alert(
              'Sucesso',
              'A atividade foi adicionada à fila de sincronização e será cadastrada assim que o dispositivo estiver conectado à internet',
            );
            goBack();
          } else {
            const fileName = attachment.uri.split('/').pop();

            const payload = {
              maintenance_order_id: id,
              description: insertDates.activity,
              obs: insertDates.note || '',
              start_date: startDay,
              start_hr: startHour,
              end_date: endDay,
              end_hr: endHour,
              resp_id: user?.id || 0,
              images: {
                name: [fileName],
                tmp_name: [fileName],
                base64: [attachment?.base64],
              },
            };
            addActivityToCreateQueue(payload);
            Alert.alert(
              'Sucesso',
              'A atividade foi adicionada à fila de sincronização e será cadastrada assim que o dispositivo estiver conectado à internet',
            );
            goBack();
          }
        }
      }
    }
  };

  return (
    <View className="flex flex-1 flex-col bg-white">
      <Header title="Adicionar Nova Etapa" />
      <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1">
        <OperationInfoCard maintenanceOrder={foundOM} />
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
          {statusToHideDate ? null : (
            <>
              <View className="mb-4">
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CustomDateTimePicker
                      value={new Date(value)}
                      onDateSelect={onChange}
                      label="Data e hora de início previsto"
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
                      label="Data e hora de término previsto"
                      mode="datetime"
                    />
                  )}
                  name="endDate"
                />
                {errors.endDate?.message ? (
                  <ErrorText>{errors.endDate?.message}</ErrorText>
                ) : null}
              </View>
            </>
          )}
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
          <View className="mb-5">
            <Text className="mb-1 font-poppinsBold text-sm leading-4 text-neutral-900">
              ANEXO (OPCIONAL)
            </Text>
            <ImagePicker onTakeImage={takeImageHandler} />
          </View>
          <CustomButton variant="primary" onPress={handleSubmit(onSubmit)}>
            Cadastrar
          </CustomButton>
        </View>
      </ScrollView>
      {!isConnected && <NetworkStatus />}
      {isConnected && <RedirectToSyncScreen />}
    </View>
  );
}
