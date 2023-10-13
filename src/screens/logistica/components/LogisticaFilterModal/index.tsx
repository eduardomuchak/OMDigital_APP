import { useQuery } from '@tanstack/react-query';
import { Funnel } from 'phosphor-react-native';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { CustomModal } from '../../../../components/ui/Modal';
import { MultipleSelect } from '../../../../components/ui/MultipleSelect';
import { useAuth } from '../../../../contexts/auth';
import { listOperationEmployee } from '../../../../services/GET/Operations/fetchOperationByID';
import { fetchMainOrderStatus } from '../../../../services/GET/Status/fetchMaintenanceOrdersStatus';

interface MultipleSelectOption {
  value: number;
  label: string;
}

interface Status {
  selectedStatus: number[];
  setSelectedStatus: React.Dispatch<React.SetStateAction<number[]>>;
}

interface Operations {
  selectedOperations: number[];
  setSelectedOperations: React.Dispatch<React.SetStateAction<number[]>>;
}

interface SolicitanteFilterModalProps {
  status: Status;
  operations: Operations;
}

export function LogisticaFilterModal(props: SolicitanteFilterModalProps) {
  const { employee } = useAuth();
  if (!employee?.id) return <></>;

  const listMainOrderStatus = useQuery({
    queryKey: ['listMainOrderStatus'],
    queryFn: fetchMainOrderStatus,
  });
  const listOperation = useQuery({
    queryKey: ['listOperation'],
    queryFn: () => listOperationEmployee(employee.id),
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [multipleSelectStatusOptions, setMultipleSelectStatusOptions] =
    useState<MultipleSelectOption[]>([]);
  const [multipleSelectOperationsOptions, setMultipleSelectOperationsOptions] =
    useState<MultipleSelectOption[]>([]);

  const formattedStatus = useMemo(() => {
    if (
      listMainOrderStatus.isLoading ||
      listMainOrderStatus.data === undefined
    ) {
      return [];
    }
    const sortedStatus = listMainOrderStatus.data.sort((a, b) =>
      a.description.toLowerCase() > b.description.toLowerCase() ? 1 : -1,
    );
    return sortedStatus.map((status) => ({
      value: status.id,
      label: status.description,
    }));
  }, [listMainOrderStatus.isLoading, listMainOrderStatus.data]);

  const formattedOperations = useMemo(() => {
    if (listOperation.isLoading || listOperation.data === undefined) {
      return [];
    }
    const sortedOperations = listOperation.data.sort((a, b) =>
      a.operation.toLowerCase() > b.operation.toLowerCase() ? 1 : -1,
    );
    return sortedOperations.map((operation) => ({
      value: operation.operationCode,
      label: operation.operation,
    }));
  }, [listOperation.isLoading, listOperation.data]);

  function onConfirm() {
    setIsModalVisible(false);
  }

  useEffect(() => {
    setMultipleSelectStatusOptions(formattedStatus);
  }, [formattedStatus]);

  useEffect(() => {
    setMultipleSelectOperationsOptions(formattedOperations);
  }, [formattedOperations]);

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
              selected={props.status.selectedStatus}
              setSelected={props.status.setSelectedStatus}
            />
          </View>

          <View className="mb-5">
            <Text className="mb-4 font-poppinsBold text-base">Operações:</Text>
            <MultipleSelect
              options={multipleSelectOperationsOptions}
              selected={props.operations.selectedOperations}
              setSelected={props.operations.setSelectedOperations}
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
