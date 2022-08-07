import React, {useState, useEffect} from 'react';
import {
  Heading,
  Modal,
  ScrollView,
  Text,
  Input,
  Select,
  Spinner,
  Stack,
  TextArea,
  HStack,
} from 'native-base';
import RoomCreatingNotSavedModal from './RoomCreatingNotSavedModal';
import ButtonIcon from '@components/Elements/ButtonIcon';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Tag} from '@shared/types/Tag';
import useGetTags from '@shared/api/tag/useGetTags';
import {Formik} from 'formik';
import CreateRoomSchema from '@shared/constants/schema/CreateRoomSchema';
import FormGrpahqlErrorHandler from '@components/Elements/FormGrpahqlErrorHandler';
import FormikFormContollerErrorHandler from '@components/Elements/FormikFormContollerErrorHandler';
import RoomCreatingTagsDisplay from './RoomCreatingTagsDisplay';
import RoomCreatingModalFooter from './RoomCreatingModalFooter';
import RoomCreatingModalHeader from './RoomCreatingModalHeader';
import useHandleTagsChange from '../hooks/useHandleTagsChange';
import useCreateRoomModalActions from '../hooks/useCreateRoomModalActions';

const limits = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'No Limit'];
const initialValues = {
  Title: '',
  Description: '',
  'Room Type': '',
  Tags: '',
  Limit: '',
};

export default function RoomListScreenHeader() {
  const {data: tagsQueryData, loading: tagsQueryLoading} = useGetTags();

  const [tagsData, setTagsData] = useState<Array<Tag>>([]);
  const {handleSelectTags, setTags, tags} = useHandleTagsChange();
  const {
    onWarningModalClose,
    onModalOverlayClicked,
    onWarningModalSureAction,
    isWarningModalOpen,
    onCreateRoomModalOpen,
    onCreateRoomModalClose,
    isCreateRoomModalOpen,
  } = useCreateRoomModalActions();

  const handleCreateRoom = () => {};

  useEffect(() => {
    if (!tagsQueryData || !tagsQueryData.GetTags) return;
    setTagsData(tagsQueryData.GetTags);
  }, [tagsQueryData]);
  return (
    <>
      <HStack>
        <Stack flex="1">
          <Heading color="text">Latest Public Rooms</Heading>
          <Text fontSize="sub" color="subText" flexWrap="wrap">
            Join a room and start sharing your ideas
          </Text>
        </Stack>
        <Stack alignItems="center">
          <ButtonIcon
            as={AntDesign}
            name="plus"
            text="Add"
            onPress={onCreateRoomModalOpen}
          />
        </Stack>
      </HStack>
      <RoomCreatingNotSavedModal
        isOpen={isWarningModalOpen}
        onSure={onWarningModalSureAction}
        onClose={onWarningModalClose}
      />
      <Modal
        isOpen={isCreateRoomModalOpen}
        onClose={onModalOverlayClicked}
        size="full">
        <Formik
          initialValues={initialValues}
          validationSchema={CreateRoomSchema}
          onSubmit={handleCreateRoom}>
          {({
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <Modal.Content h="80%" w="95%">
              <RoomCreatingModalHeader />
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
                                    word.slice(0, 1).toUpperCase() +
                                    word.slice(1),
                                )
                                .join(' ');

                              return (
                                <Select.Item
                                  key={idx}
                                  value={tag}
                                  label={capitalizedTag}
                                />
                              );
                            })}
                          </Select>
                        )}
                      </FormikFormContollerErrorHandler>
                      <RoomCreatingTagsDisplay tags={tags} setTags={setTags} />
                    </Stack>
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
                  </Stack>
                </ScrollView>
              </Modal.Body>
              <RoomCreatingModalFooter onClose={onCreateRoomModalClose} />
            </Modal.Content>
          )}
        </Formik>
      </Modal>
    </>
  );
}
