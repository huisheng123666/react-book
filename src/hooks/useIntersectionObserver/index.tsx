import { useEffect, useState } from "react";

export interface Options {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

const useIntersectionObserver = (
  targetRef: React.RefObject<Element | null>,
  {
    threshold = 0.5,
    root = null,
    rootMargin = "0%",
    freezeOnceVisible = false,
  }: Options
) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    const element = targetRef.current;
    if (!element || (entry?.isIntersecting && freezeOnceVisible)) return;

    const observerParams = { threshold, root, rootMargin };

    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        setEntry(entry);
      },
      observerParams
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, freezeOnceVisible, targetRef, entry]);

  return entry;
};

export default useIntersectionObserver;
