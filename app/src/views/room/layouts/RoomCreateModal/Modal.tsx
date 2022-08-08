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
  title: '',
  description: '',
  roomType: 'public',
  tags: [],
  limit: undefined,
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
          title: values.title,
          description: values.description,
          limit: values.limit ? Number(values.limit) : null,
          roomType: values.roomType,
          tags: values.tags,
          ownerMember: user.user.id,
        },
      });
    } catch {}
  }

  useEffect(() => {
    if (
      values.description ||
      values.limit ||
      values.tags ||
      values.title ||
      values.roomType
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
                  name="title"
                  label="Title"
                  helperText="Must be 8 to 255 characters"
                  isRequired>
                  <Input
                    placeholder="Enter Room Title"
                    borderBottomWidth="1"
                    value={values.title}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                  />
                </FormikFormContollerErrorHandler>
                <FormikFormContollerErrorHandler
                  errors={errors}
                  touched={touched}
                  name="description"
                  label="Description">
                  <TextArea
                    value={values.description}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    autoCompleteType={false}
                    placeholder="Enter Room Description"
                    borderBottomWidth="1"
                  />
                </FormikFormContollerErrorHandler>
                <FormikFormContollerErrorHandler
                  errors={errors}
                  touched={touched}
                  name="roomType"
                  label="Room Access Type"
                  isRequired>
                  <Select
                    placeholder="Select Access Type"
                    onValueChange={handleChange('roomType')}
                    selectedValue={values.roomType}
                    onClose={() => setFieldTouched('roomType', true)}>
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
                    onValueChange={handleChange('limit')}
                    selectedValue={values.limit?.toString()}
                    onClose={() => setFieldTouched('limit', true)}>
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
  title: string;
  description: string;
  roomType: 'public' | 'private';
  tags: string[];
  limit: string | undefined;
};
