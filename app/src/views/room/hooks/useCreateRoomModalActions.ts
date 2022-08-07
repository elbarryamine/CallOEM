import {useState} from 'react';

export default function useCreateRoomModalActions() {
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] =
    useState<boolean>(false);
  const [changesNotSaved, setChangesNotSaved] = useState<boolean>(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState<boolean>(false);

  const onModalOverlayClicked = () => {
    if (changesNotSaved) {
      setIsWarningModalOpen(true);
    } else {
      setIsCreateRoomModalOpen(false);
    }
  };

  const onWarningModalSureAction = () => {
    setChangesNotSaved(false);
    setIsWarningModalOpen(false);
    setIsCreateRoomModalOpen(false);
  };

  return {
    onWarningModalClose: () => setIsWarningModalOpen(false),
    onWarningModalOpen: () => setIsWarningModalOpen(true),
    onCreateRoomModalOpen: () => setIsCreateRoomModalOpen(true),
    onCreateRoomModalClose: () => setIsCreateRoomModalOpen(false),
    onChangesNotSaved: () => setChangesNotSaved(true),

    onWarningModalSureAction,
    onModalOverlayClicked,

    isWarningModalOpen,
    isCreateRoomModalOpen,
  };
}
