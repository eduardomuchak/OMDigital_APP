import { Modal, View } from 'react-native';
import { CloseModal } from './CloseModal';
import { IModal } from './interface';

export function CustomModal({
  children,
  isOpen,
  onClose,
  showCloseButton = false,
}: IModal.CustomModalProps) {
  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      onRequestClose={() => onClose(false)}
      statusBarTranslucent={true}
      transparent={true}
    >
      <View className="flex-1 bg-overlay">
        <View className="px-5 py-6 rounded-xl bg-white mx-6 my-auto h-fit relative">
          {showCloseButton ? <CloseModal onClose={onClose} /> : null}
          {children}
        </View>
      </View>
    </Modal>
  );
}
