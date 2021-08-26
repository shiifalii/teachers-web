import { SetStateAction, useEffect, useState } from 'react';

type Callback<T> = (value?: T) => void;
type DispatchWithCallback<T> = (value: T, callback?: Callback<T>) => void;

export default function useWindowInfiniteScroll<T>(
  initial: boolean | (() => boolean),
): [boolean, DispatchWithCallback<SetStateAction<boolean>>] {
  const [hasReachedBottom, setHasReachedBottom] = useState(initial);

  const scrollHandler = (e: any) => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 20 >=
      document.documentElement.offsetHeight
    ) {
      setHasReachedBottom(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return [hasReachedBottom, setHasReachedBottom];
}
