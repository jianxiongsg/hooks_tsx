/**@jsx createElement */
import {createElement , useContext, useEffect, useRef, useState } from "rax";
import { addToLazy } from "../../Util/LazyImage";
import { Context } from "../ContextParent";
import "./index.less"
let imgarr=[
    'https://gw.alicdn.com/imgextra/i3/O1CN01nR9msk1drrlOOc7F9_!!6000000003790-2-tps-444-80.png',
    'https://gw.alicdn.com/mt/TB15SQgUYY1gK0jSZTEXXXDQVXa-1021-127.png',
    'https://gw.alicdn.com/imgextra/i4/O1CN01wxnHud1iYhFCtAVL6_!!6000000004425-2-tps-112-122.png',
    'https://gw.alicdn.com/imgextra/i2/O1CN01geEi4l28DnB2Ckeze_!!6000000007899-2-tps-558-142.png',
    'https://gw.alicdn.com/imgextra/i4/O1CN01cZev3V1tsM0xLAZst_!!6000000005957-2-tps-558-130.png',
    'https://gw.alicdn.com/imgextra/i3/O1CN018THIVx1axPgr9CgfW_!!6000000003396-2-tps-112-48.png',
    'https://gw.alicdn.com/imgextra/i3/O1CN01oHP6XL1GRXoh5yDVt_!!6000000000619-2-tps-558-137.png',
    'https://gw.alicdn.com/tfs/TB19REvB4v1gK0jSZFFXXb0sXXa-647-875.png',
    'https://gw.alicdn.com/imgextra/i2/O1CN01qGq50L246EAo43ZMW_!!6000000007341-2-tps-750-210.png',
    'https://gw.alicdn.com/imgextra/i1/O1CN01NdQZkK1Pq7bs9oVAV_!!6000000001891-2-tps-750-510.png',
    'https://gw.alicdn.com/imgextra/i3/O1CN01p6qxGA207p5cgJJXU_!!6000000006803-2-tps-228-43.png',
    'https://gw.alicdn.com/imgextra/i2/O1CN01bYN8L822eSXmAermI_!!6000000007145-2-tps-750-162.png',
    'https://gw.alicdn.com/imgextra/i1/O1CN01PyQ3UI1RPfyKnmYFx_!!6000000002104-2-tps-400-90.png'
]
export default function (props){
    const imgList = useRef([]);
    const scrollEle = useRef(null);

    useEffect(()=>{
        console.log("imgList.current",imgList.current);
        addToLazy(scrollEle.current,imgList.current)
        
    },[])
    return (
        <div ref={scrollEle} className="lazy-box">
            {
                imgarr.map((v)=>{
                    return <img ref={ref=>{imgList.current.push(ref)}} className="lazy-image" data-src={v} />
                })
            }
            
        </div>
    )
}