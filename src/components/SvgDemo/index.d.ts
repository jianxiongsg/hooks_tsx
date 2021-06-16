/// <reference types="rax" />
import './index.less';
/**
 * 计算svg四周顶点坐标，path方式简单的只接受left,right,top,bottom四个顶点和radius
 * @param size 内容宽高
 * @param strockWidth 线宽
 * @param arrowWidth 箭头空隙宽度
 * @param arrowHeight 箭头空隙高度
 * @param arrowOffset 箭头offset
 * @param radius 圆角
 * @param direction 箭头方向
 * @param defsElement 渐变配合fill
 */
export interface ToolTipElementProps {
    ref?: any;
    content?: any;
    className?: string;
    a11yId: string;
    a11yRole?: any;
    width: number;
    height: number;
    arrowPath: string;
    allowReplacePath?: boolean;
    arrowWidth: number;
    arrowHeight: number;
    radius: number;
    strockWidth: number;
    direction?: string;
    arrowOffset: number;
    transitionName: string;
    defsElement?: any;
    fill: any;
}
declare const _default: import("rax").ForwardRefExoticComponent<Pick<ToolTipElementProps, "className" | "width" | "height" | "content" | "a11yId" | "a11yRole" | "arrowPath" | "allowReplacePath" | "arrowWidth" | "arrowHeight" | "radius" | "strockWidth" | "direction" | "arrowOffset" | "transitionName" | "defsElement" | "fill"> & import("rax").RefAttributes<unknown>>;
export default _default;
//# sourceMappingURL=index.d.ts.map