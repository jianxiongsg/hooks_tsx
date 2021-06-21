/**@jsx createElement */
import {createElement , useReducer, useEffect, useRef,memo } from "rax";
import "./index.less";
import useMountedState from 'rax-use-mounted-state';
import useTimeout from 'rax-use-timeout'; 
import {createIconSet} from 'rax-icon';

const IconFont = createIconSet({
    guanbi: '\ue711',
    back: '\ue837',
    city: '\ue644',
    right: '\ue6a3',
    share: '\ue6f3',
    close: '\ue646',
    question: '\ue71d',
    hello: '\ue677'
  }, 'iconfont', 'https://at.alicdn.com/t/font_pkm0oq8is8fo5hfr.ttf');
interface PropsInfo{
    
}
export default memo(function(props:PropsInfo){
   
    return (
        <div>
            <span>&#xe837;</span>
          <IconFont name={'hello'} style={{fontSize:60}} />
        </div>
    )
})