/**@jsx createElement */
import {createElement , useContext, useEffect,useRef ,useLayoutEffect, useState} from "rax";
import { disableDodyScroll, enableBodyScroll } from "../../Util/lockScrollX";
import "./index.less"
function lockScroll(isLock){
    if(isLock){
        document.body.style.position = "fixed";
        document.body.style.height = "100vh";
        document.body.style.overflow = "hidden";
    }else{
        document.body.style.position = "relative";
        document.body.style.height = "auto";
        document.body.style.overflow = "auto";
    }
}
export default function (){
    const scrollParent = useRef(null);
    const [show,setShow] = useState(true);
    const moveDom = useRef(null);
    const pdom = useRef(null)
    useEffect(()=>{
    //   disableDodyScroll(scrollParent.current);
        lockScroll(true);
      setTimeout(()=>{
          lockScroll(false)
          console.log("22222222222")
        // enableBodyScroll(scrollParent.current)
        // pdom.current.style.transform = "translateX(-50vw)"
        // moveDom.current.style.transform = "translateY(-100vw)"
        // setShow(false)
      },5000)
    },[])
    return (
        <div>
            {
                
                <div ref={scrollParent} className="lockdemo" >
                    <div className="loackcon">

                    </div>
                </div>
            }
            <div ref={pdom} className="pdom"><div ref={moveDom} className="lockb"></div></div>
            <div dangerouslySetInnerHTML = {{ __html: "队伍<rgb style='color: #219B15;'>“相亲相爱一家人”</rgb>亲密值达到了280，获得了亲密奖励" }} />
        </div>
        
    )
}

