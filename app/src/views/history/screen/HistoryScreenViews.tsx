import React from 'react';
import {Text, View} from 'native-base';
import Container from '@components/Containers/ScreenContainer';
import {clearViewsHistory, useGetViewsHistory} from '@redux/slices/history';
import HistoryList from '../layouts/HistoryList';
import {useDispatch} from 'react-redux';
import ClearHistory from '../layouts/ClearHistory';

export default function HistoryScreenViews() {
  const viewsHistory = useGetViewsHistory();
  const dispatch = useDispatch();
  const handleClearViewsHistory = () => {
    dispatch(clearViewsHistory());
  };
  return (
    <Container>
      {viewsHistory.length > 0 ? (
        <View>
          <ClearHistory
            onDelete={handleClearViewsHistory}
            label="Clear Views History"
          />
          <HistoryList data={viewsHistory} />
        </View>
      ) : (
        <View pt="20px">
          <Text textAlign="center" color="subtext">
            No Views History Yet
          </Text>
        </View>
      )}
    </Container>
  );
}
