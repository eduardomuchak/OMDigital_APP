import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Header } from '../../../components/Header';
import { ImagePicker } from '../../../components/ImagePicker';
import { NetworkStatus } from '../../../components/NetworkStatus';
import { QRCodeScannerModal } from '../../../components/QRCodeScannerModal';
import { CustomButton } from '../../../components/ui/CustomButton';
import { ErrorText } from '../../../components/ui/ErrorText';
import { Input } from '../../../components/ui/Input';
import { TextArea } from '../../../components/ui/TextArea';
import { useAuth } from '../../../contexts/auth';
import useCheckInternetConnection from '../../../hooks/useCheckInternetConnection';
import { Attachment } from '../../../interfaces/Attachment.interface';
import { formatISOStringToPTBRDateString } from '../../../utils/formatISOStringToPTBRDateString';
import {
  RegisterNewRequestFormData,
  registerNewRequestSchema,
} from '../../../validations/solicitante/RegisterNewRequestScreen';
import RedirectToSyncScreen from '../components/RedirectToSyncScreen';
import useCreateRequest from '../hooks/requests/useCreateRequest.hook';

export function RegisterNewRequest() {
  const { goBack } = useNavigation();
  const { user } = useAuth();
  const { isConnected } = useCheckInternetConnection();
  const { createRequestMutation, addRequestToQueue } = useCreateRequest();

  const [attachment, setAttachment] = useState<Attachment>({} as Attachment);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterNewRequestFormData>({
    defaultValues: {
      propertyCode: '',
      counter: '',
      symptom: '',
    },
    resolver: zodResolver(registerNewRequestSchema),
  });

  const now = new Date().toISOString();

  const takeImageHandler = (image: Attachment) => {
    setAttachment(image);
  };

  const onSubmit = (data: RegisterNewRequestFormData) => {
    if (isConnected) {
      if (attachment.uri) {
        const fileName = attachment?.uri.split('/').pop();
        const payload = {
          asset_code: data.propertyCode,
          status: '1',
          counter: data.counter,
          report: data.symptom,
          resp_id: user?.id ? user.id : 0,
          images: {
            name: [fileName],
            tmp_name: [fileName],
            base64: [attachment?.base64],
          },
        };
        createRequestMutation.mutate(payload);
      } else {
        const payload = {
          asset_code: data.propertyCode,
          status: '1',
          counter: data.counter,
          report: data.symptom,
          resp_id: user?.id ? user.id : 0,
        };
        createRequestMutation.mutate(payload);
      }
    } else {
      if (attachment.uri) {
        const fileName = attachment?.uri.split('/').pop();
        const payload = {
          asset_code: data.propertyCode,
          status: '1',
          counter: data.counter,
          report: data.symptom,
          resp_id: user?.id ? user.id : 0,
          images: {
            name: [fileName],
            tmp_name: [fileName],
            base64: [attachment?.base64],
          },
        };
        addRequestToQueue(payload);
        Alert.alert(
          'Atenção',
          'A solicitação será sincronizada quando houver conexão com a internet.',
        );
        reset();
        goBack();
      } else {
        const payload = {
          asset_code: data.propertyCode,
          status: '1',
          counter: data.counter,
          report: data.symptom,
          resp_id: user?.id ? user.id : 0,
        };
        addRequestToQueue(payload);
        Alert.alert(
          'Atenção',
          'A solicitação será sincronizada quando houver conexão com a internet.',
        );
        reset();
        goBack();
      }
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Header title="Abertura de Solicitação" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-neutral-100 px-6 py-4">
          <Text className="font-poppinsBold text-lg">Data de Solicitação:</Text>
          <Text className="font-poppinsMedium text-lg">
            {formatISOStringToPTBRDateString(now)}
          </Text>
        </View>
        <View className="p-6">
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
                  label="Contador"
                  placeholder="Digite o contador"
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
              render={({ field: { onChange, onBlur, value } }) => (
                <TextArea
                  required
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label="Relatar o Problema (Sintoma)"
                  placeholder="Digite o problema"
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
