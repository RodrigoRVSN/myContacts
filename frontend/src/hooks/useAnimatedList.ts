import {
  useEffect,
  createRef, useCallback, useRef, useState,
} from 'react';

export const useAnimatedList = (initialValue = []) => {
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState(initialValue);
  const [items, setItems] = useState([]);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleRemoveItem = useCallback((id: string) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]);
  }, []);

  const handleAnimationEnd = useCallback((itemId) => {
    const removeListener = animationEndListeners.current.get(itemId);
    removeListener();

    animationEndListeners.current.delete(itemId);
    animatedRefs.current.delete(itemId);

    setItems((prevState) => prevState.filter((message) => message.id !== itemId));
    setPendingRemovalItemsIds((prevState) => prevState.filter((id) => id !== itemId));
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const animatedElement = animatedRef?.current;
      const alreadyHasListener = animationEndListeners.current.has(itemId);

      if (animatedElement && !alreadyHasListener) {
        const onAnimationEnd = () => handleAnimationEnd(itemId);
        const removeListener = () => {
          animatedElement.removeEventListener('animationend', onAnimationEnd);
        };

        animatedElement.addEventListener('animationend', onAnimationEnd);
        animationEndListeners.current.set(itemId, removeListener);
      }
    });
  }, [handleAnimationEnd, pendingRemovalItemsIds]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;

    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  const getAnimatedRef = useCallback((itemId: string) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  const renderList = useCallback((renderItem) => items.map((item) => {
    const isLeaving = pendingRemovalItemsIds.includes(item.id);
    const animatedRef = getAnimatedRef(item.id);

    return renderItem(item, { isLeaving, animatedRef });
  }), [getAnimatedRef, items, pendingRemovalItemsIds]);

  /* useEffect(() => {
    const handleAnimationEnd = () => onAnimationEnd(message.id);

    const elementRef = animationElementRef.current;
    if (isLeaving) {
      elementRef.addEventListener('animationend', handleAnimationEnd);
    }

    return () => elementRef.removeEventListener('animationend', handleAnimationEnd);
  }, [isLeaving, message.id, onAnimationEnd]); */

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  };
};
