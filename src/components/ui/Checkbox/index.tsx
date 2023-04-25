import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import clsx from 'clsx';

interface Props extends TouchableOpacityProps {
  checked?: boolean;
  title: string;
}

export function Checkbox({ checked = true, title, ...rest }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.7} className="flex-row mb-2 items-center" {...rest}>
      {checked ? (
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          className="h-8 w-8 bg-alert-green rounded-lg flex items-center justify-center"
        >
          <Feather name="check" size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 bg-white rounded-lg border-2 border-neutral-200" />
      )}

      <Text
        className={clsx(`ml-3 text-neutral-900 font-poppinsSemibold`, {
          'line-through text-gray-400': checked,
        })}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
