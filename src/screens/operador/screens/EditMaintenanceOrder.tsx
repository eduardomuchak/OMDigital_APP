import { useNavigation, useRoute } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Header } from '../../../components/Header';
import { Loading } from '../../../components/Loading';
import { CustomButton } from '../../../components/ui/CustomButton';
import { useAuth } from '../../../contexts/auth';
import { listMaintenanceOrderById } from '../../../services/GET/Maintenance/listMaintenanceOrderById';
import { ListMaintenanceOrder } from '../../../services/GET/Maintenance/listMaintenanceOrderById/interface';
import { editMaintenanceOrder } from '../../../services/POST/OMs/editMaintenanceOrder';
import { OperationInfoCard } from '../../manutencao/components/OperationInfoCard';
import { SymptomCard } from '../components/SymptomCard';

export function EditMaintenanceOrder() {
  const { employee } = useAuth();
  if (!employee?.id) return <></>;

  const { goBack } = useNavigation();
  const route = useRoute();
  const { id: omID } = route.params as { id: number };

  const [omSymptoms, setOmSymptoms] = useState<ListMaintenanceOrder.Symptoms[]>(
    [],
  );
  const [omDetails, setOmDetails] =
    useState<ListMaintenanceOrder.MaintenanceOrder>(
      {} as ListMaintenanceOrder.MaintenanceOrder,
    );

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

  const handleEditSymptom = (editedSymptom: {
    id: number;
    descricao: string;
  }) => {
    const newSymptoms = omSymptoms.map((symptom) => {
      if (symptom.id === editedSymptom.id) {
        return { ...symptom, description: editedSymptom.descricao };
      }
      return symptom;
    });

    setOmSymptoms(newSymptoms);
  };

  const handleDeleteSymptom = (symptom: ListMaintenanceOrder.Symptoms) => {
    // Rule: If the symptom was deleted, just set the st field to 0
    const newSymptoms = omSymptoms.map((omSymptom) => {
      if (omSymptom.id === symptom.id) {
        return { ...omSymptom, st: 0 };
      }
      return omSymptom;
    });

    setOmSymptoms(newSymptoms);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editMaintenanceOrder,
    onSuccess: (response) => {
      const isStatusTrue = response.data.status === true;
      if (isStatusTrue) {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['listMaintenanceOrder'] });
        Alert.alert('Sucesso', response.data.return[0]);
      } else {
        Alert.alert('Erro', response.data.return[0]);
      }
    },
    onError: (error) => {
      Alert.alert('Erro', JSON.stringify(error));
    },
  });

  function handleEditOM() {
    const payload = {
      id: omID,
      counter: omDetails.counter,
      latitude: omDetails.latitude,
      longitude: omDetails.longitude,
      service_type: omDetails.service_type,
      start_prev_date: omDetails.start_prev_date,
      start_prev_hr: omDetails.start_prev_hr,
      end_prev_date: omDetails.end_prev_date,
      end_prev_hr: omDetails.end_prev_hr,
      obs: omDetails.obs,
      symptoms: omSymptoms.map((symptom) => {
        if (symptom.st === 0) {
          return {
            id: symptom.id,
            st: symptom.st,
          };
        } else {
          return {
            id: symptom.id,
            description: symptom.description,
          };
        }
      }),
    };

    mutation.mutate(payload);
    goBack();
  }

  function findOM() {
    if (listMaintenanceOrder.data === undefined) return;
    const foundOM = listMaintenanceOrder.data.filter((om) => om.id === omID);
    setOmDetails(foundOM[0]);
    setOmSymptoms(foundOM[0].symptoms);
  }

  useEffect(() => {
    findOM();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <Header title={'Editar Ordem de Manutenção'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <OperationInfoCard
          maintenanceOrder={
            listMaintenanceOrder.data.filter((om) => om.id === omID)[0]
          }
        />
        <View className="flex-1 px-6 py-4">
          <Text className="mb-3 font-poppinsBold text-lg">Sintomas:</Text>
          {omSymptoms.length > 0 &&
          !omSymptoms.every((symptom) => symptom.st === 0) ? (
            omSymptoms.map((symptom, index) => (
              <View key={symptom.id}>
                {symptom.st === 0 ? null : (
                  <View>
                    <SymptomCard
                      symptom={symptom}
                      onEditSymptom={handleEditSymptom}
                      onDeleteSymptom={handleDeleteSymptom}
                    />
                    {index !== omSymptoms.length - 1 ? (
                      <View className="h-3" />
                    ) : null}
                  </View>
                )}
              </View>
            ))
          ) : (
            <Text className="py-5 text-center font-poppinsMedium text-lg">
              Não há sintomas cadastrados
            </Text>
          )}
          <CustomButton
            variant="primary"
            style={{ marginTop: 20 }}
            onPress={handleEditOM}
          >
            Finalizar
          </CustomButton>
        </View>
      </ScrollView>
    </View>
  );
}
