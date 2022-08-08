import {useState} from 'react';

export default function useModalActions() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [changesNotSaved, setChangesNotSaved] = useState<boolean>(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState<boolean>(false);

  const onModalOverlayClicked = () => {
    if (changesNotSaved) {
      setIsWarningModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const onWarningModalSureAction = () => {
    setChangesNotSaved(false);
    setIsWarningModalOpen(false);
    setIsModalOpen(false);
  };

  return {
    onWarningModalClose: () => setIsWarningModalOpen(false),
    onWarningModalOpen: () => setIsWarningModalOpen(true),
    onModalOpen: () => setIsModalOpen(true),
    onModalClose: () => setIsModalOpen(false),
    onChangesNotSaved: () => setChangesNotSaved(true),

    onWarningModalSureAction,
    onModalOverlayClicked,

    isWarningModalOpen,
    isModalOpen,
  };
}
