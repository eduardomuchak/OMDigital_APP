import clsx from 'clsx';

import { Modal, View } from 'react-native';
import { CloseModal } from './CloseModal';

import { IModal } from './interface';

export function CustomModal({
  children,
  isOpen,
  onClose,
  showCloseButton = false,
  defaultPadding = true,
  backgroundTransparent = false,
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
        <View
          className={clsx(
            'relative mx-auto my-auto h-fit max-w-xl rounded-xl bg-white',
            {
              ['px-5 py-6']: defaultPadding,
            },
            {
              ['bg-transparent']: backgroundTransparent,
            },
          )}
        >
          {showCloseButton ? <CloseModal onClose={onClose} /> : null}
          {children}
        </View>
      </View>
    </Modal>
  );
}
