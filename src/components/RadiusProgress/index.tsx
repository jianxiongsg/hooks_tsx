/**@jsx createElement */
import {createElement , useContext, useEffect, useRef, useState } from "rax";
import { Context } from "../ContextParent";
import "./index.less"
export default function (props){

    const [circleData,setCircleData] = useState({
        leftRotate:0,  //左半环进度
        rightRotate:0, //右半环进度
        halfClassName:'little', //50% 进度环 变色
        leftCircleDisplay:'none', //左半环遮罩
        percent:0  //进度百分比
    })
    
    function giftCircleProgressFn(per){
        var data = {};
        var percent = parseInt(per);
        
        //领取进度环形颜色className
        var halfClassName = percent<50?"little":"more";

        //左半环遮罩层显示样式状态
        var leftCircleDisplay = percent<50?"block":"none";

        var leftRotate = 0;
        var rightRotate = 0;
        //以50%为界限;<50%:右半圆占比为0,左半圆需要使用遮罩进行遮挡,展示剩余部分
        //           >50%:左半圆占比100%,右半圆直接使用百分比计算所占部分即可
        //注意：在半圆中计算百分比时,要将百分比乘以2。
        if(percent<50){
            leftRotate = -15-180+150*(percent*2)/100;   
            rightRotate = -135;
        }else{
            leftRotate = -15;
            rightRotate = -135+(150*((percent-50)*2)/100);   //比例在半环计算需要*2倍
        }
        data = {
            leftRotate:leftRotate,  //左半环进度
            rightRotate:rightRotate, //右半环进度
            halfClassName:halfClassName, //50% 进度环 变色
            leftCircleDisplay:leftCircleDisplay, //左半环遮罩
            percent:per  //进度百分比
        } as any;
        return circleData
    }
  
    useEffect(()=>{
        let i = 0
     setInterval(()=>{
        i+=10;
        setCircleData(giftCircleProgressFn(i))
     },300)
    },[])
   
    return (
        <div class="circleProgress_wrapper">
          <div class="wrapper right">
               <div class="circleProgress rightcircle"></div>
          </div>
          <div class="wrapper left">
               <div class="circleProgress leftcircle"></div>
          </div>
     </div>

//     <div class="progress_wrap js_halfClassNameObj">
//     <div class="right under">
//         <div class="circleProgress rightcircle"></div>
//     </div>
//     <div class="left under">
//         <div class="circleProgress leftcircle"></div>
//     </div>
//     <div class="right up">
//         <div class="circleProgress rightcircle js_progressRight" style={{transform:`rotate(${circleData.rightRotate.toString()}deg)`}}></div>
//     </div>
//     <div class="left up">
//         <div class="circleProgress leftcircle js_progressLeft" style={{transform:`rotate(${circleData.rightRotate.toString()}deg)`}}></div>
//     </div>

//     <div class="left up_left_cover js_giftLeftCover" style={{display:circleData.leftCircleDisplay}}>
//         <div class="circleProgress leftcircle color_border_t_l04"></div>
//     </div>
//     <div class="num">
//         <div>剩余</div>
//         <div class="js_giftPercent">{circleData.percent}</div>
//     </div>
// </div>
   
    )
}