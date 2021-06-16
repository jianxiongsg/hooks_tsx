import "./test"
import "./useTimer"
interface Tick {
    startTime: number | undefined,
    time: number,
    func: () => void,
  }

let ticks: Tick[] = [];
let isTick: boolean = false;
function bubbletick() {
  if (ticks.length === 0) {
    isTick = false;
    return;
  }
  isTick = true;
  requestAnimationFrame((curTime) => {
    let removelist:Tick[] = [];
    ticks.forEach(t => {
      if (t.startTime === undefined) {
        t.startTime = curTime;
      }
      let dist = curTime - t.startTime;
      if (t.time - dist < 0) {
        t.func();
        removelist.push(t)
      }
    })
    removelist.forEach((o) => {
      let idx = ticks.indexOf(o);
      if (idx !== -1) {
        ticks.splice(idx, 1);
      }
    })
    bubbletick();
  })
}
export function delay(time: number, func: () => void) {
    ticks.push({ time, func, startTime: undefined });
    if (!isTick) {
        bubbletick();
    }
}

export function convertValue(v:number){
    return v / 7.5 + "vw";
}

export function toNormalValue(v){
  return v / window.innerWidth * 750;
}

// 定义滚动类型，为了避免同一种类型连续调用时出现数字混乱
enum RollType{
  Redbag,
  Coin
}
const maxRollAnimTime = 1000;
const rollSpeed = 0.02;
const rollTypes:{[type:number]:number} = {}

const rollAmountAnim = (
    startAmount: number,
    targetAmount: number,
    type:RollType,
    updateCb?: (v: number) => void,
    finishCb?:()=>void
  ) => {
    if(!rollTypes[type]){
      rollTypes[type] = 0;
    }
    rollTypes[type]++;
    const rollTypeId = rollTypes[type];
    let rollAnimTime = Math.abs(targetAmount - startAmount) / rollSpeed;
    let changeAmount = targetAmount - startAmount;
    rollAnimTime = Math.min(rollAnimTime, maxRollAnimTime);
    let rollStartTime: number;
    const playAnim = () => {
      requestAnimationFrame((time: number) => {
        if (!rollStartTime) {
          rollStartTime = time;
        }
        let dt = time - rollStartTime;
        let showAmount = startAmount + Math.floor((dt / rollAnimTime) * changeAmount);
        showAmount = Math.floor(showAmount * 100) / 100;
        if (dt >= rollAnimTime) {
          showAmount = targetAmount;
          rollStartTime = 0;
          updateCb && updateCb(targetAmount);
          finishCb && finishCb();
          return;
        }
        if(rollTypes[type] !== rollTypeId){
          return;
        }
        updateCb(showAmount);
        playAnim();
      });
    };
    playAnim();
};

// (window as any).rollAmountAnim = rollAmountAnim;
// rollAmountAnim(0,40000,RollType.Coin,(v)=>{console.log(v),()=>{console.log("finish")}})
// setTimeout(()=>{
//   rollAmountAnim(0,90000,RollType.Coin,(v)=>{console.log(v),()=>{console.log("finish")}})
// },300)
