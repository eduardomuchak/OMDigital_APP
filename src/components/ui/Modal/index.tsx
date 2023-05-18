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
          )}
        >
          {showCloseButton ? (
            <View className={'z-50'}>
              <CloseModal onClose={onClose} />
            </View>
          ) : null}
          {children}
        </View>
      </View>
    </Modal>
  );
}
