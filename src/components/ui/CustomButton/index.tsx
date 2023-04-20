import { TouchableOpacityProps, TouchableOpacity, Text } from "react-native";
import clsx from "clsx";

interface Props extends TouchableOpacityProps {
  children: string | JSX.Element;
  variant: "primary" | "outline" | "ghost";
}

export function CustomButton({ variant, children, ...rest }: Props) {
  return (
    <TouchableOpacity
      className={clsx("rounded-lg h-14 flex items-center justify-center", {
        ["bg-primary-500"]: variant === "primary",
        ["border-2 border-primary-500"]: variant === "outline",
        ["bg-transparent"]: variant === "ghost",
      })}
      {...rest}
      activeOpacity={0.7}
    >
      <Text
        className={clsx(
          "font-poppinsBold text-base leading-5 text-center px-4",
          {
            ["text-white "]: variant === "primary",
            ["text-primary-500"]: variant === "outline" || variant === "ghost",
          }
        )}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
