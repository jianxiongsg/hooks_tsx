export default {
    data() {
      return {
        showStart: 1,
        colors: [
          '#CCCC33',
          '#CCCCCC',
          '#FFFFCC',
          '#0099FF',
          '#33CC99',
          '#FFFFFF',
          '#ff9900',
          '#99CC33',
          '#99CCFF',
          '#CC9999'
        ]
      };
    },
    computed: {
      showList() {
        const result = [];
        for (let i = 0; i < 20; i += 1) {
          result.push(this.showStart + i);
        }
        return result;
      }
    },
    mounted() {
      const io = new IntersectionObserver((entries:any[]) => {
        if (entries[0].intersectionRatio > 0.001) {
          if (entries[0].target.dataset.site === 'end') {
            this.showStart += 10;
          } else {
            this.showStart = (this.showStart - 10 <= 1) ? 1 : (this.showStart - 10);
          }
        }
      }, {
        threshold: [0.000001],
      });
      io.observe(this.$refs.start);
      io.observe(this.$refs.end);
    }
  };

  export interface IObserverInfo{
    endDom:Element; // 显示在最底部的dom
    showSize:number; // 同时显示的dom条数
    domList:Element[]; // 所有dom列表
    maxSize:number; // 最大条数
    onChange:()=>void;  // 更新当前显示的数据
  }

  export class IObserver{
    private _domList:Element[];
    private _throttle;
    private _scrollEle:Element;
    private showStart:number;
    constructor(scrollEle:Element,domList:Element[]){
        this._domList = domList;
        this.showStart = 0;
        this._scrollEle = scrollEle;
        this.init();
    }
    init(){
      if("IntersectionObserver" in window){
          let lazyImageObserver = new IntersectionObserver((entries:IntersectionObserverEntry[], observer:IntersectionObserver)=>{
              entries.forEach((v,index)=>{
                if(entries[0].isIntersecting){
                  console.log(entries)
                }
                console.log(entries)
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
                  // console.log('..........entries',entries)
              })
              // console.log('..........entries',entries)
              // const result = [];
              // for (let i = 0; i < 5; i += 1) {
              //     result.push(this.showStart + i);
              // }
              // console.log(result)
              
          },{
              threshold: [0.001] 
          })
          this._domList.forEach((v,index)=>{
              lazyImageObserver.observe(v);
          })
      }else{
          // this.inViewShow();
          // this._throttle = this.throttle()
          // this._scrollEle.addEventListener('scroll',this._throttle)
      }
  }
  }