/**@jsx createElement */
import { createElement,RaxNode,useEffect, useRef, useState } from "rax";
import  Children  from "rax-children";
import cloneElement from 'rax-clone-element';
import classnames from 'classnames';
import './index.less';

export interface ItemProps {
    children?: RaxNode;
    isCurrent?: boolean;
    isPre?:boolean;
    index?: number;
    onlyOne?: boolean;
    text?:string;
    image?:string;
  }
  

export function CarouselItem(props:ItemProps){
    const {isCurrent,isPre,onlyOne,text,image} = props;
    return (
        <div className={classnames('item',{
            'item-animation': !onlyOne,
            'pre':isPre,
            'current':isCurrent
        })}>
            <div>{text}</div>
            <img className="image" src={image} />
        </div>
    )
}
export interface Props {
    children?: JSX.Element[] | JSX.Element | any;
    width: number;
    height: number;
}

function usePrevious(value){
    const ref = useRef(-1);
    useEffect(()=>{
        ref.current = value;
    },[value])
    return ref.current
}
  
export function Carousel(props:Props){
    const count = Children.count(props.children);
    const [currentIndex,setCurrentIndex] = useState<number>(0);
    const preIndex = usePrevious(currentIndex);

    useEffect(()=>{
        if(count <=1 ){
            return;
        }
        setTimeout(()=>{
            if(currentIndex < count - 1){
                setCurrentIndex(currentIndex + 1)
            }else{
                setCurrentIndex(0);
            }
        },5000)
    },[currentIndex])

    return (
        <div className="ss-carousel">
            {
                Children.map(props.children,(item,i)=>{
                    return cloneElement(item,{
                        index:i,
                        isCurrent:currentIndex === i,
                        onlyOne:count === 1,
                        isPre:preIndex === i
                    })
                })
            }
        </div>
    )
}

export function CarouselParentUI(){
   
    const list = [
        {
            text:"测试文案1",
            image:"https://gw.alicdn.com/imgextra/i3/O1CN01Z5EP9V1woBJNl7A8X_!!6000000006354-2-tps-32-33.png"
        },
        {
            text:"测试文案2",
            image:"https://gw.alicdn.com/imgextra/i3/O1CN01hg2iVB1o5HYYQa7ti_!!6000000005173-2-tps-50-50.png"
        },
        {
            text:"测试文案3",
            image:"https://gw.alicdn.com/imgextra/i1/O1CN01BLfPrp1b8PG2Goopa_!!6000000003420-2-tps-32-33.png"
        },
        {
            text:"测试文案4",
            image:"https://gw.alicdn.com/imgextra/i1/O1CN01b8ueIm1QIycSOe7a2_!!6000000001954-2-tps-141-174.png"
        }

    ]
    return (
        <div className={"txt-box"}>
            <Carousel width={200} height={40}>
                {
                    list.map((info,index)=>{
                        return <CarouselItem {...info} key={index}></CarouselItem>
                    })
                }
            </Carousel>
        </div>
    )

}