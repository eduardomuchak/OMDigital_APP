import { useNavigation } from '@react-navigation/native';
import { Camera } from 'phosphor-react-native';
import React from 'react';
import { Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

export function PicturesPreview({
  capturedImages,
  showCameraButton,
}: {
  capturedImages: string[];
  showCameraButton?: boolean;
}) {
  const { width } = Dimensions.get('window');
  const { navigate } = useNavigation();
  return (
    <Animated.View
      className="flex-row flex-wrap items-center justify-center pb-4"
      entering={FadeInDown}
      exiting={FadeOutDown}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {capturedImages.length
          ? capturedImages.map((imageUri, index) => (
              <Image
                key={`${index}-${imageUri}`}
                source={{ uri: imageUri }}
                style={{
                  width: width / 6,
                  height: width / 6,
                  borderRadius: 8,
                  marginHorizontal: 2,
                }}
              />
            ))
          : null}
        {showCameraButton ? (
          <TouchableOpacity
            className={`h-[${width / 6}px] w-[${
              width / 6
            }px] items-center justify-center rounded-md px-4`}
            activeOpacity={0.7}
            onPress={() => navigate('camera')}
          >
            <Camera size={30} color="#1D2F99" weight="bold" />
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </Animated.View>
  );
}
