/** @jsx createElement */
import {createContext, createElement, useCallback, useEffect, useMemo, useRef, useState} from "rax";
import Child from "../Child";
import "./index.less";
import "../../Util/helper";
import Bubble from "../Bubble";
import { useTimer } from "../../Util/useTimer";
import SvgToolTip from "svg-tooltips-jx";
import LockDemo from "../LockDemo";
import "../XXL"
import MemoChild from "../MemoChild";
import Button from "../Button";
import useNumRoll from "../../hooks/useNumRoll";

const Context = createContext({})
function Counter() {
    const [count, setCount] = useState(0);
    
    console.log("reflesh",count)
    const prevCount = usePrevious(count);
    useEffect(()=>{
        console.log("---------------------",count)
        setTimeout(()=>{
            setCount(v=>{
                console.log("...............",v)
                return v+10;
            })
        },3000 )
    },[])
    return (
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
    );
  }
  
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      (ref as any).current = value;
    });
    return ref.current;
  }
export default function Demo(){
    const [a, setA] = useState(0);
    const [b,setB] = useState(0);
    const preA = usePrevious(a);
    const boxEle = useRef(null);
    const [showButton,setShowButton] = useState(true);
    const localNumRoll = useNumRoll();
    const [msg,setMsg] = useState({
        name:"jian",
        age:10
    })
    // console.log(".............update")
    const n = useRef(0);
    const child1 = useMemo(()=><Child a={a} />,[a])
    const cb = useCallback(()=>{
        // console.log("...........",a);
        return a;
    },[a])
    const testCallback = useCallback(()=>{
        console.log(">>>>>>>>>>>>>>>>>>>>>>>testCallback")
        return new Promise<number>((resolve,reject)=>{
            resolve(a+3);
        })
        // if(a===3){
        //     return a
        // }
    },[a])
    const getContent=()=>{
        return <div>content</div>
    }
    const defsElement = <linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
    <stop offset="0%" stop-color="rgba(0,0,0,0.4)"/>
    <stop offset="100%" stop-color="rgba(0,0,0,.8)" />
  </linearGradient>;
    useEffect(()=>{
        // console.log("a:",a,"b",b)
        n.current++;
        setInterval(()=>{
            setB((v)=>{
                return n.current
            });
            // setB(n.current);
            setMsg(state=>({...state,name:"zhang"+a}));
            // setMsg(state =>{
            //     console.log("..........state",state)
            //     return {...state,name:"zhang"+a}
            // })
        },5000)
    },[a])
    useEffect(()=>{
        (window as any).setButton = (v)=>{
            setShowButton(v)
        }
        setTimeout(()=>{
            setShowButton(false)
        },300)
    },[])
    let test = "是否结束打\n发时间佛山"
    return (
        <div className="demobox" ref={boxEle}>
            {test}
            <div className="testpresentation" role="presentation" aria-label="我是测试呀"></div>
            
            {
                showButton && <Button />
            }
            {/* <Child a={a} /> */}
            {/* {child1} */}
            {/* <MemoChild testFun={testCallback} /> */}
            {/* {`名字：${msg.name} 年龄：${msg.age} a:${a} preA:${preA}`} */}
            {/* <ContextParent />
            <Counter /> */}
            {/* <LoadingUI /> */}
            {/* {n.current === 0 && <TransformTest />} */}
            {/* <Bubble /> */}
            {/* <LockDemo /> */}
            {/* <SvgToolTip
                className={`svg-con`}
                a11yId={"svgEleId"}
                strockWidth={0}
                radius={18}
                width={300}
                height={80}
                direction={"top"}
                arrowOffset={0}
                arrowWidth={12}
                arrowHeight={24}
                arrowPath={'L -12 12 L -24 0'}
                content={getContent()}
                defsElement={defsElement}
                fill='url(#Gradient1)'
            ></SvgToolTip> */}
            {/* <div className="mm1" ><div className="mm2"></div></div> */}
        </div>
    )
}

let children = [
    {x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:4,y:0},{x:5,y:0},
    {x:0,y:1},{x:0,y:2},{x:0,y:3},{x:0,y:4},{x:0,y:5},{x:0,y:6}  
];

function _sort(a,b){
    if(a.x== b.x&&a.y== b.y){
        return 0
    }
    if(a.x== b.x){
        return a.y> b.y?1:-1
    }
    return a.x> b.x?1:-1

}

function test(p,l,r){
    var l=l||0,r=r||children.length;

    while(r-l>0){
        var m=(l+r)>>1

        var mid=children[m]
        //比较下坐标大小
        var order=_sort(p,mid)

        if(order==1){
            l=Math.max(l+1,m)
        }else if(order==-1){
            r=Math.min(r-1,m)
        }else{
            l=r=m
        }
    }

    return (l+r)>>1
}

console.log(test({x:0,y:4},0,8));