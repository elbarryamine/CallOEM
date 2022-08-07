import React, {useEffect} from 'react';
import {Modal, ScrollView, Input, Select, Stack, TextArea} from 'native-base';
import {Formik} from 'formik';
import CreateRoomSchema from '@shared/constants/schema/CreateRoomSchema';
import FormGrpahqlErrorHandler from '@components/Elements/FormGrpahqlErrorHandler';
import FormikFormContollerErrorHandler from '@components/Elements/FormikFormContollerErrorHandler';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import ModalTagsSelect from './ModalTagsSelect';
import {useFormik} from 'formik';

const limits = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'No Limit'];
const initialValues = {
  Title: '',
  Description: '',
  'Room Type': '',
  Tags: '',
  Limit: '',
};

export default function ModalRoomCreate({
  isCreateRoomModalOpen,
  onModalOverlayClicked,
  onCreateRoomModalClose,
  onChangesNotSaved,
}: ModalRoomCreate) {
  const formikProps = useFormik({
    onSubmit: handleCreateRoom,
    initialValues,
    validationSchema: CreateRoomSchema,
  });
  const {handleChange, handleBlur, values, errors, touched} = formikProps;

  function handleCreateRoom() {}

  useEffect(() => {
    if (
      values.Description ||
      values.Limit ||
      values.Tags ||
      values.Title ||
      values['Room Type']
    ) {
      onChangesNotSaved();
    }
  }, [values]);

  return (
    <Modal
      isOpen={isCreateRoomModalOpen}
      onClose={onModalOverlayClicked}
      size="full">
      <Formik
        initialValues={initialValues}
        validationSchema={CreateRoomSchema}
        onSubmit={handleCreateRoom}>
        <Modal.Content h="80%" w="95%">
          <ModalHeader />
          <Modal.Body>
            <ScrollView>
              <Stack space={2}>
                <FormGrpahqlErrorHandler error={undefined} />
                <FormikFormContollerErrorHandler
                  errors={errors}
                  touched={touched}
                  name="Title"
                  label="Title"
                  helperText="Must be 8 to 255 characters"
                  isRequired>
                  <Input
                    placeholder="Enter Room Title"
                    borderBottomWidth="1"
                    value={values.Title}
                    onChangeText={handleChange('Title')}
                    onBlur={handleBlur('Title')}
                  />
                </FormikFormContollerErrorHandler>
                <FormikFormContollerErrorHandler
                  errors={errors}
                  touched={touched}
                  name="Description"
                  label="Description">
                  <TextArea
                    value={values.Description}
                    onChangeText={handleChange('Description')}
                    onBlur={handleBlur('Description')}
                    autoCompleteType={false}
                    placeholder="Enter Room Description"
                    borderBottomWidth="1"
                  />
                </FormikFormContollerErrorHandler>
                <FormikFormContollerErrorHandler
                  errors={errors}
                  touched={touched}
                  name="Room Type"
                  label="Room Access Type"
                  isRequired>
                  <Select
                    placeholder="Select Access Type"
                    onValueChange={handleChange('Room Type')}
                    selectedValue={values['Room Type']}
                    defaultValue="public">
                    <Select.Item value="private" label="Private" />
                    <Select.Item value="public" label="Public" />
                  </Select>
                </FormikFormContollerErrorHandler>
                <FormikFormContollerErrorHandler
                  errors={errors}
                  touched={touched}
                  name="Limit"
                  label="Room Members Limit"
                  isRequired>
                  <Select
                    placeholder="Select Members Limit"
                    selectedValue={values.Tags}
                    onValueChange={handleChange('Limit')}>
                    {limits.map((lm, idx: number) => (
                      <Select.Item key={idx} value={lm} label={lm} />
                    ))}
                  </Select>
                </FormikFormContollerErrorHandler>
                <ModalTagsSelect {...formikProps} />
              </Stack>
            </ScrollView>
          </Modal.Body>
          <ModalFooter onClose={onCreateRoomModalClose} />
        </Modal.Content>
      </Formik>
    </Modal>
  );
}

interface ModalRoomCreate {
  isCreateRoomModalOpen: boolean;
  onModalOverlayClicked: () => void;
  onCreateRoomModalClose: () => void;
  onChangesNotSaved: () => void;
}
