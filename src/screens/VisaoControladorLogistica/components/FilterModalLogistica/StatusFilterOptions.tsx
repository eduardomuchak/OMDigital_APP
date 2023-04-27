import { View, Text } from 'react-native';

import { Checkbox } from '../../../../components/ui/Checkbox';

export interface StatusFilterStateOptions {
  todas: boolean;
  abertas: boolean;
  aguardando: boolean;
  finalizadas: boolean;
  [key: string]: boolean;
}

interface FilterOptionsProps {
  changeStatus: (status: StatusFilterStateOptions) => void;
  allStatus: StatusFilterStateOptions;
}

export function StatusFilterOptions({ changeStatus, allStatus }: FilterOptionsProps) {
  function handleChangeStatus(status: string) {
    if (status === 'todas') {
      changeStatus({
        todas: !allStatus.todas,
        abertas: false,
        aguardando: false,
        finalizadas: false,
      });
    } else {
      changeStatus({
        ...allStatus,
        todas: false,
        [status]: !allStatus[status],
      });
    }
  }
  return (
    <View className="mt-2">
      <Text className="font-poppinsBold mb-2">Status:</Text>
      <Checkbox
        title={'Todas'}
        onPress={() => handleChangeStatus('todas')}
        checked={allStatus.todas}
      />
      <Checkbox
        title={'Abertas'}
        onPress={() => handleChangeStatus('abertas')}
        checked={allStatus.abertas}
      />
      <Checkbox
        title={'Aguardando'}
        onPress={() => handleChangeStatus('aguardando')}
        checked={allStatus.aguardando}
      />
      <Checkbox
        title={'Finalizadas'}
        onPress={() =>
          changeStatus({
            ...allStatus,
            todas: false,
            finalizadas: !allStatus.finalizadas,
          })
        }
        checked={allStatus.finalizadas}
      />
    </View>
  );
}
