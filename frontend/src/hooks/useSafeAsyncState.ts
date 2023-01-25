import {
  useCallback, useState,
} from 'react';
import { useIsMounted } from './useIsMounted';

export const useSafeAsyncState = <T>(initialState: T): [T, (data: T) => void] => {
  const [state, setState] = useState(initialState);

  const isMounted = useIsMounted();

  const setSafeAsyncState = useCallback((data: T) => {
    if (isMounted()) {
      setState(data);
    }
  }, [isMounted]);

  return [state, setSafeAsyncState];
};
