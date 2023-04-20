import { Dispatch, SetStateAction } from 'react';
import { ModalProps } from 'react-native';

export namespace IModal {
  export interface CustomModalProps extends ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: Dispatch<SetStateAction<boolean>>;
    showCloseButton?: boolean;
  }

  export interface CloseButtonProps {
    onClose: Dispatch<SetStateAction<boolean>>;
  }
}