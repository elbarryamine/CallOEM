import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export default function useKeyboardShowing() {
  const [isKeyboardShowing, setIsKeyboardShowing] = useState<boolean>(false);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardShowing(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardShowing(false);
    });
    return () => {
      setIsKeyboardShowing(false);
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
      Keyboard.dismiss();
    };
  }, []);
  return {isKeyboardShowing};
}
