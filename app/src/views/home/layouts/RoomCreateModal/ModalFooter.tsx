import React from 'react';
import {Button, Modal, Text} from 'native-base';

export default function ModalFooter({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: () => Promise<void>;
}) {
  return (
    <Modal.Footer>
      <Button.Group space={2}>
        <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
          Cancel
        </Button>
        <Button onPress={onSave} bg="primary">
          <Text color="invert">Save</Text>
        </Button>
      </Button.Group>
    </Modal.Footer>
  );
}
