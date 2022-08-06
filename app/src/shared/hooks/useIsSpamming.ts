import {useEffect, useState} from 'react';

export default function useIsSpamming(numOfTries?: number) {
  const [isSpamming, setIsSpamming] = useState<boolean>(false);
  const [tries, setTries] = useState<number>(0);
  let _numOfTries = numOfTries && numOfTries !== 0 ? numOfTries : 4;

  const setTrySpam = () => {
    setTries(prevTries => {
      if (prevTries >= _numOfTries - 1) {
        setIsSpamming(true);
        return prevTries;
      }
      return prevTries + 1;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSpamming(false);
      setTries(0);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [tries]);
  return {isSpamming, setTrySpam};
}
