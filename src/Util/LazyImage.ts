class LazyImage{
    private _imgList:Element[];
    private _throttle;
    private _scrollEle:Element;
    private showStart:number;
    constructor(scrollEle:Element,imgList:Element[]){
        this._imgList = imgList;
        this.showStart = 0;
        this._scrollEle = scrollEle;
        this.init();
    }

    init(){
        if("IntersectionObserver" in window){
            let lazyImageObserver = new IntersectionObserver((entries:any[], observer)=>{
                entries.forEach((v,index)=>{
                    // if (entries[0].intersectionRatio > 0.001) {
                    //     if (entries[0].target.dataset.site === 'end') {
                    //       this.showStart += 10;
                    //     } else {
                    //       this.showStart = (this.showStart - 10 <= 1) ? 1 : (this.showStart - 10);
                    //     }
                    //   }
                    // if(v.intersectionRatio <=0){
                    //     console.log('................hide',index)
                    // }else if(v.intersectionRatio >=1){
                    //     let imgEle = v.target as HTMLImageElement;
                    //     imgEle.src = imgEle.dataset.src;
                    //     console.log('................show',index)
                    // }
                    if(v.isIntersecting){
                        let imgEle = v.target as HTMLImageElement;
                        imgEle.src = imgEle.dataset.src;
                        // lazyImageObserver.unobserve(imgEle);
                        console.log('................show',index)
                    }else{
                        console.log('................hide',index)
                    }
                    // console.log('..........entries',entries)
                })
                console.log('..........entries',(entries[0].target as HTMLElement).getAttribute('id'),entries[0].isIntersecting)
                const result = [];
                for (let i = 0; i < 5; i += 1) {
                    result.push(this.showStart + i);
                }
                console.log(result)
                
            },{
                threshold: [0.1] 
            })
            this._imgList.forEach((v,index)=>{
                lazyImageObserver.observe(v);
            })
        }else{
            // this.inViewShow();
            // this._throttle = this.throttle()
            // this._scrollEle.addEventListener('scroll',this._throttle)
        }
    }

    inViewShow(){
        // let len = this._imgList.length;
        // for(let i=0;i< len;i++){
        //     let v = this._imgList[i];
        //     const rect = v.getBoundingClientRect();
            
        //     if(rect.top < document.documentElement.clientHeight){
        //         v.src = v.dataset.src;
        //         this._imgList.splice(i,1)
        //         len--;
        //         i--;
        //     }
        // }
        // if(this._imgList.length === 0){
        //     this._scrollEle.removeEventListener('scroll',this._throttle)
        // }
    }

    throttle=()=>{
        let t_start = null;
        let timer = null;
        let delay = 15;
        let mustRun = 30;
        return ()=>{
            let t_current = Date.now();
            clearTimeout(timer);
            if(!t_start){
                t_start = t_current;
            }
            if(t_current - t_start > mustRun){
                this.inViewShow();
                t_start = t_current;
            }else{
                timer = setTimeout(()=>{
                    this.inViewShow()
                },delay)
            }

        }
    }
}

let lazyImage:LazyImage;

export function addToLazy(scrollParent:Element,list:Element[]){
    
    lazyImage = new LazyImage(scrollParent,list);
    
}

export default LazyImage;