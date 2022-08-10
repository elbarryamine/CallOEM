import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function GestureHandlerProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <GestureHandlerRootView style={styles.gestureProvider}>
      {children}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureProvider: {
    flex: 1,
  },
});
