import { Text } from 'react-native';

import clsx from 'clsx';

interface CardTitleProps {
  children: React.ReactNode;
  isFinishOrCancel?: boolean;
}

export function CardTitle({ children, isFinishOrCancel }: CardTitleProps) {
  return (
    <Text
      className={clsx('font-poppinsBold text-lg text-center text-white -mt-3', {
        ['text-neutral-900']: isFinishOrCancel,
      })}
    >
      {children}
    </Text>
  );
}
