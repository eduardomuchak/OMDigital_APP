import { Image as ImageIcon } from 'phosphor-react-native';
import { useState } from 'react';
import { Image } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { CustomModal } from '../ui/Modal';

interface AttachmentPreviewModalProps {
  images: string[];
  iconColor?: string;
}

export function AttachmentPreviewModal({
  images,
  iconColor = '#FFFFFF',
}: AttachmentPreviewModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      {/* Modal Trigger */}
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <ImageIcon color={iconColor} weight="bold" size={24} />
      </TouchableOpacity>

      {/* Modal */}
      <CustomModal
        isOpen={isModalVisible}
        onClose={setIsModalVisible}
        showCloseButton
        defaultPadding={false}
      >
        <Image
          source={{ uri: images[0] }}
          className="aspect-square h-96 w-full rounded-lg"
          alt=""
        />
      </CustomModal>
    </>
  );
}
