import { TextInputProps } from 'react-native';
import {
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';

export interface InputProps extends TextInputProps {
  label: string;
  required?: boolean;
  maskedInput?: boolean;
  maskType?: TextInputMaskTypeProp;
  maskOptions?: TextInputMaskOptionProp;
}
