/**@jsx createElement */
import {createElement , useEffect,useMemo, useRef,memo ,useState,useCallback} from "rax";
import useTimeout from "../../hooks/useTimeout";
import RaxCallBackChild from "../RaxCallBackChild";
let idx=0;
export default memo(function(props){
    const [count,setCount] = useState(0);
    const [a,setA] = useState(0);
    const localTimeout = useTimeout();
    const addCount = useCallback((a)=>{
        console.log("a",a)
        return a
    },[a])

    const update=()=>{
        setA(idx++)
    }

    const getA = useMemo(()=>{
        console.log("useMemo",a)
        return a+1;
    },[a])
    
    useEffect(()=>{
        localTimeout(()=>{
            console.log("................timeout")
        },1000);
        (window as any).update=update
    },[])
    console.log(".........refresh")
    return (
        <div>
            <RaxCallBackChild count={count} addCount={addCount} />
            {getA}
        </div>
    )
})