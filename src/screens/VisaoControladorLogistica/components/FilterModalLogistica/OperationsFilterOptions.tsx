import { Dispatch, SetStateAction } from 'react';
import { View, Text } from 'react-native';

import { Checkbox } from '../../../../components/ui/Checkbox';

export interface Operation {
  id: number;
  name: string;
}

export interface OperationState {
  showAll: boolean;
  [key: string]: boolean;
}

interface OperationsFilterOptionsProps {
  changeOperation: Dispatch<SetStateAction<OperationState[]>>;
  operations: OperationState[];
}

export function OperationsFilterOptions({
  operations,
  changeOperation,
}: OperationsFilterOptionsProps) {
  function handleChangeOperations(key: string) {
    if (key === 'Todas') {
      changeOperation((prevState: OperationState[]) => {
        const updatedOperations = prevState.map((operation) => {
          return { ...operation, showAll: !operation.showAll };
        });
        return updatedOperations;
      });
    } else {
      changeOperation((prevState: OperationState[]) => {
        const updatedOperations = prevState.map((operation) => {
          if (operation.hasOwnProperty(key)) {
            return { ...operation, [key]: !operation[key], showAll: false };
          }
          return operation;
        });
        return updatedOperations;
      });
    }
  }

  return (
    <View className="mt-2">
      <Text className="font-poppinsBold mb-2">Operação:</Text>
      <Checkbox
        title={'Todas'}
        checked={operations.every((operation) => operation.showAll)}
        onPress={handleChangeOperations.bind(null, 'Todas')}
      />
      {operations.map((operation: OperationState) => {
        let option;
        const keys = Object.keys(operation);

        for (let key of keys) {
          option = (
            <Checkbox
              key={key}
              title={key}
              checked={operation[key]}
              onPress={handleChangeOperations.bind(null, key)}
            />
          );
        }
        return option;
      })}
    </View>
  );
}
