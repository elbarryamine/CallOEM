import React, {useEffect} from 'react';
import {Button, Flex, Heading, Modal, Stack} from 'native-base';
import {useFormik} from 'formik';

import ModalSearchInput from './ModalSearchInput';
import SelectRoomType from '../SelectRoomType';
import TagsSelect from '../TagsSelect';
import useRoomSearch from '@shared/api/room/useRoomSearch';
import SearchRoomSchema from '@shared/constants/schema/SearchRoomSchema';
import {useSearchResultsContext} from '@context/searchContext';
import {useNavigation} from '@react-navigation/native';
import {RoomsListScreenProps} from '@navigation/AppStack/HomeStack';

export default function ModalSearch({isModalOpen, onModalClose}: Props) {
  const [roomSearch, {data, loading}] = useRoomSearch();
  const {navigateToSearch, setRooms} = useSearchResultsContext();
  const navigation = useNavigation<RoomsListScreenProps['navigation']>();
  const formikProps = useFormik({
    initialValues: {searchQuery: '', roomType: 'both', tags: []},
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

  const {
    errors,
    touched,
    values,
    handleChange,
    setFieldTouched,
    setFieldValue,
    handleSubmit,
  } = formikProps;

  useEffect(() => {
    if (data && data.SearchRoom) {
      setRooms(data.SearchRoom);
      if (navigateToSearch) {
        navigation.navigate('app:room:search');
      }
      onModalClose();
    }
  }, [data]);
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
