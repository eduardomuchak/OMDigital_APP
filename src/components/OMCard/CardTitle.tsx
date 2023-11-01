import { CheckCircle, WarningCircle, X } from 'phosphor-react-native';
import { Text, View } from 'react-native';

import clsx from 'clsx';

interface CardTitleProps {
  children: React.ReactNode;
  status?: number;
}

export function CardTitle({ children, status }: CardTitleProps) {
  return (
    <View className="mb-2 flex-row items-center justify-center">
      {status === 7 && (
        <CheckCircle
          color="#046700"
          weight="bold"
          size={18}
          style={{ marginRight: 8, marginBottom: 4 }}
        />
      )}
      {status === 8 && (
        <WarningCircle
          color="#B50202"
          weight="bold"
          size={18}
          style={{ marginRight: 8, marginBottom: 4 }}
        />
      )}
      {status === 2 && (
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
            ['mr-4 text-neutral-900']: status === 7 || status === 8,
          },
        )}
      >
        {children?.toString().toUpperCase()}
      </Text>
    </View>
  );
}
