class LazyImage{
    private _imgList:HTMLImageElement[];
    private _throttle;
    private _scrollEle:Element;
    constructor(scrollEle:Element,imgList:HTMLImageElement[]){
        this._imgList = imgList;
        this._scrollEle = scrollEle;
        this.init();
    }

    init(){
        if("IntersectionObserver" in window){
            let lazyImageObserver = new IntersectionObserver((entries, observer)=>{
                entries.forEach((v,index)=>{
                    if(v.isIntersecting){
                        let imgEle = v.target as HTMLImageElement;
                        imgEle.src = imgEle.dataset.src;
                        lazyImageObserver.unobserve(imgEle);
                    }

                })
            })
            this._imgList.forEach((v,index)=>{
                lazyImageObserver.observe(v);
            })
        }else{
            this.inViewShow();
            this._throttle = this.throttle()
            this._scrollEle.addEventListener('scroll',this._throttle)
        }
    }

    inViewShow(){
        let len = this._imgList.length;
        for(let i=0;i< len;i++){
            let v = this._imgList[i];
            const rect = v.getBoundingClientRect();
            
            if(rect.top < document.documentElement.clientHeight){
                v.src = v.dataset.src;
                this._imgList.splice(i,1)
                len--;
                i--;
            }
        }
        if(this._imgList.length === 0){
            this._scrollEle.removeEventListener('scroll',this._throttle)
        }
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

export function addToLazy(scrollParent:Element,list:HTMLImageElement[]){
    
    lazyImage = new LazyImage(scrollParent,list);
    
}

export default LazyImage;