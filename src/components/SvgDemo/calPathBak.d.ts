/// <reference types="rax" />
/**
 * 计算svg四周顶点坐标，path方式简单的只接受left,right,top,bottom四个顶点和radius
 * @param width 内容宽度
 * @param height 内容高度
 * @param strockWidth 线宽
 * @param arrowWidth 箭头空隙宽度
 * @param arrowHeight 箭头空隙高度
 * @param arrowOffset 箭头offset
 */
export declare function calcSvgBounding(placement: any, width: any, height: any, strockWidth: any, arrowWidth: any, arrowHeight: any, arrowOffset: any): {
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: any;
    height: any;
    strockOffset: number;
};
/**
 * 通过rect来绘制svg
 * @param placement 方向
 * @param svgRect svg rect
 * @param radius svg raidus
 * @param arrowPath 箭头路径
 * @param positionArrowOffset 偏移量
 */
export default function calSvgInfo(placement: string, svgRect: any, radius: any, arrowPath: any, positionArrowOffset: any, arrowWidth: any): {
    svgTransform: {
        transformOrigin: string;
        transform: string;
        top: import("rax").Key;
        left: import("rax").Key;
    };
    path: string;
};
export declare function px2px(num: any): number;
export declare function path2vw(str: string, scale?: number): string;
//# sourceMappingURL=calPathBak.d.ts.map