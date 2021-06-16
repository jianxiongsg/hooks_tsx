/**@jsx createElement */
import {createContext, createElement , useEffect, useState } from "rax";
import ContextChild from "../ContextChild";
import "./index.less";
let initMsg = {
    user:"",
    age:0
}
export const Context = createContext(initMsg)
export default function (props){
    const [msg,setMsg]=useState(initMsg)
    useEffect(()=>{
        setTimeout(()=>{
            setMsg(state=>({
                user:"wang",
                age:20
            }))
        },5000)
    },[])
    return (
        <Context.Provider value={msg}>
            <div className="contextparentbox" >
                <ContextChild />
            </div>
        </Context.Provider>
    )
}