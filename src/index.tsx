/** @jsx createElement */
import {createElement,render,Component, useEffect} from "rax";
import Demo from "./components/Demo";
import * as DriverDOM from 'driver-dom';
// import "./Util/ajax.js"
import "./index.css"
import ContextParent from "./components/ContextParent";
import LazyImg from "./components/LazyImg";
import SliderUI from "./components/SliderUI";
import RaxIcon from "./components/RaxIcon";
import CallbackDemo from "./components/CallbackDemo";
import Bubble from "./components/Bubble";
import AnimatedUI from "./components/Animated";
import { CarouselParentUI } from "./components/CarouselUI";
import { BubbleNewParentUI } from "./components/BubbleNew";
export const b = 999999;

function wait(times){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(Math.random() < times){
                resolve(true);
            }else{
                reject();
            }
        },1000)
    })
}

wait(1).then(()=>{
    console.log('.............1',Date.now())
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(Math.random() < 1){
                resolve(true);
            }else{
                reject();
            }
        },1000)
    })
}).then(()=>{
    console.log('.............2',Date.now())
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(Math.random() < 0){
                resolve(true);
            }else{
                reject('错了');
            }
        },1000)
    })
   
}).then(()=>{
    console.log('.............3',Date.now())
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(Math.random() < 1){
                resolve(true);
            }else{
                reject();
            }
        },1000)
    })
}).then(()=>{
    console.log('.............4',Date.now())
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(Math.random() < 1){
                resolve(true);
            }else{
                reject();
            }
        },1000)
    })
}).catch((error)=>{
    console.log('...........error',error)
})

export function start(ele:HTMLElement){ 
    render(
        // <SliderUI
        //         width = {700}
        //         height = {200}
        //         autoPlay={true}
        //         loop={true}
        //         showsPagination={true}
        //         autoPlayInterval={3000}
        //         horizontal= {false}
        //         vertical={true}
        //         paginationStyle={{
        //             itemColor: '#dedede',
        //             itemSelectedColor:'#4ea03d',
        //         }}
        //     />   
        <AnimatedUI  />
        
    ,ele,{driver:DriverDOM})
    
}
start(document.body)