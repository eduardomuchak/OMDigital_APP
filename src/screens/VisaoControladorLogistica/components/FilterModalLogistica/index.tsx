import { useState } from 'react';
import { Text, View } from 'react-native';

import { CustomModal } from '../../../../components/ui/Modal';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { StatusFilterOptions } from './StatusFilterOptions';
import { OperationsFilterOptions } from './OperationsFilterOptions';

import { Logistica } from '../../interfaces';

const operationsMock = [
  {
    id: 1,
    name: 'Operação 1',
  },
  {
    id: 2,
    name: 'Operação 2',
  },
  {
    id: 3,
    name: 'Operação 3',
  },
];

export function FilterModalLogistica({ isOpen, onClose, onConfirm }: Logistica.FilterModalProps) {
  const [allStatus, setAllStatus] = useState({
    todas: true,
    abertas: false,
    aguardando: false,
    concluidas: false,
    canceladas: false,
  });
  const [operations, setOperations] = useState(
    operationsMock.map((operation) => {
      return {
        showAll: true,
        [operation.name]: false,
      };
    })
  );
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <Text className="font-poppinsBold">
        Selecione as ordens a serem exibidas por status e/ou por operação:
      </Text>
      <StatusFilterOptions changeStatus={setAllStatus} allStatus={allStatus} />
      <OperationsFilterOptions operations={operations} changeOperation={setOperations} />
      <View className="flex-row justify-center gap-5 mt-0.5">
        <CustomButton
          onPress={() => {
            setAllStatus({
              todas: true,
              abertas: false,
              aguardando: false,
              concluidas: false,
              canceladas: false,
            });
            onClose();
          }}
          variant="cancel"
        >
          Cancelar
        </CustomButton>
        <CustomButton onPress={() => onConfirm(allStatus, operations)} variant="primary">
          Confirmar
        </CustomButton>
      </View>
    </CustomModal>
  );
}
