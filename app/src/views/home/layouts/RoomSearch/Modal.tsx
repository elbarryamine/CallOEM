import React, {useEffect} from 'react';
import {Button, Flex, Heading, Modal, Stack} from 'native-base';
import {useFormik} from 'formik';

import ModalSearchInput from './ModalSearchInput';
import SelectRoomType from '../SelectRoomType';
import TagsSelect from '../TagsSelect';
import useRoomSearch from '@shared/api/room/useRoomSearch';
import SearchRoomSchema from '@shared/constants/schema/SearchRoomSchema';
import {useNavigation} from '@react-navigation/native';
import {useSearchResultsContext} from '@context/SearchContext';
import {useApolloClient} from '@apollo/client';
import {SearchNativeStack} from '@navigation/HomeStack';

export default function ModalSearch({isModalOpen, onModalClose}: Props) {
  const [roomSearch, {data, loading}] = useRoomSearch();
  const {isSearchScreen, setRooms} = useSearchResultsContext();
  const client = useApolloClient();
  const navigation = useNavigation<SearchNativeStack['navigation']>();
  const formikProps = useFormik({
    initialValues: {searchQuery: '', roomType: 'both', tags: []},
    onSubmit: async values => {
      try {
        if (data?.SearchRoom) {
          client.refetchQueries({include: ['SearchRoom']});
        }
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
    // this modal has a parent context with isSearchScreen to share rooms data between RoomListScreen and SearchScreen since you can start searchin in both the screen
    // if user search in Home Screen we set the results with setRooms and we navigate to SearchScreen
    // if user search in Search Screen we set the results with setRooms and we dont navigate
    if (data && data.SearchRoom) {
      setRooms(data.SearchRoom);
      if (!isSearchScreen) {
        navigation.navigate('search');
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
