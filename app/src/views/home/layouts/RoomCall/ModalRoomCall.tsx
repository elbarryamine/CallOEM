import React, {useEffect} from 'react';
import ScreenContainer from '@components/Containers/ScreenContainer';
import * as Modal from 'react-native-modalize';
import {Heading} from 'native-base';
import {Dimensions, StyleSheet} from 'react-native';

const {Modalize, useModalize} = Modal;

export default function ModalRoomCall() {
  const {ref, open} = useModalize();

  useEffect(() => {
    if (!ref || !ref.current) return;
    open();
  }, [ref.current]);
  return (
    <Modalize
      ref={ref}
      alwaysOpen={30} // 30
      handlePosition="inside"
      handleStyle={styles.handle}
      modalStyle={styles.modal}
      modalHeight={Dimensions.get('window').height * 0.9}>
      <ScreenContainer bg="dark" pt="50px">
        <Heading color="invert">Room Members</Heading>
      </ScreenContainer>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  handle: {
    backgroundColor: 'gray',
  },
  modal: {
    backgroundColor: '#292C38',
  },
});
