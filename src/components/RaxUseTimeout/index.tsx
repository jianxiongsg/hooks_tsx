/**@jsx createElement */
import {createElement , useReducer, useEffect, useRef,memo } from "rax";
import "./index.less";
import useMountedState from 'rax-use-mounted-state';
import useTimeout from 'rax-use-timeout'; 
interface PropsInfo{
    
}
export default memo(function(props:PropsInfo){
    const isMounted = useMountedState();
    useTimeout(()=>{
        console.log("...............",isMounted())
    },2000)
    useEffect(()=>{
        setTimeout(()=>{
            console.log("...............aa",isMounted())
        },3000)
    },[])
    return (
        <div>
                111
        </div>
    )
})