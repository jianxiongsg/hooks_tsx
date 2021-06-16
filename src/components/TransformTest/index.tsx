/**@jsx createElement */
import {createElement , useContext, useEffect, useRef } from "rax";
import { useTimer } from "../../Util/useTimer";
import { Context } from "../ContextParent";
import "./index.less"
export default function(props){
    const {user,age} = useContext(Context);
    const refEle = useRef(null)
    const [delay,clearDelay] = useTimer();
    
    const hander = delay(()=>{
        console.log(">>>>>>>>>>>>>")
    },8000)
    // setTimeout(()=>{
    //     (clearDelay as any)(hander)
    // },2000)
    
    useEffect(()=>{
        setTimeout(()=>{
            refEle.current.style.transform = "translateX(0vw)"
        },1000)
    },[])
    return (
        <div className="testbox" >
           <div ref={refEle} className="testcon" >
           
           </div>
        </div>
    )
}