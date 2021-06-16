/**@jsx createElement */
import {createElement , useContext, useEffect, useState } from "rax";
import { delay } from "../../Util/helper";
import { Context } from "../ContextParent";
import "./index.less"
export interface BubbleItemParam{
    move:(v:string)=>Promise<any>
}
export default function (props){
    const [className,setClassName]=useState("bubbleitem-txt");
    const [msg,setMsg]= useState("")
    const move=(v:string)=>{
        console.log("...........v",v)
        return new Promise((resolve)=>{
            
            setMsg(v);
            setClassName("bubbleitem-txt move1");
            delay(4000,()=>{
                setClassName("bubbleitem-txt");
                resolve();
            })
        })
        
    }
    useEffect(()=>{
        props.childArr.push({
            move:move
        });
    },[])
    return (
        <div className={className} >
            {msg}
        </div>
    )
}