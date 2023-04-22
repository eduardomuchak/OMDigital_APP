import { Text, View } from 'react-native';
import { CheckCircle, WarningCircle } from 'phosphor-react-native';

import clsx from 'clsx';

interface CardTitleProps {
  children: React.ReactNode;
  status?: string;
}

export function CardTitle({ children, status }: CardTitleProps) {
  return (
    <View className="flex-row items-center gap-1 justify-center -mt-6">
      {status === 'Concluída' && (
        <CheckCircle
          color="#046700"
          weight="bold"
          size={18}
          style={{ marginRight: 5, marginBottom: 3 }}
        />
      )}
      {status === 'Cancelada' && (
        <WarningCircle
          color="#B50202"
          weight="bold"
          size={18}
          style={{ marginRight: 5, marginBottom: 3 }}
        />
      )}
      <Text
        className={clsx('font-poppinsBold text-lg text-center text-white', {
          ['text-neutral-900 mr-4']: status === 'Concluída' || status === 'Cancelada',
        })}
      >
        {children}
      </Text>
    </View>
  );
}
