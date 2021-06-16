/**@jsx createElement */
import {createElement , useContext, useEffect } from "rax";
import { Context } from "../ContextParent";
import "./index.less"
export default function (props){
    const {user,age} = useContext(Context);
    const showMsg=()=>{
        setTimeout(()=>{
            console.log("......a",props.a)
        },2000)
        
    }
    useEffect(()=>{

    },[])
    return (
        <div className="childbox" onClick={showMsg}>
            {props.a}
        </div>
    )
}