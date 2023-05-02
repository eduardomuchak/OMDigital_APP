import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

type ItemData = {
  key: string;
  title: string;
};

export const SwipeList: React.FC = (props) => {
  const [data, setData] = useState<ItemData[]>([
    { key: '1', title: 'Item 1' },
    { key: '2', title: 'Item 2' },
    { key: '3', title: 'Item 3' },
  ]);

  const renderItem = (data: { item: ItemData; index: number; }): JSX.Element => (
    <View style={{ backgroundColor: '#fff', padding: 20 }}>
      <Text>{data.item.title}</Text>
    </View>
  );

  const renderHiddenItem = (data: { item: ItemData; index: number; }): JSX.Element => (
    <View style={{ backgroundColor: '#f00', padding: 20 }}>
      <Text>Delete</Text>
    </View>
  );

  const onSwipeValueChange = (swipeData: {
    key: string;
    value: number;
    direction: 'left' | 'right';
    isOpen: boolean;
  }): void => {
    console.log('Swipe data: ', swipeData);
  };

  return (
    <SwipeListView
      data={data}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={75}
      rightOpenValue={-75}
      disableLeftSwipe={true}
      disableRightSwipe={false}
      swipeToOpenPercent={10}
      swipeToClosePercent={10}
      onSwipeValueChange={onSwipeValueChange}
      {...props}
    />
  );
};