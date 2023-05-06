import { CheckCircle, WarningCircle } from 'phosphor-react-native';
import { Text, View } from 'react-native';

import clsx from 'clsx';

interface CardTitleProps {
  children: React.ReactNode;
  status?: string;
}

export function CardTitle({ children, status }: CardTitleProps) {
  return (
    <View className="flex-row items-center justify-center mb-2">
      {status === 'Concluída' && (
        <CheckCircle
          color="#046700"
          weight="bold"
          size={18}
          style={{ marginRight: 8, marginBottom: 4 }}
        />
      )}
      {status === 'Cancelada' && (
        <WarningCircle
          color="#B50202"
          weight="bold"
          size={18}
          style={{ marginRight: 8, marginBottom: 4 }}
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
