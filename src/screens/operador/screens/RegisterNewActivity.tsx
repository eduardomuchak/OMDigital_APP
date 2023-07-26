import { ScrollView, View } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Header } from "../../../components/Header";
import { CustomButton } from "../../../components/ui/CustomButton";
import { CustomDateTimePicker } from "../../../components/ui/CustomDateTimePicker";
import { ErrorText } from "../../../components/ui/ErrorText";
import { Input } from "../../../components/ui/Input";
import { TextArea } from "../../../components/ui/TextArea";
import { useAuth } from "../../../contexts/auth";
import { OMContext } from "../../../contexts/om-context";
import {
  getDateWithoutTime,
  getHoursAndMinutes,
} from "../../../utils/formatDates";
import {
  RegisterNewActivityFormData,
  registerNewActivitySchema,
} from "../../../validations/operador/RegisterNewActivityScreen";
import { OperationInfoCard } from "../../manutencao/components/OperationInfoCard";

export function RegisterNewActivity() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterNewActivityFormData>({
    defaultValues: {
      activity: "",
      note: "",
      startDate: new Date(),
      endDate: new Date(new Date().setHours(new Date().getHours() + 1)),
    },
    resolver: zodResolver(registerNewActivitySchema),
  });
  const { goBack } = useNavigation();
  const { user } = useAuth();

  const route = useRoute();
  const omId = route.params as { id: number };

  const { createNewStage, mappedMaintenanceOrder } = useContext(OMContext);

  const onSubmit = (data: RegisterNewActivityFormData) => {
    const payload = {
      ...data,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
    };

    createNewStage({
      maintenance_order_id: omId.id,
      description: payload.activity,
      obs: payload.note || "",
      start_date: getDateWithoutTime(new Date(payload.startDate)),
      start_hr: getHoursAndMinutes(new Date(payload.startDate)),
      end_date: getDateWithoutTime(new Date(payload.endDate)),
      end_hr: getHoursAndMinutes(new Date(payload.endDate)),
      resp_id: user?.id || 0,
    });

    reset();
    goBack();
  };

  const filteredOM = mappedMaintenanceOrder.filter((om) => om.id === omId.id);

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

  return (
    <View className="flex flex-1 flex-col bg-white">
      <Header title="Adicionar Nova Etapa" />
      <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1">
        <OperationInfoCard
          operador={true}
          operationInfo={operationInfoProps}
          operationId={omId.id}
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
