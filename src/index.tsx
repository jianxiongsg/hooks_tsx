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
        <BubbleNewParentUI  />
        
    ,ele,{driver:DriverDOM})
    
}
start(document.body)