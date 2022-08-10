import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import useIsSpamming from './useIsSpamming';

export default function useNavigationChangeHandler(allowed: boolean) {
  const [isAllowed, setIsAllowNavigate] = useState<boolean>(allowed);
  const {isSpamming, setTrySpam} = useIsSpamming(0);

  const navigation = useNavigation();
  const allowNavigate = () => setIsAllowNavigate(true);
  const preventNavigate = () => setIsAllowNavigate(false);
  useEffect(() => {
    if (isAllowed) {
      navigation.removeListener('beforeRemove', () => {});
    }
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      setTrySpam();
    });
    return () => {
      navigation.removeListener('beforeRemove', () => {});
    };
  }, [navigation]);
  return {
    isAllowed,
    allowNavigate,
    preventNavigate,
    isSpamming,
  };
}
