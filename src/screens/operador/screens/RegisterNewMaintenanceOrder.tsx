import { Alert, ScrollView, View } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text } from 'react-native';
import { Header } from '../../../components/Header';
import { ImagePicker } from '../../../components/ImagePicker';
import { NetworkStatus } from '../../../components/NetworkStatus';
import { QRCodeScannerModal } from '../../../components/QRCodeScannerModal';
import { CustomButton } from '../../../components/ui/CustomButton';
import { CustomDateTimePicker } from '../../../components/ui/CustomDateTimePicker';
import { ErrorText } from '../../../components/ui/ErrorText';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { TextArea } from '../../../components/ui/TextArea';
import { useAuth } from '../../../contexts/auth';
import useCheckInternetConnection from '../../../hooks/useCheckInternetConnection';
import { useGetLocation } from '../../../hooks/useGetLocation';
import { Attachment } from '../../../interfaces/Attachment.interface';
import { NewMaintenanceOrder } from '../../../services/POST/OMs/createNewMaintenanceOrder.ts/newMaintenanceOrder.interface';
import { handleTimezone } from '../../../utils/handleTimezone';
import {
  RegisterNewMaintenanceOrderFormData,
  registerNewMaintenanceOrderSchema,
} from '../../../validations/operador/RegisterNewMaintenanceOrderScreen';
import useRegisterMaintenanceOrder from '../hooks/useRegisterMaintenanceOrder.hook';

export function RegisterNewMaintenanceOrder() {
  const { location } = useGetLocation();
  const { goBack } = useNavigation();
  const { user } = useAuth();
  const { isConnected } = useCheckInternetConnection();
  const { addOMToQueue, createNewMaintenanceOrderMutation } =
    useRegisterMaintenanceOrder();

  const [attachment, setAttachment] = useState<Attachment>({} as Attachment);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterNewMaintenanceOrderFormData>({
    defaultValues: {
      propertyCode: '',
      counter: '',
      startDate: new Date(),
      endDate: new Date(),
      symptom: '',
      type: '',
      obs: '',
    },
    resolver: zodResolver(registerNewMaintenanceOrderSchema),
  });

  const takeImageHandler = (image: Attachment) => {
    setAttachment(image);
  };

  const onSubmit = (data: RegisterNewMaintenanceOrderFormData) => {
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
    }

    if (data.type === 'Selecione') {
      Alert.alert('Erro', 'Selecione um tipo de OS');
      return;
    }

    const datesWithCorrectTimezone = {
      startDate: handleTimezone(data.startDate),
      endDate: handleTimezone(data.endDate),
    };

    const startDate = datesWithCorrectTimezone.startDate.toISOString();
    const endDate = datesWithCorrectTimezone.endDate.toISOString();

    let payload: NewMaintenanceOrder.Payload = {
      asset_code: data.propertyCode.toUpperCase(),
      counter: Number(data.counter),
      latitude: location.latitude,
      longitude: location.longitude,
      service_type: data.type === 'Preventiva' ? 'P' : 'C',
      status: 4,
      start_prev_date: startDate.split('T')[0],
      start_prev_hr: startDate.split('T')[1],
      end_prev_date: endDate.split('T')[0],
      end_prev_hr: endDate.split('T')[1],
      obs: data.obs,
      resp_id: user ? user.id : 0,
      symptoms: [],
    };

    if (isConnected) {
      if (attachment.uri) {
        const fileName = attachment?.uri.split('/').pop();
        const symptoms = [
          {
            id: null,
            description: data.symptom,
            images: {
              name: [fileName],
              tmp_name: [fileName],
              base64: [attachment?.base64],
            },
          },
        ];

        payload.symptoms = symptoms;

        createNewMaintenanceOrderMutation.mutate(payload);
      } else if (!attachment.uri) {
        const symptoms = [
          {
            id: null,
            description: data.symptom,
          },
        ];
        payload.symptoms = symptoms;

        createNewMaintenanceOrderMutation.mutate(payload);
      }
    } else if (!isConnected) {
      if (attachment.uri) {
        const fileName = attachment?.uri.split('/').pop();
        const symptoms = [
          {
            id: null,
            description: data.symptom,
            images: {
              name: [fileName],
              tmp_name: [fileName],
              base64: [attachment?.base64],
            },
          },
        ];
        payload.symptoms = symptoms;

        addOMToQueue(payload);

        Alert.alert(
          'Atenção',
          'Você está offline. A OM será cadastrada assim que você estiver online.',
        );

        reset();
        goBack();
      } else {
        const symptoms = [
          {
            id: null,
            description: data.symptom,
          },
        ];

        payload.symptoms = symptoms;

        addOMToQueue(payload);

        Alert.alert(
          'Sucesso',
          'Ordem de manutenção salva para envio posterior quando a conexão com a internet for reestabelecida.',
        );

        reset();
        goBack();
      }
    }
  };

  return (
    <>
      <View className="flex flex-1 flex-col bg-white">
        <Header title="Cadastrar Ordem de Manutenção" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex flex-1"
        >
          <View className="flex flex-1 px-6 py-4">
            <View className="mb-4">
              <View className="flex flex-row">
                <View className="flex flex-1">
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        required
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        label="Codigo do bem"
                        placeholder="Digite o código do bem"
                        maxLength={30}
                      />
                    )}
                    name="propertyCode"
                  />
                </View>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <QRCodeScannerModal onScan={onChange} />
                  )}
                  name="propertyCode"
                />
              </View>
              {errors.propertyCode?.message ? (
                <ErrorText>{errors.propertyCode?.message}</ErrorText>
              ) : null}
            </View>
            <View className="mb-4">
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    required
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    label="Contador (km/hor)"
                    placeholder="Digite"
                    maxLength={10}
                    keyboardType="numeric"
                  />
                )}
                name="counter"
              />
              {errors.counter?.message ? (
                <ErrorText>{errors.counter?.message}</ErrorText>
              ) : null}
            </View>

            <View className="mb-4">
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CustomDateTimePicker
                    value={new Date(value)}
                    onDateSelect={onChange}
                    label="Data e hora da parada informada"
                    mode="datetime"
                    required
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
                    label="Data e hora da previsão de término"
                    mode="datetime"
                    required
                  />
                )}
                name="endDate"
              />
              {errors.endDate?.message ? (
                <ErrorText>{errors.endDate?.message}</ErrorText>
              ) : null}
            </View>

            <View className="mb-7">
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    required
                    label="TIPO DA OS (Ordem de Serviço)"
                    selected={value}
                    setSelected={onChange}
                    options={['Selecione', 'Preventiva', 'Corretiva']}
                  />
                )}
                name="type"
              />
              {errors.type?.message ? (
                <ErrorText>{errors.type?.message}</ErrorText>
              ) : null}
            </View>

            <View className="mb-4">
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextArea
                    onBlur={onBlur}
                    label="Sintoma"
                    onChangeText={onChange}
                    value={value}
                    placeholder="Digite"
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
                name="obs"
              />
              {errors.obs?.message ? (
                <ErrorText>{errors.obs?.message}</ErrorText>
              ) : null}
            </View>

            <CustomButton variant="primary" onPress={handleSubmit(onSubmit)}>
              Cadastrar
            </CustomButton>
          </View>
        </ScrollView>
        {!isConnected && <NetworkStatus />}
      </View>
    </>
  );
}
