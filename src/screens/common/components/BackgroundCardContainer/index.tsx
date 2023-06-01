import clsx from 'clsx';
import React from 'react';
import { Dimensions, View } from 'react-native';

export function BackgroundCardContainer({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View
      className={clsx('h-fit  bg-white ', {
        'rounded-t-xl px-6 py-8': screenWidth < 500,
        'mx-16 mb-8 rounded-xl p-10': screenWidth > 500,
      })}
    >
      {children}
    </View>
  );
}
