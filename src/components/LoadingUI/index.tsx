/** @jsx createElement */
import { render, createElement, Component } from "rax"
import './index.less';

export interface LoadingInfo {
    isLogin: boolean,
    isShow: boolean,
    time: number,
    cb: () => void
}
interface PropsInfo {
}
interface StateInfo {
    progress: number;
    show: boolean


}

function getCrossImageByType(url){
    return url
}

function isIPhoneX(){
    return false
}

function transformValue(v){
    return v/7.5 + "vw"
}

export default class LoadingUI extends Component<PropsInfo, StateInfo> {
    private static inst: LoadingUI
    private data: LoadingInfo
    // private isLogin:boolean=false
    // private isShow:boolean=true
    private elebox: any;
    private newBarEle:any;
    public refs: any;
    constructor(props) {
        super(props);
        LoadingUI.inst = this;
        this.state = {
            progress: 0,
            show: false
        }
    }

    static show(data: LoadingInfo) {
        LoadingUI.inst.data = data;
        LoadingUI.inst.setState({
            show: true
        }, () => {
            return
            if (LoadingUI.inst.data.isLogin && LoadingUI.inst.data.isShow) {
                LoadingUI.inst.move(data.time, data.cb);
                console.log("1111111111111111", data.time);

            }
        })

    }
    public progress(num) {
        this.setState({
            progress: num
        })
    }
    public complete() {
        this.setState({
            progress: 1,
            show: false
        })
    }
    static hide() {
        LoadingUI.inst.setState({
            show: false
        })
    }
    move(time: number, cb: () => void) {
        if (!this.elebox) {
            return
        }
        let t = (time / 1000) + 's'
        this.elebox.style.transitionDuration = t;
        setTimeout(() => {
            this.elebox.style.transform = 'translateX(0%)'
        }, 50);
    }
    componentDidMount(){
        setTimeout(()=>{
            LoadingUI.show({
                isLogin: true,
                isShow: true,
                time: 2000,
                cb: () => {}
            })
        },3000)
        
    }

    logIn = () => {
        return;
        LoadingUI.hide();
        if (this.data.cb) {
            this.data.cb();
        }
    }
    getType() {
        return
        if (true) {
            return (
                <div >
                <div className={"ingui-barbox"} style={{ bottom: isIPhoneX() ? transformValue(390) : transformValue(110) }} >
                    <img className={"ingui-barbgimg"} src={getCrossImageByType("https://gw.alicdn.com/tfs/TB1ymUHhz39YK4jSZPcXXXrUFXa-682-64.png")} />
                    <div className={"ingui-barcon"}  >
                        <img className={"ingui-barimg"} ref={ref => this.elebox = ref} src={getCrossImageByType("https://gw.alicdn.com/tfs/TB1hy.nPWL7gK0jSZFBXXXZZpXa-662-40.png")} />
                    </div>
                </div>
                <div className='ing-txt' style={{bottom : isIPhoneX()?transformValue(363) : transformValue(83) } }>Loading…</div>
                </div>
                
            )
        } else if (this.data && this.data.isLogin == false && this.data.isShow == true) {
           
            return <div className='ingui-login' onClick={this.logIn.bind(this)}>登录考拉寻宝
             <img className={"ingui-btnimg"} src={getCrossImageByType("https://gw.alicdn.com/tfs/TB1f5DDeCR26e4jSZFEXXbwuXXa-18-29.png")} />
            </div>
        } else {
            return null
        }
    }

    render() {
        return (
            <div id="loadingui-box" className={"ingui-box"} style={{ zIndex: 99 }}>
                <img className={"ingui-bgimg"} src={getCrossImageByType("https://gw.alicdn.com/tfs/TB12VdQmWNj0u4jSZFyXXXgMVXa-750-1624.png")} />
                <img className={"ingui-bghead"} src={getCrossImageByType("https://gw.alicdn.com/tfs/TB1uYwpRoH1gK0jSZSyXXXtlpXa-750-420.png")} />
                {/* <img className='loadingui-backbtn' onClick={this.exit} src={getCrossImageByType("https://gw.alicdn.com/tfs/TB1c0XpNGL7gK0jSZFBXXXZZpXa-11-19.png")} /> */}
                <div >
                <div className={"ingui-barbox"} style={{ bottom: isIPhoneX() ? transformValue(390) : transformValue(110) }} >
                    <img className={"ingui-barbgimg"} src={getCrossImageByType("https://gw.alicdn.com/tfs/TB1ymUHhz39YK4jSZPcXXXrUFXa-682-64.png")} />
                    
                    <div className={"ingui-barcon"}  >
                        {/* <div className={"ingui-barparent"}> */}
                        {/* <div className={"ingui-bar"} style={{transform:`translateX(${this.state.show?"0vw":"-100%"})`}} ref={ref => this.elebox = ref}></div> */}
                            <img className={"ingui-barimg"} style={{transform:`translateX(${this.state.show?"0vw":"-100%"})`}} ref={ref => this.elebox = ref} src={"https://gw.alicdn.com/tfs/TB1hy.nPWL7gK0jSZFBXXXZZpXa-662-40.png"} />
                        {/* </div> */}
                    </div>
                </div>
                <div className='ing-txt' style={{bottom : isIPhoneX()?transformValue(363) : transformValue(83) } }>Loading…</div>
                </div>

                <div aria-hidden="true">
                    <img
                    className="feedbtn-barbgimg"
                    alt="进度条背景"
                    aria-hidden="true"
                    src={'https://gw.alicdn.com/tfs/TB1cfFeWxz1gK0jSZSgXXavwpXa-266-44.png'}
                    />

                    <span aria-hidden="true" className="feedbtn-leveltxt">{`${5}级`}</span>
                    <div aria-hidden="true" className="feedbtn-barbg">
                    <div
                        className="feedbtn-bar"
                        aria-hidden="true"
                        ref={ref=>this.newBarEle = ref}
                        style={{transform:`translateX(${this.state.show?"0vw":"-100%"})`}}
                        // style={{
                        // transform: progress.total
                        //     ? `translateX(${-(1 - progress.step / progress.total) * 100}%)`
                        //     : 'translateX(-100%)',
                        // }}
                        >
                        <img
                        alt="光效"
                        aria-hidden="true"
                        className={`feedbtn-barlight${true ? ' bar-mask-anim' : ''}`}
                        src={'https://gw.alicdn.com/tfs/TB1o.bmnlBh1e4jSZFhXXcC9VXa-188-30.png'}
                        />
                    </div>
                    </div>

                </div>


                <div className="feedbtn-test" aria-hidden="true">
                    <img
                        className="feedbtn-barbgimg1"
                        alt="进度条背景"
                        aria-hidden="true"
                        src={'https://gw.alicdn.com/tfs/TB1cfFeWxz1gK0jSZSgXXavwpXa-266-44.png'}
                    />

                    <div aria-hidden="true" className="feedbtn-barbg1">
                        <div
                            className="feedbtn-bar1"
                            aria-hidden="true"
                            ref={ref=>this.newBarEle = ref}
                            style={{transform:`translateX(${this.state.show?"0vw":"-100%"})`}}
                            // style={{
                            // transform: progress.total
                            //     ? `translateX(${-(1 - progress.step / progress.total) * 100}%)`
                            //     : 'translateX(-100%)',
                            // }}
                            >
                        </div>
                    </div>

                </div>






            </div>
        );

    }
}