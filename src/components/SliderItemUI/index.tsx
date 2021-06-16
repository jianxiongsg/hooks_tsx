/**@jsx createElement */
import {createElement , useContext, useEffect, useRef } from "rax";
import { convertValue } from "../../Util/helper";
import { Context } from "../ContextParent";
import "./index.less"
export default function (props){
    const domEle = useRef(null);
  
    useEffect(()=>{
      if(props.pushChild){
        props.pushChild(domEle.current)
      }
    },[])
    return (
        <div 
            ref={domEle} 
            className="carditem-box" 
            style={{
                backgroundColor:`rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`,
                left:convertValue(props.left)
            }}
        >
          {props.index}
        </div>
    )
}