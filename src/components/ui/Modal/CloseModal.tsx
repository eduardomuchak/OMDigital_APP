import { X } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import { IModal } from './interface';

export function CloseModal({ onClose }: IModal.CloseButtonProps) {
  return (
    <TouchableOpacity
      onPress={() => onClose(false)}
      className="absolute right-2 top-2 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-white"
      activeOpacity={0.7}
    >
      <X size={16} color="#1D2F99" weight="bold" />
    </TouchableOpacity>
  );
}
