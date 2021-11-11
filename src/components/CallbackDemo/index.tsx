/**@jsx createElement */
import {createElement , useContext,useCallback, useEffect ,useState} from "rax";
import { updateExpressionStatement } from "_typescript@3.9.10@typescript";
import CallbackChild from "../CallbackChild";
import { Context } from "../ContextParent";
import "./index.less"
export default function (props){
    const [count,setCount] = useState(0);
    const [val,setVal] = useState(0)
    const refresh = useCallback(()=>{
        console.log(count);
        
    },[count])
    useEffect(()=>{
        setInterval(()=>{
            console.log('.......')
            setVal(2)
        },2000)
    },[])
    return (
        <div className="childbox">
            <div className='button' onClick={()=>{
                setCount(count+1)
            }}></div>
            <CallbackChild refresh={refresh} />
        </div>
    )
}