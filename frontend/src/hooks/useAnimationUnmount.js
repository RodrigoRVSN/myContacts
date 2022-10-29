import { useEffect, useRef, useState } from 'react';

export const useAnimationUnmount = (isVisible) => {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const animatedElementRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    }
    const handleAnimationEnd = () => setShouldRender(false);

    const elementRef = animatedElementRef.current;

    if (!isVisible && elementRef) {
      elementRef.addEventListener('animationend', handleAnimationEnd);
    }

    return () => elementRef?.removeEventListener('animationend', handleAnimationEnd);
  }, [isVisible]);

  return { animatedElementRef, shouldRender };
};
