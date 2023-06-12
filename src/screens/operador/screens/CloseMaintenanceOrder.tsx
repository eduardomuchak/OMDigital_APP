import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Header } from '../../../components/Header';
import { CustomButton } from '../../../components/ui/CustomButton';
import { CustomDateTimePicker } from '../../../components/ui/CustomDateTimePicker';
import { ErrorText } from '../../../components/ui/ErrorText';
import { Input } from '../../../components/ui/Input';
import { TextArea } from '../../../components/ui/TextArea';
import {
  CloseMaintenanceOrderFormData,
  CloseMaintenanceOrderSchema,
} from '../../../validations/operador/CloseMaintenanceOrderScreen';
import { CloseMaintenanceOrderCardInfo } from '../components/CloseMaintenanceOrderCardInfo';

export function CloseMaintenanceOrder() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CloseMaintenanceOrderFormData>({
    defaultValues: {
      counter: '',
      endDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        0,
        0,
        0,
      ),
    },
    resolver: zodResolver(CloseMaintenanceOrderSchema),
  });

  const onSubmit = (data: CloseMaintenanceOrderFormData) => {
    const payload = data;
    console.log('PAYLOAD =>', payload);
    reset();
  };

  return (
    <View className="flex flex-1 flex-col bg-white">
      <Header title={'Encerrar Ordem de Manutenção'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CloseMaintenanceOrderCardInfo />
        <View className="px-6">
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
                  required
                  value={new Date(value)}
                  onDateSelect={onChange}
                  label="Data e hora da finalização"
                  mode="datetime"
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
              render={({ field: { onChange, onBlur, value } }) => (
                <TextArea
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label="Comentário"
                  placeholder="Digite o comentário"
                />
              )}
              name="comments"
            />
            {errors.comments?.message ? (
              <ErrorText>{errors.comments?.message}</ErrorText>
            ) : null}
          </View>
          <CustomButton
            variant="finish"
            onPress={handleSubmit(onSubmit)}
            style={{ marginBottom: 20 }}
          >
            Finalizar
          </CustomButton>
        </View>
      </ScrollView>
    </View>
  );
}
