/** @jsx createElement */
import { useEffect, useRef } from 'rax';

export const useTimer = () => {
  const timerList = useRef([]);

  const _setTimeout = useRef((cb, time) => {
    let timer = setTimeout(() => {
      cb && cb();
      removeListItem(timer);
    }, time);
    timerList.current.push(timer);
    return timer;
  });

  const _clearTimeout = useRef((timer) => {
    clearTimeout(timer);
    removeListItem(timer);
  });

  const removeListItem = (timer) => {
    let idx = timerList.current.findIndex(item => item === timer);
    idx >= 0 && timerList.current.splice(idx, 1);
  }
  
  useEffect(() => {
    return () => {
      timerList.current.length > 0 && timerList.current.map(item => {
        clearTimeout(item);
      });
      timerList.current = [];
      console.log("...........",timerList.current.length);
    }
  }, [])

  return [_setTimeout.current, _clearTimeout.current];
}

// const [delay,clear] = useTimer()
// let hander = delay(()=>{
//     console.log("...............")
// },3000)
// setTimeout(()=>{
//     clear(hander)
// },1000)
