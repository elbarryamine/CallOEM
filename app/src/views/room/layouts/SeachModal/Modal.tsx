import React from 'react';
import {Heading, Modal, Stack} from 'native-base';
import {useFormik} from 'formik';

import ModalSearchInput from './ModalSearchInput';
import ModalSearchSelectRoomType from './ModalSearchSelectRoomType';

export default function ModalSeach({isModalOpen, onModalClose}: Props) {
  const formikProps = useFormik({
    initialValues: {searchQuery: '', roomType: ''},
    onSubmit: () => {},
  });
  const {errors, touched, values, handleChange, setFieldTouched} = formikProps;
  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose} size="full">
      <Modal.Content w="100%" h="100%" mt="auto" mb="0" borderTopRadius="25px">
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
            <ModalSearchSelectRoomType
              name="Search Query"
              errors={errors}
              touched={touched}
              label="Room Type"
              handleBlur={() => setFieldTouched('roomType', true)}
              handleChange={handleChange('roomType')}
              value={values.roomType}
            />
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
