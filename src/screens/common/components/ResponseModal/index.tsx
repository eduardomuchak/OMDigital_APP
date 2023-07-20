import { useNavigation } from '@react-navigation/native';
import { CheckCircle, WarningCircle } from 'phosphor-react-native';
import { useState } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';
import { Text, View } from 'react-native';
import { ButtonLoading } from '../../../../components/ButtonLoading';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { CustomModal } from '../../../../components/ui/Modal';
import { getRecoveryPassword } from '../../../../services/GET/PasswordRecovery';

type FormData = {
  userCPF?: string;
  userEmail?: string;
  userSMSNumber?: string;
  password?: string;
  passwordConfirmation?: string;
};

interface ResponseModalProps {
  handleSubmit: UseFormHandleSubmit<FormData>;
  buttonText?: string;
}

export function ResponseModal({
  handleSubmit,
  buttonText = 'Recuperar Senha',
}: ResponseModalProps) {
  const { navigate } = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccessResponse, setIsSuccessResponse] = useState<boolean | null>(
    null,
  );

  function handleModalMessage(response: boolean) {
    if (response === true) {
      setModalMessage(
        'Para finalizar a recuperação, entre em contato com o operador responsável',
      );
    }
    if (response === false) {
      setModalMessage(
        'Ocorreu um erro ao tentar recuperar a senha. Tente novamente mais tarde.',
      );
    }
  }

  function onSubmit(data: FormData) {
    try {
      setIsLoading(true);
      if (data?.userEmail) {
        getRecoveryPassword({ text: data.userEmail }).then((response) => {
          setIsSuccessResponse(response);
          handleModalMessage(response);
          setIsModalVisible(true);
        });
      }
      if (data?.userCPF) {
        getRecoveryPassword({ text: data.userCPF }).then((response) => {
          setIsSuccessResponse(response);
          handleModalMessage(response);
          setIsModalVisible(true);
        });
      }
      if (data?.userSMSNumber) {
        getRecoveryPassword({ text: data.userSMSNumber }).then((response) => {
          setIsSuccessResponse(response);
          handleModalMessage(response);
          setIsModalVisible(true);
        });
      }
    } catch (error) {
      setIsSuccessResponse(false);
      setIsModalVisible(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setIsModalVisible(false);
        navigate('Login');
      }, 5000);
    }
  }

  return (
    <>
      {/* Modal Trigger */}
      <CustomButton variant="primary" onPress={handleSubmit(onSubmit)}>
        {isLoading ? <ButtonLoading color={'#FFF'} /> : `${buttonText}`}
      </CustomButton>

      {/* Modal */}
      <CustomModal
        isOpen={isModalVisible}
        onClose={setIsModalVisible}
        showCloseButton
        defaultPadding={true}
      >
        {isSuccessResponse ? (
          <View className="items-center justify-center">
            <CheckCircle size={200} color="#22C55E" weight="bold" />
            <Text className="mt-7 font-poppinsBold text-base">
              {modalMessage}
            </Text>
          </View>
        ) : (
          <View className="items-center justify-center">
            <WarningCircle size={200} color="#F40606" weight="bold" />
            <Text className="mt-7 font-poppinsBold text-base">
              {modalMessage}
            </Text>
          </View>
        )}
      </CustomModal>
    </>
  );
}
