import React from 'react';
import {Dimensions} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import HistoryScreenCalls from './HistoryScreenCalls';
import HistoryScreenViews from './HistoryScreenViews';
import RenderTabBar from '../layouts/RenderTab';

const initialLayout = {
  width: Dimensions.get('window').width,
};
const renderScene = SceneMap({
  first: HistoryScreenCalls,
  second: HistoryScreenViews,
});

export default function HistoryScreen() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Calls'},
    {key: 'second', title: 'Views'},
  ]);
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={props => (
        <RenderTabBar index={index} setIndex={setIndex} {...props} />
      )}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}
