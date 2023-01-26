import {
  useEffect,
  createRef, useCallback, useRef, useState, RefObject,
} from 'react';

type Identifier = {
  id: number
}

type RenderItemProps = {
  isLeaving: boolean
  animatedRef: RefObject<HTMLDivElement>
}

export const useAnimatedList = <T extends Identifier>(initialValue = []) => {
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState<number[]>(initialValue);
  const [items, setItems] = useState<T[]>([]);
  console.log({ items })
  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleRemoveItem = useCallback((id: number) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]);
  }, []);

  const handleAnimationEnd = useCallback((itemId: number) => {
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

  const getAnimatedRef = useCallback((itemId: number) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  const renderList = useCallback(
    (renderItem: (message: T, { isLeaving, animatedRef }: RenderItemProps) => JSX.Element) => items.map((item) => {
      console.log(renderItem)
      const isLeaving = pendingRemovalItemsIds.includes(Number(item.id));
      const animatedRef = getAnimatedRef(Number(item.id));

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
