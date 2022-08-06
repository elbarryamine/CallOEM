import React from 'react';
import {
  Button,
  FormControl,
  Heading,
  Input,
  Modal,
  ScrollView,
  Stack,
  Text,
  TextArea,
} from 'native-base';
import FormLabel from '@components/Elements/FormLabel';

interface RoomCreatingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RoomCreatingModal({
  isOpen,
  onClose,
}: RoomCreatingModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <Modal.Content h="80%" w="95%">
        <Modal.CloseButton />
        <Modal.Header>
          <Heading>Create a new room</Heading>
        </Modal.Header>
        <Modal.Body>
          <ScrollView>
            <Stack space={5}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Enter Room Title" borderBottomWidth="1" />
              </FormControl>
              <FormControl>
                <FormLabel>Room Description</FormLabel>
                <TextArea
                  autoCompleteType={false}
                  placeholder="Enter Room Description"
                  borderBottomWidth="1"
                />
              </FormControl>
            </Stack>
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
  );
}
