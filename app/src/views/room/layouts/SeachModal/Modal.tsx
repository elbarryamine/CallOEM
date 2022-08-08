import React, {useEffect} from 'react';
import {Button, Flex, Heading, Modal, Stack} from 'native-base';
import {useFormik} from 'formik';

import ModalSearchInput from './ModalSearchInput';
import SelectRoomType from '../SelectRoomType';
import TagsSelect from '../TagsSelect';
import useRoomSearch from '@shared/api/room/useRoomSearch';
import SearchRoomSchema from '@shared/constants/schema/SearchRoomSchema';

export default function ModalSeach({isModalOpen, onModalClose}: Props) {
  const [roomSearch, {data, loading, error}] = useRoomSearch();
  const formikProps = useFormik({
    initialValues: {searchQuery: '', roomType: '', tags: []},
    onSubmit: async values => {
      try {
        await roomSearch({
          variables: {
            roomType: values.roomType,
            searchQuery: values.searchQuery,
            tags: values.tags,
          },
        });
      } catch {}
    },
    validationSchema: SearchRoomSchema,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);
  const {
    errors,
    touched,
    values,
    handleChange,
    setFieldTouched,
    setFieldValue,
    handleSubmit,
  } = formikProps;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onModalClose}
      size="full"
      animationPreset={'slide'}>
      <Modal.Content w="100%" mt="auto" mb="0" borderTopRadius="25px">
        <Modal.Header borderBottomColor="transparent" mt="10px">
          <Heading>Search</Heading>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Stack space={5}>
            <ModalSearchInput
              placeholder="Search for a room"
              name="searchQuery"
              errors={errors}
              touched={touched}
              value={values.searchQuery}
              onChangeText={handleChange('searchQuery')}
            />
            <SelectRoomType
              name="roomType"
              errors={errors}
              touched={touched}
              label="Room Type"
              handleBlur={() => setFieldTouched('roomType', true)}
              handleChange={handleChange('roomType')}
              value={values.roomType}
              isSearch
            />
            <TagsSelect
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              errors={errors}
              touched={touched}
              name="tags"
              label="Room Tags"
            />
            <Flex flex="1">
              <Button
                isLoading={loading}
                isDisabled={!!error}
                variant="primary"
                onPress={handleSubmit}>
                Apply
              </Button>
            </Flex>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

interface Props {
  isModalOpen: boolean;
  onModalClose: () => void;
}
