import { ScrollView, View } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Header } from "../../../components/Header";
import { OrderInfoCard } from "../../../components/OrderInfoCard";
import { CustomButton } from "../../../components/ui/CustomButton";
import { CustomDateTimePicker } from "../../../components/ui/CustomDateTimePicker";
import { ErrorText } from "../../../components/ui/ErrorText";
import { Input } from "../../../components/ui/Input";
import { TextArea } from "../../../components/ui/TextArea";
import { OMContext } from "../../../contexts/om-context";
import {
  RegisterNewActivityFormData,
  registerNewActivitySchema,
} from "../../../validations/operador/RegisterNewActivityScreen";

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

  const route = useRoute();
  const omId = route.params as { id: number };

  const { createNewActivity } = useContext(OMContext);

  const onSubmit = (data: RegisterNewActivityFormData) => {
    const payload = {
      ...data,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
    };

    createNewActivity(
      {
        id: Math.random() * 1000,
        descricao: payload.activity,
        status: "Não iniciada",
        dataFimReal: payload.endDate,
        dataInicioPrevista: payload.startDate,
        dataFimPrevista: payload.endDate,
        images: [],
      },
      omId.id
    );

    reset();
    goBack();
  };

  //{"activity": "Nova atv", "endDate": "2023-06-12T18:01:57.826Z", "note": "sim", "startDate": "2023-06-10T17:01:57.826Z"}

  return (
    <View className="flex flex-1 flex-col bg-white">
      <Header title="Adicionar Nova Etapa" />
      <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1">
        <OrderInfoCard />
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
