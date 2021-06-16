/**@jsx createElement */
import {createElement , useContext, useEffect,useRef ,useLayoutEffect} from "rax";
import { Context } from "../ContextParent";
import "./index.less"
import BubbleItem, { BubbleItemParam } from "../BubbleItem";
export default function (){
    const textArr = useRef([]);
    const childArr:Rax.MutableRefObject<BubbleItemParam[]> = useRef([]);
    const curIdx = useRef(0)
    textArr.current=[
        "111111111111111111",
        "222222222222222222222",
        "3333333333333333",
        "444444444444444444444",
        "555555555555555555",
        "66666666666666666666",
        "77777777777777777",
        "88888888888888888"
    ]
    
    const put =(child)=>{
        childArr.current.push(child);
    }

    const get=()=>{
        if (childArr.current.length === 0) {
            return null;
        }
        return childArr.current.shift();
    }
    
    const showNext=()=>{
        if(textArr.current.length === 0 || childArr.current.length === 0){
            return;
        }
        if(curIdx.current >= textArr.current.length){
            curIdx.current = 0;
        }

        let child = get();
        if(!child){
            return;
        }
        child.move(textArr.current[curIdx.current]).then(()=>{
            put(child);
            curIdx.current++;
            showNext();
        })
        
    }
    useEffect(()=>{
        showNext()
    },[])
    return (
        <div className="bubblebox" >
            {
                Array(2).fill("").map((v:string,index:number)=>{
                    return <BubbleItem 
                        v={v}
                        key={index} 
                        index={index} 
                        childArr={childArr.current}
                        showNext={showNext}
                    />
                })
            }
        </div>
    )
}