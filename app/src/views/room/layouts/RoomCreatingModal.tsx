import React, {useState} from 'react';
import {Button, Heading, Modal, ScrollView, Text} from 'native-base';
import RoomCreatingModalForm from './RoomCreatingModalForm';
import RoomCreatingNotSavedModal from './RoomCreatingNotSavedModal';

export default function RoomCreatingModal({
  isOpen,
  onClose,
}: RoomCreatingModalProps) {
  const [hasUnSavedChanges, setHasUnSavedChanges] = useState<boolean>(false);
  const [warnNotSaved, setWarnNotSaved] = useState<boolean>(false);
  const onCloseWarning = () => setWarnNotSaved(false);
  const onShowWarning = () => setWarnNotSaved(true);
  const onSetNotSave = () => setHasUnSavedChanges(false);

  const onSure = () => {
    onSetNotSave();
    onCloseWarning();
    onClose();
  };

  const onCancel = () => {
    onCloseWarning();
  };

  const onOverlay = () => {
    if (hasUnSavedChanges) {
      onShowWarning();
    } else {
      onClose();
    }
  };

  return (
    <>
      <RoomCreatingNotSavedModal
        isOpen={warnNotSaved}
        onSure={onSure}
        onClose={onCancel}
      />
      <Modal isOpen={isOpen} onClose={onOverlay} size="full">
        <Modal.Content h="80%" w="95%">
          <Modal.CloseButton />
          <Modal.Header>
            <Heading>Create a new room</Heading>
          </Modal.Header>
          <Modal.Body>
            <ScrollView>
              <RoomCreatingModalForm
                setHasUnSavedChanges={setHasUnSavedChanges}
              />
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
                Cancel
              </Button>
              <Button onPress={onClose} bg="primary">
                <Text color="invert">Save</Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}

interface RoomCreatingModalProps {
  isOpen: boolean;
  onClose: () => void;
}
