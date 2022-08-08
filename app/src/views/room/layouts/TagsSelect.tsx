import React, {useState, useEffect} from 'react';
import {Flex, Select, Spinner, Stack, Text} from 'native-base';
import {Tag} from '@shared/types/Tag';
import useGetTags from '@shared/api/tag/useGetTags';
import FormikFormContollerErrorHandler, {
  FormikFormContollerErrorHandlerProps,
} from '@components/Layouts/Form/FormikFormContollerErrorHandler';
import ButtonIcon from '@components/Elements/ButtonIcon';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useHandleTagsChange, {
  SetTouched,
  SetValue,
} from '@views/room/hooks/useHandleTagsChange';

export default function TagsSelect({
  errors,
  touched,
  name,
  label,
  helperText,
  setFieldValue,
  setFieldTouched,
}: {
  setFieldValue: SetValue;
  setFieldTouched: SetTouched;
} & FormikFormContollerErrorHandlerProps) {
  const {data: tagsQueryData, loading: tagsQueryLoading} = useGetTags();
  const {handleSelectTags, handleDeleteTag, tags} = useHandleTagsChange(name);
  const [tagsData, setTagsData] = useState<Array<Tag>>([]);

  useEffect(() => {
    if (!tagsQueryData || !tagsQueryData.GetTags) return;
    setTagsData(tagsQueryData.GetTags);
  }, [tagsQueryData]);

  return (
    <Stack space={2}>
      <FormikFormContollerErrorHandler
        errors={errors}
        touched={touched}
        name={name}
        label={label}
        helperText={helperText}
        isRequired>
        {tagsQueryLoading ? (
          <Spinner color="primary" />
        ) : (
          <Select
            placeholder="Select Tags"
            onValueChange={(value: string) => {
              if (value === '') return;
              handleSelectTags(setFieldValue, value);
            }}
            onClose={() => setFieldTouched('tags', true)}>
            <Select.Item value={''} label="Select Tag" />
            {tagsData.map(({tag}, idx) => {
              const capitalizedTag = tag
                .split(' ')
                .map(
                  (word: string) =>
                    word.slice(0, 1).toUpperCase() + word.slice(1),
                )
                .join(' ');

              return (
                <Select.Item key={idx} value={tag} label={capitalizedTag} />
              );
            })}
          </Select>
        )}
      </FormikFormContollerErrorHandler>
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
              onPress={() => handleDeleteTag(setFieldValue, tag)}
            />
          </Flex>
        ))}
      </Flex>
    </Stack>
  );
}
