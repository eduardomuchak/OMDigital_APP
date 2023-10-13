import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { Text, View } from 'react-native';
import { FooterRegisteredActivities } from '../../../components/FooterRegisteredActivities';
import { Header } from '../../../components/Header';
import { Loading } from '../../../components/Loading';
import { StatusLegend } from '../../../components/StatusLegend';
import { useAuth } from '../../../contexts/auth';
import { listMaintenanceOrderById } from '../../../services/GET/Maintenance/listMaintenanceOrderById';
import { fetchStagesStatus } from '../../../services/GET/Status/fetchStagesStatus';
import { ActivityCard } from '../components/ActivityCard';
import { CardContainer } from '../components/ActivityCard/CardContainer';
import { OperationInfoCard } from '../components/OperationInfoCard';

export function RegisteredActivities() {
  const { employee } = useAuth();
  if (!employee?.id) return <></>;

  const route = useRoute();
  const { id } = route.params as { id?: number };

  const listMaintenanceOrder = useQuery({
    queryKey: ['listMaintenanceOrder'],
    queryFn: () => listMaintenanceOrderById(employee.id),
  });

  const listStageStatus = useQuery({
    queryKey: ['listStageStatus'],
    queryFn: fetchStagesStatus,
  });

  if (
    listMaintenanceOrder.data === undefined ||
    listStageStatus.data === undefined
  ) {
    return <></>;
  }

  if (listMaintenanceOrder.isLoading || listStageStatus.isLoading) {
    return <Loading />;
  }

  const filteredOM = listMaintenanceOrder.data.filter((om) => om.id === id);

  const controladorInfo = {
    localDeManutencao: filteredOM[0].branch_obj.name,
    controlador: filteredOM[0].asset_maintenance_controller,
    telefone: null, //TODO: add telefone to OM
  };

  return (
    <View className="flex flex-1 flex-col bg-white">
      <Header title={'Etapas Lançadas'} />

      <CardContainer
        headerComponent={
          <>
            <OperationInfoCard maintenanceOrder={filteredOM[0]} />
            <Text className="mb-3 mt-4 px-6 font-poppinsBold text-[18px]">
              Etapas:
            </Text>
            <StatusLegend status={listStageStatus.data} />
          </>
        }
        footerComponent={
          <FooterRegisteredActivities controladorInfo={controladorInfo} />
        }
      >
        {filteredOM[0].stages.length > 0
          ? filteredOM[0].stages.map((activity) => (
              <ActivityCard activity={activity} key={activity.id} />
            ))
          : [
              <View className="flex min-h-[200px] flex-1 flex-row items-center justify-center">
                <Text className="text-center font-poppinsBold text-base">
                  Não há etapas lançadas
                </Text>
              </View>,
            ]}
      </CardContainer>
    </View>
  );
}
