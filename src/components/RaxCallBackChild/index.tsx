/**@jsx createElement */
import {createElement , useContext, useEffect, useRef,memo } from "rax";
interface PropsInfo{
    addCount:Function;
    count:number;
}
export default memo(function(props:PropsInfo){
    console.log("................udpate",props.count)
    return (
        <div>{props.count}</div>
    )
})