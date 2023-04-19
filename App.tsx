import 'react-native-gesture-handler';

import { StatusBar, Text, View } from 'react-native';
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from '@expo-google-fonts/poppins';

import Loading from './src/components/Loading';
import { CustomButton } from './src/components/ui/CustomButton';
import { Input } from './src/components/ui/Input';
import { Select } from './src/components/ui/Select';
import { useState } from 'react';

export default function App() {
  const [selected, setSelected] = useState('');

  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <View className="h-screen items-center justify-center flex flex-col flex-1 bg-white">
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <Text className="font-poppinsBold text-xl text-primary-500">
        OM Digital
      </Text>
      <View className="flex mt-6 w-full px-6">
        <CustomButton variant={'primary'} title="Primário" />
        <CustomButton variant={'outline'} title="Outline" />
        <CustomButton variant={'ghost'} title="Ghost" />
        <Input label="NOME" />
        <Select
          label="SELECIONE"
          options={['Opção 1', 'Opção 2']}
          setSelected={setSelected}
          selected={selected}
        />
      </View>
    </View>
  );
}
