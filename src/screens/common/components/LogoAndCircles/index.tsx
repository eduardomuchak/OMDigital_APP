import clsx from 'clsx';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeOutUp } from 'react-native-reanimated';
import circles from '../../../../assets/circles-full.png';
import Logo from '../../../../assets/logo/logo.svg';
import Waves from '../../../../assets/waves.svg';
import { GoToPreviousScreen } from '../../../../components/GoToPreviousScreen';

export function LogoAndCircles({
  showGoBack = false,
}: {
  showGoBack?: boolean;
}) {
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  const keyboardDidShow = () => {
    setIsKeyboardActive(true);
  };

  const keyboardDidHide = () => {
    setIsKeyboardActive(false);
  };

  function handleKeyboard() {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }

  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    handleKeyboard();
  }, [Keyboard]);

  return (
    <View className="relative flex-1 items-center justify-center">
      {showGoBack ? (
        <TouchableOpacity
          className="absolute left-2 top-10 z-50"
          activeOpacity={0.7}
        >
          <GoToPreviousScreen />
        </TouchableOpacity>
      ) : null}
      <Image
        className={clsx('absolute', {
          '-right-52 -top-52': true,
        })}
        source={circles}
        style={{
          resizeMode: 'stretch',
          transform: [
            {
              scale: screenWidth > 500 ? 2.5 : 1,
            },
          ],
        }}
      />
      {isKeyboardActive ? null : (
        <Animated.Text
          entering={FadeIn}
          exiting={FadeOutUp}
          className={clsx(
            'mt-10 py-5 text-center font-poppinsBold  text-white',
            {
              'text-6xl': screenWidth < 500,
              'text-8xl': screenWidth > 500,
            },
          )}
        >
          OM Digital
        </Animated.Text>
      )}

      {/* <Image
        source={logo}
        className={clsx('absolute', {
          'bottom-4': screenWidth < 500,
          'bottom-14': screenWidth > 500,
        })}
        style={{
          transform: [
            {
              scale: screenWidth > 500 ? 1.5 : 1,
            },
          ],
        }}
      /> */}
      <View className="absolute bottom-0 flex w-full items-center justify-center">
        <View className="absolute -bottom-4 right-0 h-16">
          <Waves />
        </View>
        <Logo width={'90%'} />
      </View>
    </View>
  );
}
