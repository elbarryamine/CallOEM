import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import useIsSpamming from './useIsSpamming';

export default function useBackHandler({
  initialAllowedState,
  onAllowBack,
}: {
  initialAllowedState: boolean;
  onAllowBack?: () => void;
}) {
  const navigation = useNavigation();
  const [isAllowedToGoBack, setIsAllowedToGoBack] =
    useState<boolean>(initialAllowedState);
  const {setTrySpam, isSpamming} = useIsSpamming();
  function goBack() {
    navigation.goBack();
  }
  const callBack = () => {
    if (isAllowedToGoBack) {
      onAllowBack && onAllowBack();
      return true;
    }
    setTrySpam();
    return !isAllowedToGoBack;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', callBack);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', callBack);
    };
  }, [isAllowedToGoBack]);

  return {
    isAllowedToGoBack,
    allowBack: () => setIsAllowedToGoBack(true),
    preventBack: () => setIsAllowedToGoBack(false),
    goBack,
    isSpamming,
  };
}
