/**@jsx createElement */
import {createElement , useContext,useLayoutEffect, useEffect } from "rax";
import "./index.less"
import Slider from "rax-slider";
import Card from "../Card";
import { useState } from "rax";
let idx = 0
export default function (props){
  const [count,setCount] = useState(0);
  const [test,setTest] = useState(0)
  
    useEffect(()=>{
      (window as any).addCount = ()=>{
        setTest(Math.random())
      }
    
    },[])

    useLayoutEffect(()=>{
      console.log("...............")
      idx++;
    })
    return (
        <div className="cardmgr-box">
            <Slider
                width = "700"
                height = '200'
                className="slider"
                autoPlay={true}
                loop={true}
                showsPagination={true}
                autoPlayInterval={3000}
                horizontal= {false}
                vertical={true}
                paginationStyle={{
                    itemColor: '#dedede',
                    itemSelectedColor:'#4ea03d',
                }}
                style={{
                    width: "700rpx",
                    height: '200rpx',
                    position: 'relative',
                    marginLeft: '0rpx',
                    overflow: 'hidden',
                    backgroundColor: '#ffffff',
                    borderRadius: '10rpx',
                    boxShadow: '0 2px 20px 0 rgba(0, 0, 0, 0.09)'
                }}
            >
          {
            Array(3).fill(null).map((wish,index) => {
              return <Card key={index} index={index} />
            })
          }
          
        </Slider>
        {idx}
        </div>
    )
}