import { useCallback, useEffect, useRef } from "rax";

export interface RollAnimParams {
    startNum: number;
    targetNum: number;
    rollSpeed?: number;
    maxRollAnimTime?: number;
    interval?: number;
    updateCb?: (v: number) => void;
    finishCb?: (v: number) => void;
    intervalCb?: () => void;
  }
  
export function rollAnim(data: RollAnimParams) {
    const { startNum } = data;
    const { targetNum } = data;
    const maxRollAnimTime = data.maxRollAnimTime || 1000;
    const rollSpeed = data.rollSpeed || 0.02;
    const { updateCb } = data;
    const { finishCb } = data;
    let rollAnimTime = Math.abs(targetNum - startNum) / rollSpeed;
    const changeAmount = targetNum - startNum;
    let rollStartTime;
    let hander = null;
    const { interval } = data;
    const { intervalCb } = data;
    let lastTime = 0;
    rollAnimTime = Math.min(rollAnimTime, maxRollAnimTime);
    const cancel = () => {
        if (hander) {
        cancelAnimationFrame(hander);
        hander = null;
        }
    };
    const playAnim = () => {
        hander = requestAnimationFrame((time: number) => {
        if (!rollStartTime) {
            rollStartTime = time;
        }
        const dt = time - rollStartTime;
        let showAmount = startNum + Math.floor((dt / rollAnimTime) * changeAmount);
        showAmount = Math.floor(showAmount * 100) / 100;
        if (dt >= rollAnimTime) {
            showAmount = targetNum;
            rollStartTime = 0;
            updateCb && updateCb(targetNum);
            finishCb && finishCb(targetNum);
            return;
        }
        if (intervalCb && interval) {
            if (!lastTime) {
            lastTime = time;
            }
            if (time - lastTime >= interval) {
            intervalCb();
            lastTime = time;
            }
        }

        updateCb && updateCb(showAmount);
        playAnim();
        });
    };
    playAnim();
    return cancel;
}
  
export default function useNumRoll() {
    const hander = useRef(null);
    useEffect(() => {
      return () => {
        if(hander.current){
            hander.current();
            hander.current = null;
        }
      };
    }, []);
  
    return useCallback((info:RollAnimParams)=>{
        if(hander.current){
            hander.current();
            hander.current = null;
        }
        hander.current = rollAnim(info);
        return hander.current;
    },[]);
  }
  