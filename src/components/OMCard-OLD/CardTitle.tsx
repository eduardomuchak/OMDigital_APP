import { CheckCircle, WarningCircle, X } from 'phosphor-react-native';
import { Text, View } from 'react-native';

import clsx from 'clsx';

interface CardTitleProps {
  children: React.ReactNode;
  status?: string;
}

export function CardTitle({ children, status }: CardTitleProps) {
  return (
    <View className="mb-2 flex-row items-center justify-center">
      {status === 'Finalizada' && (
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
      {status === 'Recusada' && (
        <X
          color="#B50202"
          weight="bold"
          size={18}
          style={{ marginRight: 8, marginBottom: 4 }}
        />
      )}
      <Text
        className={clsx(
          'text-center font-poppinsBold text-lg text-neutral-900',
          {
            ['mr-4 text-neutral-900']:
              status === 'Finalizada' || status === 'Cancelada',
          },
        )}
      >
        {children?.toString().toUpperCase()}
      </Text>
    </View>
  );
}
