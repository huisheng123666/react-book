import { EffectCallback, DependencyList, useRef, useLayoutEffect } from "react";

function useUpdateLayoutEffect(callback: EffectCallback, deps: DependencyList) {
  const isInit = useRef(false);

  useLayoutEffect(() => {
    return () => {
      isInit.current = false;
    };
  }, []);

  useLayoutEffect(() => {
    if (!isInit.current) {
      isInit.current = true;
      return;
    }
    callback();
  }, deps);
}

export default useUpdateLayoutEffect;
