import { MapPin } from 'phosphor-react-native';
import { useState } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../ui/CustomButton';
import { CustomModal } from '../ui/Modal';

interface Location {
  latitude: string;
  longitude: string;
}

interface LocationModalProps {
  location: Location;
}

export function GPSLocationModal({ location }: LocationModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openGoogleMaps = (latitude: string, longitude: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <>
      {/* Modal Trigger */}
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <MapPin size={30} weight="bold" color="#000000" />
      </TouchableOpacity>

      {/* Modal */}
      <CustomModal isOpen={isModalVisible} onClose={setIsModalVisible}>
        <Text className="font-poppinsBold text-base">
          Você deseja visualizar a localização no mapa?
        </Text>
        <View className="mb-5 mt-4">
          <View>
            <Text className="font-poppinsBold text-base">Latitude:</Text>
            <Text className="font-poppinsMedium text-base">
              {location.latitude}
            </Text>
          </View>
          <View>
            <Text className="font-poppinsBold text-base">Longitude:</Text>
            <Text className="font-poppinsMedium text-base">
              {location.longitude}
            </Text>
          </View>
        </View>
        <View className="flex flex-row justify-between">
          <View className="w-[48%]">
            <CustomButton
              variant="cancel"
              onPress={() => setIsModalVisible(false)}
            >
              Cancelar
            </CustomButton>
          </View>
          <View className="w-[48%]">
            <CustomButton
              variant="primary"
              onPress={() =>
                openGoogleMaps(location.latitude, location.longitude)
              }
            >
              Confirmar
            </CustomButton>
          </View>
        </View>
      </CustomModal>
    </>
  );
}
