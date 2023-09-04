import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Header } from '../../../components/Header';
import { CustomButton } from '../../../components/ui/CustomButton';
import { ErrorText } from '../../../components/ui/ErrorText';
import { TextArea } from '../../../components/ui/TextArea';
import { useAuth } from '../../../contexts/auth';
import { OMContext } from '../../../contexts/om-context';
import {
  RegisterNewSymptomFormData,
  registerNewSymptomSchema,
} from '../../../validations/operador/RegisterNewSymptomScreen';
import { OperationInfoCard } from '../../manutencao/components/OperationInfoCard';

export function RegisterNewSymptom() {
  const router = useRoute();
  const { id } = router.params as { id: number };
  const { goBack } = useNavigation();

  const { user } = useAuth();

  const { mappedMaintenanceOrder, registerNewSymptom } = useContext(OMContext);
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

  const filteredOM = mappedMaintenanceOrder.filter((om) => om.id === id);

  const operationInfoProps = {
    codigoBem: filteredOM[0]?.codigoBem,
    ordemManutencao: filteredOM[0]?.ordemManutencao,
    operacao: filteredOM[0]?.operacao,
    paradaReal: filteredOM[0]?.paradaReal,
    prevFim: filteredOM[0]?.prevFim,
    latitude: filteredOM[0]?.latitude,
    longitude: filteredOM[0]?.longitude,
    contador: filteredOM[0]?.contador,
    tipo: filteredOM[0]?.tipo,
  };

  function onSubmit(data: RegisterNewSymptomFormData) {
    // const updatedOM = om.map((om) => {
    //   if (om.id === id) {
    //     return {
    //       ...om,
    //       sintomas: [
    //         ...om.sintomas,
    //         {
    //           id: om.sintomas[om.sintomas.length - 1].id + 1,
    //           descricao: data.symptom,
    //         },
    //       ],
    //     };
    //   }
    //   return om;
    // });
    // setOm(updatedOM);

    const newSymptom = {
      maintenance_order_id: id,
      description: data.symptom,
      resp_id: user?.id || 0,
    };

    try {
      registerNewSymptom(newSymptom);
    } catch (error) {
      console.error(error);
    }

    reset();
    goBack();
  }

  return (
    <View className="flex-1 bg-white">
      <Header title="Adicionar Novo Sintoma" />
      <OperationInfoCard operationInfo={operationInfoProps} />
      <View className="px-6 py-4">
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
                placeholder="Digite"
              />
            )}
            name="symptom"
          />
          {errors.symptom?.message ? (
            <ErrorText>{errors.symptom?.message}</ErrorText>
          ) : null}
        </View>
        <CustomButton onPress={handleSubmit(onSubmit)} variant="primary">
          Cadastrar
        </CustomButton>
      </View>
    </View>
  );
}
