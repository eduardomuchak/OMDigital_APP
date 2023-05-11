import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import { Header } from '../../../components/Header';
import { ImagePicker } from '../../../components/ImagePicker';
import { CustomButton } from '../../../components/ui/CustomButton';
import { ErrorText } from '../../../components/ui/ErrorText';
import { Input } from '../../../components/ui/Input';
import { TextArea } from '../../../components/ui/TextArea';
import { formatISOStringToPTBRDateString } from '../../../utils/formatISOStringToPTBRDateString';
import {
  RegisterNewRequestFormData,
  registerNewRequestSchema,
} from '../../../validations/RegisterNewRequestScreen';

export interface AttachmentProps {
  assetId?: null;
  base64: string;
  duration?: null;
  exif?: null;
  height: number;
  rotation?: null;
  type: string;
  uri: string;
  width: number;
}

export function RegisterNewRequest() {
  const { goBack } = useNavigation();

  const [attachment, setAttachment] = useState<AttachmentProps>(
    {} as AttachmentProps,
  );
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

  const now = new Date().toISOString();

  const takeImageHandler = (image: AttachmentProps) => {
    console.log('IMAGE URI =>', image.uri);
    setAttachment(image);
  };

  const onSubmit = (data: RegisterNewRequestFormData) => {
    const payload = {
      ...data,
      attachment: attachment ? attachment.base64 : null,
    };

    console.log('DADOS =>', payload);
    setAttachment({} as AttachmentProps);
    reset();
    goBack();
  };

  return (
    <View className="bg-white flex-1">
      <Header title="Abertura de Solicitação" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-neutral-100 py-4 px-6">
          <Text className="font-poppinsBold text-lg">Data de Solicitação:</Text>
          <Text className="font-poppinsMedium text-lg">
            {formatISOStringToPTBRDateString(now)}
          </Text>
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
                  placeholder="Digite o código do bem"
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
                  placeholder="Digite o contador"
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
            <Text className="font-poppinsBold text-sm leading-4 text-neutral-900 mb-1">
              ANEXO (OPCIONAL)
            </Text>
            <ImagePicker onTakeImage={takeImageHandler} />
          </View>

          <CustomButton variant="primary" onPress={handleSubmit(onSubmit)}>
            Cadastrar
          </CustomButton>
        </View>
      </ScrollView>
    </View>
  );
}
