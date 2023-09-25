import { useQuery } from '@tanstack/react-query';
import { Funnel } from 'phosphor-react-native';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { QRCodeScannerModal } from '../../../../components/QRCodeScannerModal';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { CustomDateTimePicker } from '../../../../components/ui/CustomDateTimePicker';
import { CustomModal } from '../../../../components/ui/Modal';
import { MultipleSelect } from '../../../../components/ui/MultipleSelect';
import { Select } from '../../../../components/ui/Select';
import { storage } from '../../../../lib/mmkv/storage';
import { fetchOMFromAPI } from '../../../../services/GET/OMs/fetchAllOms/fetchOM';
import { fetchOperationsFromAPI } from '../../../../services/GET/Operations/fetchOperations';
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

interface AssetCode {
  assetCode: string;
  setAssetCode: React.Dispatch<React.SetStateAction<string>>;
}

interface ServiceOrderType {
  selectedServiceOrderType: string;
  setSelectedServiceOrderType: React.Dispatch<React.SetStateAction<string>>;
  serviceOrderTypeOptions: string[];
}

interface Period {
  startPeriod: Date;
  endPeriod: Date;
  setStartPeriod: React.Dispatch<React.SetStateAction<Date>>;
  setEndPeriod: React.Dispatch<React.SetStateAction<Date>>;
}

interface ManutencaoFilterModalProps {
  status: Status;
  operations: Operations;
  assetCode: AssetCode;
  serviceOrderType: ServiceOrderType;
  period: Period;
}

export function OperadorFilterModal(props: ManutencaoFilterModalProps) {
  const listMainOrderStatus = useQuery({
    queryKey: ['listMainOrderStatus'],
    queryFn: fetchMainOrderStatus,
  });
  const listOperation = useQuery({
    queryKey: ['listOperation'],
    queryFn: fetchOperationsFromAPI,
  });
  const listMaintenanceOrder = useQuery({
    queryKey: ['listMaintenanceOrder'],
    queryFn: fetchOMFromAPI,
  });

  if (
    listMaintenanceOrder.isLoading ||
    listOperation.isLoading ||
    listMainOrderStatus.isLoading
  ) {
    return <></>;
  }

  if (
    listMaintenanceOrder.data === undefined ||
    listOperation.data === undefined ||
    listMainOrderStatus.data === undefined
  ) {
    return <></>;
  }

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
    storage.set('savedFilter', JSON.stringify(props));
  }

  useEffect(() => {
    setMultipleSelectStatusOptions(formattedStatus);
  }, [formattedStatus]);

  useEffect(() => {
    setMultipleSelectOperationsOptions(formattedOperations);
  }, [formattedOperations]);

  useEffect(() => {
    if (listMaintenanceOrder.data.length > 0) {
      const dates = listMaintenanceOrder.data.map((order) =>
        new Date(order.datetime).getTime(),
      );
      const smallestDate = new Date(Math.min.apply(null, dates));
      const largestDate = new Date(Math.max.apply(null, dates));

      props.period.setStartPeriod(smallestDate);
      props.period.setEndPeriod(largestDate);
    }
    if (
      storage.getString('savedFilter') &&
      storage.getString('savedFilter') !== null
    ) {
      const savedFilter = JSON.parse(
        storage.getString('savedFilter') as string,
      );
      props.status.setSelectedStatus(savedFilter.status.selectedStatus);
      props.operations.setSelectedOperations(
        savedFilter.operations.selectedOperations,
      );
      props.assetCode.setAssetCode(savedFilter.assetCode.assetCode);
      props.serviceOrderType.setSelectedServiceOrderType(
        savedFilter.serviceOrderType.selectedServiceOrderType,
      );
      props.period.setStartPeriod(new Date(savedFilter.period.startPeriod));
      props.period.setEndPeriod(new Date(savedFilter.period.endPeriod));
    }
  }, [listMaintenanceOrder.data]);

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

          {/* Operações */}
          <View className="mb-5">
            <Text className="mb-4 font-poppinsBold text-base">Operações:</Text>
            <MultipleSelect
              options={multipleSelectOperationsOptions}
              selected={props.operations.selectedOperations}
              setSelected={props.operations.setSelectedOperations}
            />
          </View>

          {/* Código do Bem */}
          <View className="mb-5 flex-row items-end justify-between space-x-2">
            <View className="flex-1">
              <Text className="mb-4 font-poppinsBold text-base">
                Código do Bem:
              </Text>
              <TextInput
                placeholder="Digite"
                className="m-0 h-14 rounded-lg bg-neutral-100 px-5 py-2 font-poppinsSemibold"
                value={props.assetCode.assetCode}
                onChangeText={(text) => props.assetCode.setAssetCode(text)}
              />
            </View>
            <QRCodeScannerModal onScan={props.assetCode.setAssetCode} />
          </View>

          {/* Tipo da Ordem de Manutenção */}
          <View className="mb-5">
            <Text className="mb-4 font-poppinsBold text-base">Tipo da OS:</Text>
            <Select
              selected={props.serviceOrderType.selectedServiceOrderType}
              setSelected={props.serviceOrderType.setSelectedServiceOrderType}
              options={
                props.serviceOrderType.serviceOrderTypeOptions
                //   .sort(
                //   (a, b) => a.localeCompare(b),
                // )
              }
            />
          </View>

          {/* Período */}
          <Text className="mb-4 font-poppinsBold text-base">
            Selecione o período:
          </Text>
          <View className="mb-3">
            <CustomDateTimePicker
              label="De"
              mode="date"
              value={props.period.startPeriod}
              onDateSelect={props.period.setStartPeriod}
            />
          </View>
          <CustomDateTimePicker
            label="Até"
            mode="date"
            value={props.period.endPeriod}
            onDateSelect={props.period.setEndPeriod}
          />

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
