import { SafeAreaView, Text, View } from 'react-native';
import { Header } from '../../components/Header';
import { Input } from '../../components/ui/Input';
import { TextArea } from '../../components/ui/TextArea';
import { CustomButton } from '../../components/ui/CustomButton';
import { OpenCamera } from '../../components/OpenCamera';

export function RegisterNewRequest() {
  return (
    <SafeAreaView className="bg-white flex-1">
      <Header title="Abertura de Solicitação" />
      <View className="bg-neutral-100 py-5 px-6">
        <Text className="font-poppinsBold text-lg">Data de Solicitação:</Text>
        <Text className="font-poppinsMedium text-lg">07/01/2023 - 08h15</Text>
      </View>
      <View className="py-4 px-6">
        <View className="mb-4">
          <Input label="Codigo do bem" />
        </View>
        <View className="mb-4">
          <Input label="Contador" />
        </View>
        <View className="mb-4">
          <TextArea label="Relatar o Problema" />
        </View>
        <View className="mb-5">
          <OpenCamera label="Anexo (OPCIONAL)" />
        </View>

        <CustomButton variant="primary" onPress={() => {}}>
          Cadastrar
        </CustomButton>
      </View>
    </SafeAreaView>
  );
}
