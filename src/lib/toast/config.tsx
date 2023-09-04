import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import colors from 'tailwindcss/colors';

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.emerald[500] }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: colors.red[500],
        height: 80,
      }}
      text1Style={{
        fontSize: 18,
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),
};
