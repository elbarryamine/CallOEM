import React, {useState, useEffect} from 'react';
import {Select, Spinner, Stack} from 'native-base';
import {Tag} from '@shared/types/Tag';
import useGetTags from '@shared/api/tag/useGetTags';
import {FormikProps} from 'formik';
import FormikFormContollerErrorHandler from '@components/Elements/FormikFormContollerErrorHandler';
import ModalTagsDisplay from './ModalTagsDisplay';
import useHandleTagsChange from '../../hooks/useHandleTagsChange';
import {RoomCreateValues} from '../RoomListScreenHeader';

export default function ModalTagsSelect({
  errors,
  touched,
  setFieldValue,
}: FormikProps<RoomCreateValues>) {
  const {data: tagsQueryData, loading: tagsQueryLoading} = useGetTags();

  const [tagsData, setTagsData] = useState<Array<Tag>>([]);
  useEffect(() => {
    if (!tagsQueryData || !tagsQueryData.GetTags) return;
    setTagsData(tagsQueryData.GetTags);
  }, [tagsQueryData]);

  const {handleSelectTags, setTags, tags} = useHandleTagsChange();
  return (
    <Stack space={2}>
      <FormikFormContollerErrorHandler
        errors={errors}
        touched={touched}
        name="Tags"
        label="Room Tags"
        isRequired>
        {tagsQueryLoading ? (
          <Spinner color="primary" />
        ) : (
          <Select
            placeholder="Select Tags"
            onValueChange={(value: string) =>
              handleSelectTags(
                (val: string) => setFieldValue('tag', val),
                value,
              )
            }>
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
      <ModalTagsDisplay tags={tags} setTags={setTags} />
    </Stack>
  );
}
