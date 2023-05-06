import { Text, View } from 'react-native';

import { Checkbox } from '../../../../components/ui/Checkbox';

import { Logistica } from '../../interfaces';

export function OperationsFilterOptions({
  operations,
  changeOperation,
}: Logistica.OperationsFilterOptionsProps) {
  function handleChangeOperations(key: string) {
    if (key === 'Todas') {
      changeOperation((prevState: Logistica.OperationState[]) => {
        const updatedOperations = prevState.map((operation) => {
          return { ...operation, showAll: !operation.showAll };
        });
        return updatedOperations;
      });
    } else {
      changeOperation((prevState: Logistica.OperationState[]) => {
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
      {operations.map((operation: Logistica.OperationState) => {
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
