import { useAnimationUnmount } from '../../hooks/useAnimationUnmount';
import { LoadingSpinner } from '../LoadingSpinner';
import { ReactPortal } from '../ReactPortal';
import { Overlay } from './styles';

type LoaderProps = {
  isLoading: boolean
}

export function Loader({ isLoading }: LoaderProps) {
  const { animatedElementRef, shouldRender } = useAnimationUnmount(isLoading);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">

      <Overlay ref={animatedElementRef} isLeaving={!isLoading}>
        <LoadingSpinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}
