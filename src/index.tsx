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
        <RaxIcon />
        
    ,ele,{driver:DriverDOM})
    
}
start(document.body)