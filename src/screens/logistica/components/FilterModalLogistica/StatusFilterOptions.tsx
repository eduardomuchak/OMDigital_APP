import { Text, View } from 'react-native';

import { Checkbox } from '../../../../components/ui/Checkbox';

import { Logistica } from '../../interfaces';

export function StatusFilterOptions({
  changeStatus,
  allStatus,
}: Logistica.FilterOptionsProps) {
  function handleChangeStatus(status: string) {
    if (status === 'todas') {
      changeStatus({
        todas: !allStatus.todas,
        abertas: false,
        aguardando: false,
        concluidas: false,
        canceladas: false,
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
    <View className="mb-5">
      <Text className="mb-4 font-poppinsBold text-base">Status:</Text>
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
        title={'Canceladas'}
        onPress={() => handleChangeStatus('canceladas')}
        checked={allStatus.canceladas}
      />
      <Checkbox
        title={'Concluídas'}
        onPress={() => handleChangeStatus('concluidas')}
        checked={allStatus.concluidas}
      />
    </View>
  );
}
