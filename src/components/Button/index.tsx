/**@jsx createElement */
import {createElement , useContext, useEffect, useRef, useState } from "rax";
import useNumRoll from "../../hooks/useNumRoll";
import { Context } from "../ContextParent";
import "./index.less"
// (function()
// {
//     var agent = navigator.userAgent.toLowerCase();        //检测是否是ios
//     var iLastTouch = null;                                //缓存上一次tap的时间
//     if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0)
//     {
//         document.body.addEventListener('touchend', function(event)
//         {
//             var iNow = new Date()
//                 .getTime();
//             iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */ ;
//             var delta = iNow - iLastTouch;
//             if (delta < 500 && delta > 0)
//             {
//                 event.preventDefault();
//                 return false;
//             }
//             iLastTouch = iNow;
//         }, false);
//     }
 
// })();
export default function (props){
    const {user,age} = useContext(Context);
    const [clickAnim,setClickAnim] = useState(false)
    const localRollNum = useNumRoll();
    const curRedAmount = useRef(0);
    const [redAmount,setRedAmount] = useState(0);
    const [targetAmount,setTargetAmount] = useState(3000);
    const showMsg=()=>{
        setTimeout(()=>{
            console.log("......a",props.a)
        },2000)
        
    }
    const onPressFeedCat=()=>{
        setClickAnim(true);
    setTimeout(() => {
      setClickAnim(false);
    }, 500);
    }
    useEffect(()=>{
      localRollNum({
        startNum: curRedAmount.current,
        targetNum: targetAmount,
        rollSpeed: 0.02,
        interval: 100,
        maxRollAnimTime: 1000,
        updateCb: (n: number) => {
          setRedAmount(n);
          curRedAmount.current = n;
          console.log("..........updateCb",n)
        },
        intervalCb: () => {
          console.log("..........intervalCb")
        },
        finishCb: () => {
          console.log("..........finishCb")
        }
      })
    },[targetAmount])
    useEffect(()=>{
      (window as any).setTarget=(v)=>{
        setTargetAmount(v)
      }
    },[])
    return (
        <div
    //   role="button"
      tabIndex={-1}
      className={`feedbuttonui`}
      onClick={onPressFeedCat}
      aria-label={`fgfdgd`}>
      <div className="feedbuttonui-body">
        <div
          className={`feedbutton-btn${clickAnim ? ' feedbtn-clkanim' : ''}${
             !clickAnim && true ? ' feedbtn-guideanim' : ''
          }`}
        >
          <img
            aria-hidden="true"
            className="feedbutton-img"
            src={"https://gw.alicdn.com/imgextra/i3/O1CN01Lnqbrk1onFY4IiTN9_!!6000000005269-2-tps-438-194.png"}
            alt="喂食按钮"
          />
          <div>{redAmount}</div>
          {true && (
            <div className="feedbtn-lightbox" aria-hidden="true">
              <img
                className="feedbtn-beforeimg"
                alt="光效"
                aria-hidden="true"
                src={'https://gw.alicdn.com/imgextra/i4/O1CN01IJ9pfr1uVk6QbPxVh_!!6000000006043-2-tps-303-39.png'}
              />
              <div className="feedbtn-linelight">
                <img
                  className="feedbtn-lineimg"
                  alt="光效"
                  aria-hidden="true"
                  src={'https://gw.alicdn.com/imgextra/i2/O1CN01bJ5GbN1bJr7pZLRUm_!!6000000003445-2-tps-166-276.png'}
                />
              </div>
              <img
                className="feedbtn-afterimg"
                alt="光效"
                aria-hidden="true"
                src={'https://gw.alicdn.com/imgextra/i4/O1CN01IJ9pfr1uVk6QbPxVh_!!6000000006043-2-tps-303-39.png'}
              />
            </div>
          )}
        </div>
        <div className="feedbutton-btm" role-hidden="true">
          <img
            aria-hidden="true"
            className="feedbutton-btnmask"
            src={'https://gw.alicdn.com/imgextra/i3/O1CN01PvwUWP1NcGQG53xWF_!!6000000001590-2-tps-438-194.png'}
            alt="喂食按钮"
          />
          {true && (
            <div aria-hidden="true" className="feedbutton-tipsbox">
              {/* <img
                className="feedbutton-tipsbg"
                src={'https://gw.alicdn.com/imgextra/i3/O1CN0155p1NE1beSwqIiyHk_!!6000000003490-2-tps-331-53.png'}
                
              /> */}
            </div>
          )}
        </div>
      </div>
    </div>
    )
}