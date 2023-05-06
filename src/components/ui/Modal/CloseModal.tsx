import { X } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import { IModal } from './interface';

export function CloseModal({ onClose }: IModal.CloseButtonProps) {
  return (
    <TouchableOpacity
      onPress={() => onClose(false)}
      className="absolute right-0 top-0 w-8 h-8 flex items-start justify-end"
      activeOpacity={0.7}
    >
      <X size={18} />
    </TouchableOpacity>
  );
}
