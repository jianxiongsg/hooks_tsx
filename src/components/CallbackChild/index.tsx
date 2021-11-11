/**@jsx createElement */
import {createElement , useRef,useContext,useCallback, useEffect ,useState} from "rax";
import { updateExpressionStatement } from "_typescript@3.9.10@typescript";
import { Context } from "../ContextParent";
import "./index.less"
export default function (props){
    const idx = useRef(0)
    useEffect(()=>{
        props.refresh();
    },[props.refresh])
    return (
        <div>
            {'child'+idx.current++}
        </div>
    )
}