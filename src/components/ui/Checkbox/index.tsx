import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import clsx from "clsx";

interface Props extends TouchableOpacityProps {
  checked?: boolean;
  title: string;
}

export function Checkbox({ checked = true, title, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="mb-2 flex-row items-center"
      {...rest}
    >
      {checked ? (
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-alert-green"
        >
          <Feather name="check" size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 rounded-lg border-2 border-neutral-200 bg-white" />
      )}

      <Text
        className={clsx(`ml-3 font-poppinsRegular text-base text-neutral-900`)}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
