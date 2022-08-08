import React from 'react';
import {Button, Flex, Heading, Modal, Stack} from 'native-base';
import {useFormik} from 'formik';

import ModalSearchInput from './ModalSearchInput';
import SelectRoomType from '../SelectRoomType';
import TagsSelect from '../TagsSelect';

export default function ModalSeach({isModalOpen, onModalClose}: Props) {
  const formikProps = useFormik({
    initialValues: {searchQuery: '', roomType: ''},
    onSubmit: () => {},
  });
  const {
    errors,
    touched,
    values,
    handleChange,
    setFieldTouched,
    setFieldValue,
  } = formikProps;
  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose} size="full">
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
              <Button variant="primary">Apply</Button>
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
