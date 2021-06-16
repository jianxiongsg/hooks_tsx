/** @jsx createElement */
import { Component } from "rax";
import './index.less';
export interface LoadingInfo {
    isLogin: boolean;
    isShow: boolean;
    time: number;
    cb: () => void;
}
interface PropsInfo {
}
interface StateInfo {
    progress: number;
    show: boolean;
}
export default class LoadingUI extends Component<PropsInfo, StateInfo> {
    private static inst;
    private data;
    private elebox;
    private newBarEle;
    refs: any;
    constructor(props: any);
    static show(data: LoadingInfo): void;
    progress(num: any): void;
    complete(): void;
    static hide(): void;
    move(time: number, cb: () => void): void;
    componentDidMount(): void;
    logIn: () => void;
    getType(): JSX.Element;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=index.d.ts.map