/**@jsx createElement */
import {createElement , useContext, useEffect } from "rax";
import Child from "../Child";
import { Context } from "../ContextParent";
import "./index.less"
export default function (props){
    const {user,age} = useContext(Context)
    const showMsg=()=>{
        setTimeout(()=>{
            console.log("......msg",user,age)
        },5000)
        
    }
    useEffect(()=>{

    },[])
    return (
        <div className="contextchildbox" onClick={showMsg}>
            {`user:${user},age:${age}`}

            <Child a={1} />
        </div>
    )
}
