import React, {useEffect} from 'react';
import {FlatList, Spacer} from 'native-base';

import {RefreshControl, StyleSheet} from 'react-native';

import {IFlatListProps} from 'native-base/lib/typescript/components/basic/FlatList';

type Props = {
  onLoadMore: () => void;
  loadMoreEnded: boolean;
};
export default function LoadMoreList({
  onLoadMore,
  loadMoreEnded,
  ...props
}: Props & IFlatListProps<unknown>) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    onLoadMore();
  }, []);
  useEffect(() => {
    if (loadMoreEnded) {
      setRefreshing(false);
    }
  }, [loadMoreEnded]);
  return (
    <FlatList
      mt="20px"
      ItemSeparatorComponent={() => <Spacer my="10px" />}
      ListHeaderComponentStyle={styles.animatedSpinner}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  animatedSpinner: {
    width: '100%',
    position: 'absolute',
    transform: [{translateY: -70}],
    zIndex: 500,
  },
});
