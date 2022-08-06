import React, {useEffect, useState} from 'react';
import {
  Flex,
  FormControl,
  Input,
  Select,
  Stack,
  Text,
  TextArea,
} from 'native-base';
import FormLabel from '@components/Elements/FormLabel';
import ButtonIcon from '@components/Elements/ButtonIcon';
import AntDesign from 'react-native-vector-icons/AntDesign';

const limits = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'No Limit'];

export default function RoomCreatingModalForm({
  setHasUnSavedChanges,
}: RoomCreatingModalFormProps) {
  const [tags, setTags] = useState<Array<string>>([]);
  const [accessType, setAccessType] = useState<string>('');
  const [roomLimit, setRoomLimit] = useState<string>('');

  useEffect(() => {
    if (tags.length > 0 || accessType !== '' || roomLimit !== '') {
      setHasUnSavedChanges(true);
    } else {
      setHasUnSavedChanges(false);
    }
  }, [tags, accessType, roomLimit]);

  const handleSelectTags = (value: string) => {
    const isTagUsed = tags.find(tag => tag === value);
    if (isTagUsed) return;
    setTags(prevTags => [...prevTags, value]);
  };

  const handleSelectAccessType = (value: string) => {
    setAccessType(value);
  };

  const handleSelectMembersLimit = (value: string) => {
    setRoomLimit(value);
  };

  return (
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
      <FormControl>
        <FormLabel>Room Access Type</FormLabel>
        <Select
          placeholder="Select Access Type"
          onValueChange={handleSelectAccessType}>
          <Select.Item value="private" label="Private" />
          <Select.Item value="public" label="Public" />
        </Select>
      </FormControl>
      <Stack space={2}>
        <FormControl>
          <FormLabel>Room Tags</FormLabel>
          <Select placeholder="Select Tags" onValueChange={handleSelectTags}>
            <Select.Item value="family" label="Family" />
            <Select.Item value="health" label="Health" />
            <Select.Item value="anxiety" label="Anxiety" />
            <Select.Item value="fear" label="Fear" />
          </Select>
        </FormControl>
        <Tags tags={tags} setTags={setTags} />
      </Stack>
      <FormControl>
        <FormLabel>Room Members Limit</FormLabel>
        <Select
          placeholder="Select Members Limit"
          onValueChange={handleSelectMembersLimit}>
          {limits.map((lm, idx: number) => (
            <Select.Item key={idx} value={lm} label={lm} />
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}

function Tags({tags, setTags}: TagsProps) {
  return (
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
  );
}

type TagsProps = {
  tags: Array<string>;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};
type RoomCreatingModalFormProps = {
  setHasUnSavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
};
