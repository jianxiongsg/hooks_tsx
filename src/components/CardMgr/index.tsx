/**@jsx createElement */
import {createElement , useContext, useEffect } from "rax";
import "./index.less"
import Slider from "rax-slider";
import Card from "../Card";
export default function (props){
  
    useEffect(()=>{

    },[])
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
        </div>
    )
}