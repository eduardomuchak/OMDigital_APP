import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { ScrollView, Text, View } from 'react-native';
import { Header } from '../../../components/Header';
import { Loading } from '../../../components/Loading';
import { CustomButton } from '../../../components/ui/CustomButton';
import { fetchOMFromAPI } from '../../../services/GET/OMs/fetchAllOms/fetchOM';
import { OperationInfoCard } from '../../manutencao/components/OperationInfoCard';
import { SymptomCard } from '../components/SymptomCard';

export function EditMaintenanceOrder() {
  const route = useRoute();
  const { id: omID } = route.params as { id: number };

  const listMaintenanceOrder = useQuery({
    queryKey: ['listMaintenanceOrder'],
    queryFn: fetchOMFromAPI,
  });

  if (
    listMaintenanceOrder.isLoading ||
    listMaintenanceOrder.data === undefined
  ) {
    return <Loading />;
  }

  const foundOM = listMaintenanceOrder.data.filter((om) => om.id === omID);
  const omSymptoms = foundOM[0].symptoms;

  // const operationInfoProps = {
  //   codigoBem: filteredOM[0]?.codigoBem,
  //   ordemManutencao: filteredOM[0]?.ordemManutencao,
  //   operacao: filteredOM[0]?.operacao,
  //   paradaReal: filteredOM[0]?.paradaReal,
  //   prevFim: filteredOM[0]?.prevFim,
  //   latitude: filteredOM[0]?.latitude,
  //   longitude: filteredOM[0]?.longitude,
  //   contador: filteredOM[0]?.contador,
  //   tipo: filteredOM[0]?.tipo,
  // };

  const { goBack } = useNavigation();

  const handleEditSymptom = (editedSymptom: {
    id: number;
    descricao: string;
  }) => {
    // const editedOm = om.map((om) => {
    //   if (om.id === omID) {
    //     const updatedSymptoms = om.sintomas.map((symptom) => {
    //       if (symptom.id === editedSymptom.id) {
    //         return {
    //           ...symptom,
    //           descricao: editedSymptom.descricao,
    //         };
    //       }
    //       return symptom;
    //     });
    //     return { ...om, sintomas: updatedSymptoms };
    //   }
    //   return om;
    // });
    // setOm(editedOm);
  };

  function handleEditOM() {
    goBack();
  }

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
            <>
              <SymptomCard
                key={symptom.id}
                symptom={symptom}
                onEditSymptom={handleEditSymptom}
              />
              {index !== omSymptoms.length - 1 ? (
                <View className="h-3" />
              ) : null}
            </>
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
