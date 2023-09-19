import { useQuery } from '@tanstack/react-query';
import { Funnel } from 'phosphor-react-native';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CustomButton } from '../../../components/ui/CustomButton';
import { CustomModal } from '../../../components/ui/Modal';
import { MultipleSelect } from '../../../components/ui/MultipleSelect';
import { fetchSolicitationsStatus } from '../../../services/GET/Status/fetchSolicitationsStatus';

interface MultipleSelectOption {
  value: number;
  label: string;
}

interface SolicitanteFilterModalProps {
  selectedStatus: number[];
  setSelectedStatus: React.Dispatch<React.SetStateAction<number[]>>;
}

export function SolicitanteFilterModal(props: SolicitanteFilterModalProps) {
  const listRequestStatus = useQuery({
    queryKey: ['listRequestStatus'],
    queryFn: fetchSolicitationsStatus,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [multipleSelectStatusOptions, setMultipleSelectStatusOptions] =
    useState<MultipleSelectOption[]>([]);

  const formattedStatus = useMemo(() => {
    if (listRequestStatus.isLoading || listRequestStatus.data === undefined) {
      return [];
    }
    const sortedStatus = listRequestStatus.data.sort((a, b) =>
      a.description.toLowerCase() > b.description.toLowerCase() ? 1 : -1,
    );
    return sortedStatus.map((status) => ({
      value: status.id,
      label: status.description,
    }));
  }, [listRequestStatus.isLoading, listRequestStatus.data]);

  // const filterMaintenanceOrdersByStatus = (): OM.MaintenanceOrderInfo[] => {
  //   if (selectedStatus.length === 0) {
  //     return allOrdersCopy;
  //   }

  //   const onlyCheckedStatus = allStatusCopy.filter((status) =>
  //     selectedStatus.includes(status.id),
  //   );

  //   const filteredOrders = allOrdersCopy.filter((order) => {
  //     const operation = onlyCheckedStatus.find(
  //       (status) => status.description === order.status,
  //     );
  //     return operation;
  //   });

  //   return filteredOrders;
  // };

  function onConfirm() {
    setIsModalVisible(false);
  }

  useEffect(() => {
    setMultipleSelectStatusOptions(formattedStatus);
  }, [formattedStatus]);

  return (
    <>
      {/* Modal Trigger */}
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <Funnel size={26} color="#1F295B" weight="fill" />
      </TouchableOpacity>

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <ScrollView
          className="max-h-[650px]"
          showsVerticalScrollIndicator={false}
        >
          <Text className="mb-5 font-poppinsBold text-base">
            Selecione as opções de filtro:
          </Text>

          {/* Status */}
          <View className="mb-5">
            <Text className="mb-4 font-poppinsBold text-base">Status:</Text>
            <MultipleSelect
              options={multipleSelectStatusOptions}
              selected={props.selectedStatus}
              setSelected={props.setSelectedStatus}
            />
          </View>

          {/* Modal Footer */}
          <View className="mt-6 flex flex-row justify-between">
            <View className="w-[48%]">
              <CustomButton
                variant="cancel"
                onPress={() => setIsModalVisible(false)}
              >
                Cancelar
              </CustomButton>
            </View>
            <View className="w-[48%]">
              <CustomButton variant="primary" onPress={onConfirm}>
                Confirmar
              </CustomButton>
            </View>
          </View>
        </ScrollView>
      </CustomModal>
    </>
  );
}
