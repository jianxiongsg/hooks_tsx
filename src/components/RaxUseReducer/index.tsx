/**@jsx createElement */
import {createElement , useReducer, useEffect, useRef,memo } from "rax";
import "./index.less"
interface PropsInfo{
    addCount:Function;
    count:number;
}
export default memo(function(props:PropsInfo){
    const [msg,dispatch] = useReducer((state,action)=>{
        switch(action){
            case "a":
            return {count:"我是a"};
            case "b":
            return {count:"我是b"};
            default:
            return state;
        }
    },{count:"什么也不是"})
    console.log(".............渲染了")
    return (
        <div>
            <div>{msg.count}</div>
            <div className={"btn"} onClick={()=>{dispatch("a")}}>{"点击我是a"}</div>
            <div className={"btn"} onClick={()=>{dispatch("b")}}>{"点击我是b"}</div>
            <div className={"btn"} onClick={()=>{dispatch("b")}}>{"点击我是c"}</div>
        </div>
    )
})