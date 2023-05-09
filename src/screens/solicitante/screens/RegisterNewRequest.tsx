import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Header } from '../../../components/Header';
import { OpenCamera } from '../../../components/OpenCamera';
import { PicturesPreview } from '../../../components/PicturesPreview';
import { CustomButton } from '../../../components/ui/CustomButton';
import { ErrorText } from '../../../components/ui/ErrorText';
import { Input } from '../../../components/ui/Input';
import { TextArea } from '../../../components/ui/TextArea';
import { useNewRequestCameraAttachments } from '../../../contexts/newRequestCameraAttachments';
import {
  RegisterNewRequestFormData,
  registerNewRequestSchema,
} from '../../../validations/RegisterNewRequestScreen';

export function RegisterNewRequest() {
  const { attachments, setAttachments } = useNewRequestCameraAttachments();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterNewRequestFormData>({
    defaultValues: {
      propertyCode: '',
      counter: '',
      comments: '',
    },
    resolver: zodResolver(registerNewRequestSchema),
  });

  const onSubmit = (data: RegisterNewRequestFormData) => {
    console.log('DADOS =>', { ...data, attachments });
    setAttachments([]);
    reset();
  };

  useEffect(() => {
    if (attachments.length) {
      setAttachments([]);
    }
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1">
      <Header title="Abertura de Solicitação" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-neutral-100 py-4 px-6">
          <Text className="font-poppinsBold text-lg">Data de Solicitação:</Text>
          <Text className="font-poppinsMedium text-lg">07/01/2023 - 08h15</Text>
        </View>
        <View className="p-6">
          <View className="mb-4">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  required
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label="Codigo do bem"
                  placeholder="Digite o Código do Bem"
                  maxLength={30}
                />
              )}
              name="propertyCode"
            />
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
                  placeholder="Digite o Contador"
                  maxLength={30}
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
                  label="Relatar o Problema"
                  placeholder="Digite o problema"
                />
              )}
              name="comments"
            />
            {errors.comments?.message ? (
              <ErrorText>{errors.comments?.message}</ErrorText>
            ) : null}
          </View>
          <View className="mb-5">
            {attachments.length > 0 ? (
              <>
                <Text className="font-poppinsBold text-sm leading-4 text-neutral-900 mb-2">
                  ANEXOS
                </Text>
                <PicturesPreview
                  capturedImages={attachments}
                  showCameraButton
                />
              </>
            ) : (
              <OpenCamera label="ANEXO (OPCIONAL)" />
            )}
          </View>

          <CustomButton variant="primary" onPress={handleSubmit(onSubmit)}>
            Cadastrar
          </CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
