/** @jsx createElement */
import {createElement,render,Component, useEffect} from "rax";
import Demo from "./components/Demo";
import * as DriverDOM from 'driver-dom';
// import "./Util/ajax.js"
import "./index.css"
import CardMgr from "./components/CardMgr";
import LazyImg from "./components/LazyImg";
import SliderUI from "./components/SliderUI";
import Button from "./components/Button";
import RadiusProgress from "./components/RadiusProgress";
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
        // <CardMgr />
        <RadiusProgress />
    ,ele,{driver:DriverDOM})
    
}
start(document.body)