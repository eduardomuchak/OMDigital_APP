import { Text, View } from 'react-native';

import clsx from 'clsx';

interface CardInfoProps {
  isFinishOrCancel?: boolean;
  codigoBem: string;
  ordemManutencao: string;
  operacao: string;
  paradaReal: string;
  prevFim: string;
}

export function CardInfo(props: CardInfoProps) {
  return (
    <>
      <Text
        className={clsx('text-base text-white font-poppinsMedium', {
          ['text-neutral-900 font-poppinsMedium']: props.isFinishOrCancel,
        })}
      >
        {props.ordemManutencao}
      </Text>
      <Text
        className={clsx('text-base text-white font-poppinsMedium', {
          ['text-neutral-900 font-poppinsMedium']: props.isFinishOrCancel,
        })}
      >
        {props.operacao}
      </Text>
      <View className="flex-row justify-between">
        <Text
          className={clsx('text-base text-white font-poppinsMedium', {
            ['text-neutral-900 font-poppinsMedium']: props.isFinishOrCancel,
          })}
        >
          Par. Real:{' '}
        </Text>
        <Text
          className={clsx('text-base text-white font-poppinsMedium', {
            ['text-neutral-900 font-poppinsMedium']: props.isFinishOrCancel,
          })}
        >
          {props.paradaReal}
        </Text>
      </View>
      <View className="flex-row justify-between">
        <Text
          className={clsx('text-base text-white font-poppinsMedium flex-row', {
            ['text-neutral-900 font-poppinsMedium']: props.isFinishOrCancel,
          })}
        >
          Prev. Fim:{' '}
        </Text>
        <Text
          className={clsx('text-base text-white font-poppinsMedium', {
            ['text-neutral-900 font-poppinsMedium']: props.isFinishOrCancel,
          })}
        >
          {props.prevFim}
        </Text>
      </View>
    </>
  );
}
