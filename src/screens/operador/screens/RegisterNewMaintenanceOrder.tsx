import { ScrollView, View } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { Header } from '../../../components/Header';
import { QRCodeScannerModal } from '../../../components/QRCodeScannerModal';
import { CustomButton } from '../../../components/ui/CustomButton';
import { CustomDateTimePicker } from '../../../components/ui/CustomDateTimePicker';
import { ErrorText } from '../../../components/ui/ErrorText';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { TextArea } from '../../../components/ui/TextArea';
import { useGetLocation } from '../../../hooks/useGetLocation';
import {
  RegisterNewMaintenanceOrderFormData,
  registerNewMaintenanceOrderSchema,
} from '../../../validations/operador/RegisterNewMaintenanceOrderScreen';

export function RegisterNewMaintenanceOrder() {
  const { location } = useGetLocation();
  const { goBack } = useNavigation();

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
      endDate: new Date(new Date().setHours(new Date().getHours() + 1)),
      symptom: '',
      type: '',
    },
    resolver: zodResolver(registerNewMaintenanceOrderSchema),
  });

  const onSubmit = (data: RegisterNewMaintenanceOrderFormData) => {
    const payload = {
      ...data,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
      location,
    };

    // console.log('PAYLOAD =>', payload);
    reset();
    goBack();
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
                    label="Contador"
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
                    label="Sintoma"
                    onChangeText={onChange}
                    value={value}
                    placeholder="Digite"
                    required
                  />
                )}
                name="symptom"
              />
              {errors.symptom?.message ? (
                <ErrorText>{errors.symptom?.message}</ErrorText>
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
                    options={['Preventiva', 'Corretiva']}
                  />
                )}
                name="type"
              />
              {errors.type?.message ? (
                <ErrorText>{errors.type?.message}</ErrorText>
              ) : null}
            </View>

            <CustomButton variant="primary" onPress={handleSubmit(onSubmit)}>
              Cadastrar
            </CustomButton>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
