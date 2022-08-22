import React from 'react';
import {Text, View} from 'native-base';
import Container from '@components/Containers/ScreenContainer';
import {clearCallsHistory, useGetCallsHistory} from '@redux/slices/history';
import HistoryList from '../layouts/HistoryList';
import {useDispatch} from 'react-redux';
import ClearHistory from '../layouts/ClearHistory';

export default function HistoryScreenCalls() {
  const callsHistory = useGetCallsHistory();
  const dispatch = useDispatch();
  const handleClearCallHistory = () => {
    dispatch(clearCallsHistory());
  };
  return (
    <Container>
      {callsHistory.length > 0 ? (
        <View>
          <ClearHistory
            onDelete={handleClearCallHistory}
            label="Clear Calls History"
          />
          <HistoryList data={callsHistory} />
        </View>
      ) : (
        <View pt="20px">
          <Text textAlign="center" color="subtext">
            No Calls History Yet
          </Text>
        </View>
      )}
    </Container>
  );
}
