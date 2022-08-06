import React, {useState} from 'react';
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Modal,
  ScrollView,
  Select,
  Stack,
  Text,
  TextArea,
} from 'native-base';
import FormLabel from '@components/Elements/FormLabel';
import ButtonIcon from '@components/Elements/ButtonIcon';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface RoomCreatingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RoomCreatingModal({
  isOpen,
  onClose,
}: RoomCreatingModalProps) {
  const [tags, setTags] = useState<Array<string>>([]);
  const handleSelect = (value: string) => {
    const isTagUsed = tags.find(tag => tag === value);
    if (isTagUsed) return;
    setTags(prevTags => [...prevTags, value]);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <Modal.Content h="80%" w="95%">
        <Modal.CloseButton />
        <Modal.Header>
          <Heading>Create a new room</Heading>
        </Modal.Header>
        <Modal.Body>
          <ScrollView>
            <Stack space={2}>
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
              <Stack space={2}>
                <FormControl>
                  <FormLabel>Room Tags</FormLabel>
                  <Select
                    placeholder="Select Tags"
                    onValueChange={handleSelect}>
                    <Select.Item value="Family" label="Family" />
                    <Select.Item value="Health" label="Health" />
                    <Select.Item value="Anxiety" label="Anxiety" />
                    <Select.Item value="Fear" label="Fear" />
                  </Select>
                </FormControl>
                <Flex flexDir="row" flexWrap="wrap">
                  {tags.map((tag, idx) => (
                    <Flex
                      mr="4%"
                      flexGrow="0"
                      minW="26%"
                      maxW="50%"
                      mb="10px"
                      key={idx}
                      flexDir="row"
                      align="center"
                      bg="lightBlue.100"
                      justify="space-between">
                      <Text px="10px" color="primary" fontSize="sub">
                        {tag}
                      </Text>

                      <ButtonIcon
                        name="close"
                        as={AntDesign}
                        h="25px"
                        px="0"
                        iconProps={{color: 'primary', size: '20px'}}
                        onPress={() =>
                          setTags(prevTags => prevTags.filter(el => el !== tag))
                        }
                      />
                    </Flex>
                  ))}
                </Flex>
              </Stack>
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
