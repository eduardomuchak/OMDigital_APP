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
    mutation.mutate({
      id: omID,
      symptoms: omSymptoms,
    });
    // goBack();
  }

  function findOMSymptoms() {
    if (listMaintenanceOrder.data === undefined) return;
    const foundOM = listMaintenanceOrder.data.filter((om) => om.id === omID);
    setOmSymptoms(foundOM[0].symptoms);
  }

  useEffect(() => {
    findOMSymptoms();
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
          {omSymptoms.map((symptom, index) => (
            <View key={symptom.id}>
              <SymptomCard
                symptom={symptom}
                onEditSymptom={handleEditSymptom}
              />
              {index !== omSymptoms.length - 1 ? (
                <View className="h-3" />
              ) : null}
            </View>
          ))}
          <CustomButton
            variant="primary"
            style={{ marginTop: 20 }}
            onPress={handleEditOM}
          >
            Editar
          </CustomButton>
        </View>
      </ScrollView>
    </View>
  );
}
