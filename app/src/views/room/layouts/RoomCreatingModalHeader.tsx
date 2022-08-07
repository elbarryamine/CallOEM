import React from 'react';
import {Heading, Modal} from 'native-base';

export default function RoomCreatingModalHeader() {
  return (
    <>
      <Modal.CloseButton />
      <Modal.Header>
        <Heading>Create a new room</Heading>
      </Modal.Header>
    </>
  );
}
