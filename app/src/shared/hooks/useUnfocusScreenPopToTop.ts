import {useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';

function useUnfocusScreenPopToTop(
  navigation: NativeStackNavigationProp<ParamListBase, string, never>,
) {
  useEffect(() => {
    navigation.addListener('blur', () => {
      navigation.popToTop();
    });
    return () => {
      navigation.removeListener('blur', () => {});
    };
  }, [navigation]);
}

export default useUnfocusScreenPopToTop;
