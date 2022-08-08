import React, {useEffect} from 'react';
import {Modal, ScrollView, Input, Select, Stack, TextArea} from 'native-base';
import {Formik} from 'formik';
import CreateRoomSchema, {
  limits,
} from '@shared/constants/schema/CreateRoomSchema';
import FormGrpahqlErrorHandler from '@components/Elements/FormGrpahqlErrorHandler';
import FormikFormContollerErrorHandler from '@components/Elements/FormikFormContollerErrorHandler';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import ModalTagsSelect from './ModalTagsSelect';
import {useFormik} from 'formik';
import useCreateRoom from '@shared/api/room/useCreateRoom';
import {useGetUser} from '@redux/slices/user';

const initialValues: RoomCreateValues = {
  Title: '',
  Description: '',
  'Room Type': 'public',
  Tags: [],
  Limit: undefined,
};

export default function ModalRoomCreate({
  isCreateRoomModalOpen,
  onModalOverlayClicked,
  onCreateRoomModalClose,
  onChangesNotSaved,
}: ModalRoomCreate) {
  const formikProps = useFormik<RoomCreateValues>({
    onSubmit: handleCreateRoom,
    initialValues,
    validationSchema: CreateRoomSchema,
  });
  const {handleChange, handleBlur, values, errors, touched, setFieldTouched} =
    formikProps;
  const [createRomm, {data, loading}] = useCreateRoom();
  const user = useGetUser();

  async function handleCreateRoom() {
    // user is never null since we have a check on the top tree of this component
    if (!user) return;
    try {
      await createRomm({
        variables: {
          title: values.Title,
          description: values.Description,
          limit: values.Limit ? Number(values.Limit) : null,
          roomType: values['Room Type'],
          tags: values.Tags,
          ownerMember: user.user.id,
        },
      });
    } catch {}
  }

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

  useEffect(() => {
    if (!loading && data && data.CreateRoom) {
      // should redirect to room page instead of just closing modal
      onCreateRoomModalClose();
    }
  }, [data]);

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
                    onClose={() => setFieldTouched('Room Type', true)}>
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
                    onValueChange={handleChange('Limit')}
                    selectedValue={values.Limit?.toString()}
                    onClose={() => setFieldTouched('Limit', true)}>
                    <Select.Item value={''} label={'No limit'} />
                    {limits.map((limit: string, idx: number) => (
                      <Select.Item key={idx} value={limit} label={limit} />
                    ))}
                  </Select>
                </FormikFormContollerErrorHandler>
                <ModalTagsSelect {...formikProps} />
              </Stack>
            </ScrollView>
          </Modal.Body>
          <ModalFooter
            onClose={onCreateRoomModalClose}
            onSave={handleCreateRoom}
          />
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

export type RoomCreateValues = {
  Title: string;
  Description: string;
  'Room Type': 'public' | 'private';
  Tags: string[];
  Limit: string | undefined;
};
