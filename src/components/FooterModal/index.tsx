import { Image, TouchableOpacity, View } from 'react-native';
import { CustomModal } from '../ui/Modal';
import { useState } from 'react';
import { Text } from 'react-native';

import bigTruckIcon from '../../assets/icons/png/big-truck-black.png';
import { footerInfoMock } from './mock';

export function FooterModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      {/* Modal Trigger */}
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.8}
        className="bg-primary-600 h-32 flex flex-row items-center justify-around"
      >
        {footerInfoMock.map((item, index) => (
          <View
            className="flex flex-col items-center"
            key={`${index}-${item.percentage}-${item.vehicles}`}
          >
            <Text className="font-poppinsMedium text-lg text-white">{item.percentage}</Text>
            <Image source={item.image} className="w-11 h-11 my-2" />
            <Text className="font-poppinsMedium text-lg text-white">{item.vehicles}</Text>
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
          <View className="bg-white flex-1 rounded-t-xl px-5 py-6">
            <Text className="font-poppinsBold text-base">Legendas:</Text>
            <View className="flex flex-col items-center justify-center flex-1 mt-4">
              <Text className="font-poppinsMedium text-sm">
                (Porcentagem de Veículos Disponíveis)
              </Text>
              <Text className="font-poppinsMedium text-sm">4%</Text>
              <Image source={bigTruckIcon} className="w-24 h-24 my-1" />
              <Text className="font-poppinsMedium text-sm">850</Text>
              <Text className="font-poppinsMedium text-sm">(Total de Veículos por Usuário)</Text>
            </View>
          </View>
          <View className="bg-primary-600 flex-1 rounded-b-xl px-5 py-6 flex justify-center flex-col">
            {footerInfoMock.map((item, index) => (
              <View
                className="flex flex-row items-center justify-start"
                key={`${index}-${item.percentage}`}
              >
                <Image source={item.image} className="w-11 h-11 my-2 mr-4" />
                <Text className="font-poppinsMedium text-lg text-white">{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </CustomModal>
    </>
  );
}
