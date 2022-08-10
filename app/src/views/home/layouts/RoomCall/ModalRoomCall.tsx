import React, {useEffect} from 'react';
import ScreenContainer from '@components/Containers/ScreenContainer';
import * as Modal from 'react-native-modalize';
import {Text} from 'native-base';
import {Dimensions} from 'react-native';

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
      alwaysOpen={30}
      handlePosition="inside"
      modalHeight={Dimensions.get('window').height * 0.7}>
      <ScreenContainer mt="20px">
        <Text>Modal</Text>
      </ScreenContainer>
    </Modalize>
  );
}
