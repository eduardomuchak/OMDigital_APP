import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { Text } from 'react-native';
import { CustomModal } from '../../../../components/ui/Modal';
import { Funnel } from 'phosphor-react-native';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { Checkbox } from '../../../../components/ui/Checkbox';
import { CustomDateTimePicker } from '../../../../components/ui/CustomDateTimePicker';
import { CheckboxProps, FilterModalProps } from './interface';

export function FilterModal({ status, operations, period, filtered }: FilterModalProps) {
  const { allStatus, setAllStatus } = status;
  const { allOperations, setAllOperations } = operations;
  const { startPeriod, setStartPeriod, endPeriod, setEndPeriod } = period;
  const { filteredOrders, setFilteredOrders } = filtered;

  const [isModalVisible, setIsModalVisible] = useState(false);

  function toggleCheckbox(id: string, list: CheckboxProps[]) {
    const allChecked = list.every((item) => item.isChecked);
    const itemIndex = list.findIndex((item) => item.value === id);

    if (itemIndex === 0) {
      // If the "Todas" checkbox is clicked
      list.forEach((item) => (item.isChecked = !allChecked));
    } else {
      // If any other checkbox is clicked
      list[itemIndex].isChecked = !list[itemIndex].isChecked;
      if (!list[itemIndex].isChecked) {
        list[0].isChecked = false;
      } else if (allChecked) {
        list[0].isChecked = true;
      }
    }

    // Update state
    if (id.startsWith('status')) {
      setAllStatus([...list]);
    } else {
      setAllOperations([...list]);
    }
  }

  function handleFilter() {
    // Rules:
    // 1. The filter will consider the status and operation checkboxes that are checked
    // 2. If the "Todas" checkbox is checked of status, the filter will consider all status
    // 3. If the "Todas" checkbox is checked of operation, the filter will consider all operations
    // 4. If the "Todas" checkbox is checked of status and operation, the filter will consider all status and operations
    // 5. If the "Todas" checkbox is not checked of status and operation, the filter will consider only the checked status and operations
  }

  return (
    <>
      {/* Modal Trigger */}
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.8}
        className="flex flex-row items-center justify-around"
      >
        <Funnel size={26} color="#1D2F99" weight="fill" />
      </TouchableOpacity>

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <ScrollView className="max-h-[650px]" showsVerticalScrollIndicator={false}>
          {/* Modal Header */}
          <Text className="font-poppinsBold text-base mb-3">
            Selecione as ordens a serem exibidas por status, operação e período:
          </Text>

          {/* Modal Body */}
          <View className="mb-3">
            <Text className="font-poppinsBold text-base mb-3">Status:</Text>
            <View className="">
              {allStatus.map((item) => (
                <Checkbox
                  key={item.label}
                  title={item.label}
                  onPress={() => toggleCheckbox(item.value, allStatus)}
                  checked={item.isChecked}
                  id={item.value}
                />
              ))}
            </View>
          </View>

          <View className="mb-3">
            <Text className="font-poppinsBold text-base mb-3">Operação:</Text>
            <View className="">
              {allOperations.map((item) => (
                <Checkbox
                  key={item.label}
                  title={item.label}
                  onPress={() => toggleCheckbox(item.value, allOperations)}
                  checked={item.isChecked}
                  id={item.value}
                />
              ))}
            </View>
          </View>

          <View className="mb-3">
            <Text className="font-poppinsBold text-base mb-3">Selecione o período:</Text>
            <View className="mb-2">
              <CustomDateTimePicker
                label="De"
                mode="date"
                value={startPeriod}
                onDateSelect={setStartPeriod}
              />
            </View>
            <CustomDateTimePicker
              label="Até"
              mode="date"
              value={endPeriod}
              onDateSelect={setEndPeriod}
            />
          </View>

          {/* Modal Footer */}
          <View className="flex flex-row justify-between mt-3">
            <View className="w-[48%]">
              <CustomButton variant="cancel" onPress={() => setIsModalVisible(false)}>
                Cancelar
              </CustomButton>
            </View>
            <View className="w-[48%]">
              <CustomButton variant="primary" onPress={() => handleFilter()}>
                Confirmar
              </CustomButton>
            </View>
          </View>
        </ScrollView>
      </CustomModal>
    </>
  );
}
