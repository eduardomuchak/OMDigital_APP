import { Image, TouchableOpacity, View } from "react-native";
import { CustomModal } from "../ui/Modal";
import { useState } from "react";
import { Text } from "react-native";

import bigTruckIcon from "../../assets/icons/png/big-truck-black.png";
import { footerInfoMock } from "./mock";

export function FooterModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      {/* Modal Trigger */}
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.8}
        className="flex h-32 flex-row items-center justify-around bg-primary-500"
      >
        {footerInfoMock.map((item, index) => (
          <View
            className="flex flex-col items-center"
            key={`${index}-${item.percentage}-${item.vehicles}`}
          >
            <Text className="font-poppinsMedium text-lg text-white">
              {item.percentage}
            </Text>
            <Image source={item.image} className="my-2 h-11 w-11" />
            <Text className="font-poppinsMedium text-lg text-white">
              {item.vehicles}
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
          <View className="flex flex-1 flex-col justify-center rounded-b-xl bg-primary-500 px-5 py-6">
            {footerInfoMock.map((item, index) => (
              <View
                className="flex flex-row items-center justify-start"
                key={`${index}-${item.percentage}`}
              >
                <Image source={item.image} className="my-2 mr-4 h-11 w-11" />
                <Text className="font-poppinsMedium text-lg text-white">
                  {item.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </CustomModal>
    </>
  );
}
