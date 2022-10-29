import PropTypes from 'prop-types';
import React from 'react';
import { useAnimationUnmount } from '../../hooks/useAnimationUnmount';
import { LoadingSpinner } from '../LoadingSpinner';
import { ReactPortal } from '../ReactPortal';
import { Overlay } from './styles';

export function Loader({ isLoading }) {
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

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
