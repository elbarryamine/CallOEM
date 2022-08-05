import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';

export default function useBackHandler() {
  const navigation = useNavigation();
  const [isAllowedToGoBack, setIsAllowedToGoBack] = useState<boolean>(true);
  const [isSpamming, setIsSpamming] = useState<boolean>(false);
  const [tries, setTries] = useState<number>(0);
  function goBack() {
    navigation.goBack();
  }
  useEffect(() => {
    const callBack = () => {
      setTries(prevTries => {
        console.log(prevTries);
        if (prevTries > 3) {
          setIsSpamming(true);
          return prevTries;
        }
        return prevTries + 1;
      });

      return !isAllowedToGoBack;
    };
    BackHandler.addEventListener('hardwareBackPress', callBack);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', callBack);
    };
  }, [isAllowedToGoBack]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSpamming(false);
      setTries(0);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [tries]);
  console.log(isSpamming, tries);
  return {
    allowBack: () => setIsAllowedToGoBack(true),
    preventBack: () => setIsAllowedToGoBack(false),
    goBack,
    isSpamming,
  };
}
