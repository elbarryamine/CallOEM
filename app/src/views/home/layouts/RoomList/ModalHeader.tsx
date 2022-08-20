import React from 'react';
import {Heading, Modal} from 'native-base';

export default function ModalHeader() {
  return (
    <>
      <Modal.CloseButton />
      <Modal.Header>
        <Heading color="primary">Create a new room</Heading>
      </Modal.Header>
    </>
  );
}
