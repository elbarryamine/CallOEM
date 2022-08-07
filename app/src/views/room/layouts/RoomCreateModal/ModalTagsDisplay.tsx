import React from 'react';
import {Text, Flex} from 'native-base';
import ButtonIcon from '@components/Elements/ButtonIcon';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ModalTagsDisplay({tags, setTags}: TagsProps) {
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
