import {useState} from 'react';

export default function useCreateRoomModalActions() {
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] =
    useState<boolean>(false);
  const [hasUnSavedChanges, setHasUnSavedChanges] = useState<boolean>(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState<boolean>(false);

  const onModalOverlayClicked = () => {
    if (hasUnSavedChanges) {
      setIsWarningModalOpen(true);
    } else {
      setIsCreateRoomModalOpen(false);
    }
  };

  const onWarningModalSureAction = () => {
    setHasUnSavedChanges(false);
    setIsWarningModalOpen(false);
    setIsCreateRoomModalOpen(false);
  };

  return {
    onWarningModalClose: () => setIsWarningModalOpen(false),
    onWarningModalOpen: () => setIsWarningModalOpen(true),
    onCreateRoomModalOpen: () => setIsCreateRoomModalOpen(true),
    onCreateRoomModalClose: () => setIsCreateRoomModalOpen(false),

    onWarningModalSureAction,
    onModalOverlayClicked,

    isWarningModalOpen,
    isCreateRoomModalOpen,
  };
}
