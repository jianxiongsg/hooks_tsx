/**@jsx createElement */
import { useRef } from "rax";
import {createElement , useContext, useEffect } from "rax";
import { convertValue,toNormalValue } from "../../Util/helper";
import { Context } from "../ContextParent";
import SliderItemUI from "../SliderItemUI";
import { px2px } from "../SvgDemo/calPathBak";
import "./index.less";
export interface SliderProps{
    width:number;
    height:number;
    horizontal: boolean;
    showsPagination: boolean;
    loop: boolean;
    autoPlay: boolean;
    autoPlayInterval: number;
    speed?: number;
    cssEase?: string;
    index?: number;
    total?:number;
    paginationStyle?: {[key:string]:string};
    initialVelocityThreshold?: number;
    verticalThreshold?: number;
    horizontalThreshold?: number;
    vertical?: boolean;
}

enum Dir{
    Left = 'left',
    Right = 'right'
}

export default function (props:SliderProps){
    const index = useRef(props.index || 0);
    const width = useRef(props.width);
    const height = useRef(props.height);
    const loopIdx = useRef(props.index);
    const offsetX = useRef(index.current * width.current);
    const isSwiping = useRef(false);
    const swipeView = useRef(null);
    const childRefs = useRef([]);
    const total = useRef(3);
    const autoPlayTimer = useRef(null);
    const isAutoPlay = useRef(false);
    const isInTransition = useRef(false);
    const touchStartX = useRef(0);

    

    const slideTo=(idx:number)=>{
        if(index.current === idx) return;
        if(isInTransition.current) return;
        if(isSwiping.current) return;
        if(total.current < 2) return;
        index.current = idx;
        if(index.current > total.current){
            index.current = 0;
        }
        if(index.current < -1){
            index.current = total.current - 1;
        }
        const {speed=500,cssEase='linear'}=this.props;
        isInTransition.current = true;
        offsetX.current = index.current * width.current;
        const realIndex = loopedIndex();
        const styleText = `translate3d(${convertValue(-1 * offsetX.current)},0,0)`;
        swipeView.current.style.transitionProperty = 'all';
        swipeView.current.style.transitionDuration = `${speed}ms`;
        swipeView.current.style.transitionTimingFunction = cssEase;
        swipeView.current.style.transform = styleText;
        swipeView.current.style.webkitTransform = styleText;
        loopIdx.current = index.current < 0 && realIndex !== 0 ? total.current - realIndex : realIndex;
        childRefs.current[loopIdx.current].style.left= convertValue(offsetX.current);


    }

    const autoPlay=()=>{
        const autoPlayInterval = props.autoPlayInterval;
        if(isSwiping.current) return;
        autoPlayTimer.current && clearInterval(autoPlayTimer.current);
        const interval = ()=>{
            if(isLoopEnd()) return;
            slideTo(index.current+1);
        }
        autoPlayTimer.current = setInterval(interval,autoPlayInterval)
    }

    const loopedIndex = (idx=index.current,tot=total.current)=>{
        return Math.abs(idx) % tot;
    }

    const isLoopEnd=()=>{
        const realIndex = loopedIndex();
        const num = total.current;
        if (!props.loop && (realIndex === num - 1 || realIndex === 0)) {
        return true;
        }
        return false;
    }

    const pushChild=(v)=>{
        if(childRefs.current.indexOf(v) === -1){
            childRefs.current.push(v);
        }
        console.log("childRefs",childRefs.current)
    }

    const handerTransitionEnd=(name)=>{
        // console.log("handerTransitionEnd",name);
        isInTransition.current = false;
        if(index.current === total.current){
            index.current = 0;
            resetSliderIndex();
        }else if(index.current === -1){
            index.current = total.current - 1;
            resetSliderIndex();
        }
    }

    const resetSliderIndex = ()=>{
        offsetX.current = index.current * width.current;
        const styleText = `translate3d(${convertValue(-1 * offsetX.current)},0,0)`;
        swipeView.current.style.transitionDuration = '0s';
        childRefs.current[loopIdx.current].style.left = convertValue(offsetX.current);
        swipeView.current.style.transform = styleText;
        swipeView.current.style.webkitTransform = styleText;
    }

    const onTouchStart=(v)=>{
        console.log(".........touchstart",v);
        if(v.targetTouches.length > 0){
            isSwiping.current = true;
            isInTransition.current = true;
            touchStartX.current = v.targetTouches[0].pageX;
        }
        
    }

    const onTouchMove=(v)=>{
        if(v.targetTouches.length > 0){
            let pageX = v.targetTouches[0].pageX;
            let distance = pageX - touchStartX.current;
            onSwipe({distance:distance})
        }
    }

    const onTouchEnd=(v)=>{
        console.log("................onTouchEnd")
        if(v.changedTouches.length > 0){
            let pageX = v.changedTouches[0].pageX;
            let dir = pageX - touchStartX.current > 0?Dir.Right:Dir.Left;
            isSwiping.current = false;
            isInTransition.current = false;
            const num = total.current;
            const realIndex = loopedIndex();
            if(!(isLoopEnd() && (realIndex === num - 1 && dir === Dir.Left || realIndex === 0 && dir === Dir.Right))){
                slideTo(index.current + (dir === Dir.Left ? 1:-1))
            }
            if(props.autoPlay){
                autoPlay();
            }
        }
    }

    const onSwipe=({distance})=>{
        if(isLoopEnd()){
            return;
        }
        const dir = distance > 0 ? Dir.Right:Dir.Left;
        if(index.current === total.current){
            index.current = 0;
        }else if(index.current === -1){
            index.current = total.current - 1;
        }
        
        const realIndex = loopedIndex();
        const changeX = toNormalValue(distance) - offsetX.current;
        const styleText = `translate3d(${convertValue(changeX)},0,0)`;
        childRefs.current[index.current === total.current -1 ? 0:index.current+1].style.left = convertValue((index.current+1) * width.current);
        childRefs.current[index.current === 0 ? total.current - 1:index.current -1].style.left = convertValue((index.current -1) * width.current);
        swipeView.current.style.transitionDuration = '0s';
        swipeView.current.style.transform = styleText;
        swipeView.current.style.webkitTransform = styleText;
        
    }

    useEffect(()=>{
        if(props.autoPlay && total.current > 1){
            isAutoPlay.current = true;
            autoPlay();
        }
        document.addEventListener('touchstart',onTouchStart,{passive:false});
        document.addEventListener('touchmove',onTouchMove,{passive:false});
        document.addEventListener('touchend',onTouchEnd,{passive:false});
    },[])
    return (
        <div className="sliderui">
            <div ref={swipeView} className="slider-box" onTransitionEnd={handerTransitionEnd}>
            {
                Array(3).fill(null).map((v,idx)=>{
                    return <SliderItemUI key={idx} left={idx * width.current} index={idx} pushChild={pushChild} />
                })
            }
            </div>
        </div>
    )
}