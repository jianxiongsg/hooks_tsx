import { useRef, useEffect, useCallback } from 'rax';

export default function useTimeout() {
  const destroy = useRef(false);
  console.log('............aaa')
  useEffect(() => {
    return () => {
      destroy.current = true;
    };
  }, []);
    
 
  return useCallback(
      (cb: () => void, msTime: number) => {
    return setTimeout(() => {
      if (destroy.current) {
        return;
      }
      cb && cb();
    }, msTime);
  }, []);
}
