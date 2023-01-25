import {
  useCallback,
} from 'react';
import { useIsMounted } from './useIsMounted';

export const useSafeAsyncAction = () => {
  const isMounted = useIsMounted();

  const safeAsyncAction = useCallback((callback: () => void) => {
    if (isMounted()) {
      callback();
    }
  }, [isMounted]);

  return safeAsyncAction;
};
