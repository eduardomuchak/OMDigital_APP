import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { CustomModal } from '../ui/Modal';

import { useQuery } from '@tanstack/react-query';
import bigTruckIcon from '../../assets/icons/png/big-truck-black.png';
import { useAuth } from '../../contexts/auth';
import { fetchPrincipalFooterData } from '../../services/GET/Maintenance/getPrincipalFooterData/fetchPrincipalFooterData';

import bigTruck from '../../assets/icons/png/001-big-truck.png';
import truck from '../../assets/icons/png/002-truck.png';
import containerTruck from '../../assets/icons/png/003-container-truck.png';
import factoryMachine from '../../assets/icons/png/004-factory-machine.png';
import { textCapitalizer } from '../../utils/textCapitalize';

export function FooterModal() {
  const { employee } = useAuth();
  if (!employee?.id) return <></>;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const getPrincipalFooterData = useQuery({
    queryKey: ['getPrincipalFooterData'],
    queryFn: () => fetchPrincipalFooterData(employee?.id),
  });

  const handleImage = (familyName: string) => {
    switch (familyName) {
      case 'CAVALOS MECANICOS':
        return bigTruck;
      case 'CAMINHOES':
        return truck;
      case 'SEMI REBOQUES':
        return containerTruck;
      case 'EQUIPAMENTOS':
        return factoryMachine;
      default:
        return bigTruck;
    }
  };

  const handlePercentage = (totalOfVehicles: number, dispVehicles: number) => {
    const percentage = (dispVehicles / totalOfVehicles) * 100;
    return `${percentage.toFixed(0)}%`;
  };

  if (
    getPrincipalFooterData.data === undefined ||
    getPrincipalFooterData.isLoading
  ) {
    return <></>;
  }

  return (
    <>
      {/* Modal Trigger */}
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
        className="flex h-32 flex-row items-center justify-around bg-nepomuceno-dark-blue"
      >
        {getPrincipalFooterData.data
          .sort((a, b) => a.familyName.localeCompare(b.familyName))
          .map((item, index) => (
            <View
              className="flex flex-col items-center"
              key={`${index}-${item.familyName}`}
            >
              <Text className="font-poppinsMedium text-lg text-white">
                {handlePercentage(item.total, Number(item.disp))}
              </Text>
              <Image
                source={handleImage(item.familyName)}
                className="my-2 h-11 w-11"
              />
              <Text className="font-poppinsMedium text-lg text-white">
                {item.total}
              </Text>
            </View>
          ))}
      </TouchableOpacity>

      {/* Modal */}
      <CustomModal
        isOpen={isModalVisible}
        onClose={setIsModalVisible}
        showCloseButton
        defaultPadding={false}
      >
        <View className="h-[512px] bg-transparent">
          <View className="flex-1 rounded-t-xl bg-white px-5 py-6">
            <Text className="font-poppinsBold text-base">Legendas:</Text>
            <View className="mt-4 flex flex-1 flex-col items-center justify-center">
              <Text className="font-poppinsMedium text-sm">
                (Porcentagem de Veículos Disponíveis)
              </Text>
              <Text className="font-poppinsMedium text-sm">4%</Text>
              <Image source={bigTruckIcon} className="my-1 h-24 w-24" />
              <Text className="font-poppinsMedium text-sm">850</Text>
              <Text className="font-poppinsMedium text-sm">
                (Total de Veículos por Usuário)
              </Text>
            </View>
          </View>
          <View className="flex flex-1 flex-col justify-center rounded-b-xl bg-nepomuceno-dark-blue px-5 py-6">
            {getPrincipalFooterData.data.map((item, index) => (
              <View
                className="flex flex-row items-center justify-start"
                key={`${index}-${item.familyName}`}
              >
                <Image
                  source={handleImage(item.familyName)}
                  className="my-2 mr-4 h-11 w-11"
                />
                <Text className="font-poppinsMedium text-lg text-white">
                  {textCapitalizer(item.familyName)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </CustomModal>
    </>
  );
}
