import React, {useEffect} from 'react';
import {Modal, ScrollView, Input, Select, Stack, TextArea} from 'native-base';
import {Formik} from 'formik';
import CreateRoomSchema, {
  limits,
} from '@shared/constants/schema/CreateRoomSchema';
import FormGrpahqlErrorHandler from '@components/Layouts/Form/FormGrpahqlErrorHandler';
import FormikFormContollerErrorHandler from '@components/Layouts/Form/FormikFormContollerErrorHandler';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import TagsSelect from '../TagsSelect';
import {useFormik} from 'formik';
import useCreateRoom from '@shared/api/room/useCreateRoom';
import {useGetUser} from '@redux/slices/user';
import SelectRoomType from '../SelectRoomType';
import {useApolloClient} from '@apollo/client';

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
  const formik = useFormik<RoomCreateValues>({
    onSubmit: handleCreateRoom,
    initialValues,
    validationSchema: CreateRoomSchema,
  });

  const [createRomm, {data, loading}] = useCreateRoom();
  const user = useGetUser();
  const client = useApolloClient();

  async function handleCreateRoom() {
    // user is never null since we have a check on the top tree of this component
    if (!user) return;
    try {
      const {description, limit, tags, title, roomType} = formik.values;
      await createRomm({
        variables: {
          title: title,
          description: description,
          limit: limit ? Number(limit) : null,
          roomType: roomType,
          tags: tags,
          ownerMember: user.user.id,
        },
      });
    } catch {}
  }

  useEffect(() => {
    const {description, limit, tags, title, roomType} = formik.values;
    if (description || limit || tags || title || roomType) onChangesNotSaved();
  }, [formik.values]);

  useEffect(() => {
    // refetch rooms data
    // should redirect to room page instead of just closing modal
    if (!loading && data && data.CreateRoom) {
      client.refetchQueries({include: ['GetRooms']});
      onCreateRoomModalClose();
    }
  }, [data]);

  return (
    <Modal
      isOpen={isCreateRoomModalOpen}
      onClose={onModalOverlayClicked}
      size="full"
      animationPreset="slide">
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
                  errors={formik.errors}
                  touched={formik.touched}
                  name="title"
                  label="Title"
                  helperText="Must be 8 to 255 characters"
                  isRequired>
                  <Input
                    placeholder="Enter Room Title"
                    borderBottomWidth="1"
                    value={formik.values.title}
                    onChangeText={formik.handleChange('title')}
                    onBlur={formik.handleBlur('title')}
                  />
                </FormikFormContollerErrorHandler>
                <FormikFormContollerErrorHandler
                  errors={formik.errors}
                  touched={formik.touched}
                  name="description"
                  label="Description">
                  <TextArea
                    value={formik.values.description}
                    onChangeText={formik.handleChange('description')}
                    onBlur={formik.handleBlur('description')}
                    autoCompleteType={false}
                    placeholder="Enter Room Description"
                    borderBottomWidth="1"
                  />
                </FormikFormContollerErrorHandler>
                <SelectRoomType
                  name="roomType"
                  errors={formik.errors}
                  touched={formik.touched}
                  label="Room Type"
                  handleBlur={() => formik.setFieldTouched('roomType', true)}
                  handleChange={formik.handleChange('roomType')}
                  value={formik.values.roomType}
                />
                <FormikFormContollerErrorHandler
                  errors={formik.errors}
                  touched={formik.touched}
                  name="Limit"
                  label="Room Members Limit"
                  isRequired>
                  <Select
                    placeholder="Select Members Limit"
                    onValueChange={formik.handleChange('limit')}
                    selectedValue={formik.values.limit?.toString()}
                    onClose={() => formik.setFieldTouched('limit', true)}>
                    <Select.Item value={''} label={'No limit'} />
                    {limits.map((limit: string, idx: number) => (
                      <Select.Item key={idx} value={limit} label={limit} />
                    ))}
                  </Select>
                </FormikFormContollerErrorHandler>
                <TagsSelect
                  setFieldValue={formik.setFieldValue}
                  setFieldTouched={formik.setFieldTouched}
                  errors={formik.errors}
                  touched={formik.touched}
                  name="tags"
                  label="Room Tags"
                />
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
