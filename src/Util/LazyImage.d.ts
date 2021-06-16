declare class LazyImage {
    private _imgList;
    private _throttle;
    private _scrollEle;
    constructor(scrollEle: Element, imgList: HTMLImageElement[]);
    init(): void;
    inViewShow(): void;
    throttle: () => () => void;
}
export declare function addToLazy(scrollParent: Element, list: HTMLImageElement[]): void;
export default LazyImage;
//# sourceMappingURL=LazyImage.d.ts.map