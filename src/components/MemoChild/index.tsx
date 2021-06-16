/**@jsx createElement */
import {createElement , memo, useEffect, useMemo, useRef, useState } from "rax";
import "./index.less"
export default function (props:{testFun:()=>Promise<number>}){
    const count = useRef(0);
    const [n,setN] = useState(0)
    // const showMsg=()=>{
    //     setTimeout(()=>{
    //         console.log("......a",props.a)
    //     },2000)
        
    // }
    // console.log("memo reflash",count.current++)
    useMemo(()=>{
        console.log("............",n);
//         setTimeout(()=>{
// setN(n=>++n)
//         },50)
        
    },[n])
    useEffect(()=>{
        props.testFun().then((num)=>{
            setN(num)
        })
    },[props.testFun])
    return (
        <div className="memochildbox">
            {"memo"+n}
        </div>
    )
}