import clsx from 'clsx';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
  children: string | JSX.Element;
  variant: 'primary' | 'outline' | 'ghost' | 'cancel' | 'finish';
}

export function CustomButton({ variant, children, ...rest }: Props) {
  return (
    <TouchableOpacity
      className={clsx('flex h-14 items-center justify-center rounded-lg', {
        ['bg-nepomuceno-dark-blue']: variant === 'primary',
        ['border-2 border-nepomuceno-dark-blue']: variant === 'outline',
        ['bg-transparent']: variant === 'ghost',
        ['bg-status-red']: variant === 'cancel',
        ['bg-status-green']: variant === 'finish',
      })}
      {...rest}
      activeOpacity={0.7}
    >
      <Text
        className={clsx(
          'px-4 text-center font-poppinsBold text-base leading-5',
          {
            ['text-white ']:
              variant === 'primary' ||
              variant === 'cancel' ||
              variant === 'finish',
            ['text-nepomuceno-dark-blue']:
              variant === 'outline' || variant === 'ghost',
          },
        )}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
