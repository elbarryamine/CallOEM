import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import useIsSpamming from './useIsSpamming';

export default function useBackHandler() {
  const navigation = useNavigation();
  const [isAllowedToGoBack, setIsAllowedToGoBack] = useState<boolean>(true);
  const {setTrySpam, isSpamming} = useIsSpamming();
  function goBack() {
    navigation.goBack();
  }
  const callBack = () => {
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
    allowBack: () => setIsAllowedToGoBack(true),
    preventBack: () => setIsAllowedToGoBack(false),
    goBack,
    isSpamming,
  };
}
