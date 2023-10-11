import { Image as ImageIcon } from 'phosphor-react-native';
import { useState } from 'react';

import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Solicitations } from '../../services/GET/Solicitations/index.interface';
import { formatImageURL } from '../../utils/formatURI';
import { CustomModal } from '../ui/Modal';

interface AttachmentPreviewModalProps {
  images: Solicitations.Image[];
  iconColor?: string;
}

export function AttachmentPreviewModal({
  images,
  iconColor = '#000',
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
        <></>
        <Image
          source={{ uri: formatImageURL(images[0].path) }}
          className="aspect-square h-96 w-full rounded-lg"
          alt=""
        />
      </CustomModal>
    </>
  );
}
