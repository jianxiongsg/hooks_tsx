Object.extend=function(props){
    //继承父类
    var prototype=Object.create(this.prototype)
    //初始化函数ctor
    var _Class=function(){
        if (this.ctor)
            this.ctor.apply(this, arguments);
    }
    //当前类属性和方法
    for(var k in props){
        prototype[k]= props[k]
    }
    _Class.prototype = prototype;
    //类继承
    _Class.extend=this.extend;
    //类扩展
    _Class.expand = function (prop) {
        for (var name in prop) {
            prototype[name] = prop[name];
        }
    };
    return _Class
 
}
 
//消消乐游戏 基础方法
var PointArr=Object.extend({
    ctor:function(arr){
        this.children=[]
        if(Object.prototype.toString.call(arr)=="[object Array]"){
            this.children=arr.sort(this._sort)
        }
    },
    //按照x和y大小排序
    _sort:function(a,b){
        if(a.x== b.x&&a.y== b.y){
            return 0
        }
        if(a.x== b.x){
            return a.y> b.y?1:-1
        }
        return a.x> b.x?1:-1
 
    },
    //左边l到右边r是否存在p，不存在返回-1，存在返回位置
    indexOf:function(p,l,r){
        var n=this.nearOf(p,l,r)
        if(this.children[n]&&this.children[n].x== p.x&&this.children[n].y== p.y){
            return n
        }else{
            return -1
        }
 
    },
    //查找离坐标最近的方块
    nearOf:function(p,l,r){
        var l=l||0,r=r||this.children.length;
 
        while(r-l>0){
            var m=(l+r)>>1
 
            var mid=this.children[m]
            //比较下坐标大小
            var order=this._sort(p,mid)
 
            if(order==1){
                l=Math.max(l+1,m)
            }else if(order==-1){
                r=Math.min(r-1,m)
            }else{
                l=r=m
            }
        }
 
        return (l+r)>>1
    },
    //插入一个坐标方块
    add:function(p){
        var n=this.nearOf(p)
        this.children.splice(n,0,p)
 
    },
    //删除指定坐标的方块
    del:function(p){
        var n=this.indexOf(p)
        if(n>-1){
            return this.children.splice(n,1)
        }
    },
    //是否同一种眼色
    isGroup:function(a,b){
        return a.color== b.color
    },
    //获取x,y方向颜色一样的相连方块
    getColorXy:function(p,x,y){
        var arr=[];
        var top={
            x: p.x,
            y: p.y
        }
        //一个闭包循环查找方块同色相连
        var _async=function(){
            top.x+=x||0
            top.y+=y||0
            var n=this.indexOf(top)
            if(n!=-1&& this.isGroup(p,this.children[n])){
                arr.push(n)
                _async.call(this)
            }else{
                return arr;
            }
        }
        _async.call(this)
        return arr;
    },
 
    //获取每个方块相连的信息
    getLinkData:function(){
        for(var i=0;i<this.children.length;i++){
 
            var sp=this.children[i];//当前的方块
            //top记录上，right记录右，初始top为0，right为0
            sp.i=i
            //top 数组包含上面相连的信息
            sp.top=this.getColorXy(sp,0,1)
            sp.right=this.getColorXy(sp,1,0)
            sp.bottom=this.getColorXy(sp,0,-1)
            sp.left=this.getColorXy(sp,-1,0)
 
        }
        return this.children;
    },
 
    //统计需要消除的方块，也就是连在一起的方块
    getClearData:function(){
        var clearData={
            /*直角相连的方块 4种 里面子数组的长度表示相连的个数
             0       0 0 0   0 0 0      0
             0           0   0          0
             0 0 0       0   0      0 0 0
             */
            "right-angle":[],
            /*平角相连的方块 2种 里面子数组的长度表示相连的个数
            0   0 0 0 0 0
            0
            0
            0
            0
            */
            "flat-angle":[]
        }
        var cache=[]
        //首先排除直角相连的同色方块
        for(var i=0;i<this.children.length;i++){
            if(cache.indexOf(i)==-1){
                var sp=this.children[i]
                sp.top=this.getColorXy(sp,0,1)
                sp.right=this.getColorXy(sp,1,0)
                sp.bottom=this.getColorXy(sp,0,-1)
                sp.left=this.getColorXy(sp,-1,0)
 
 
                if(sp.top.length>=2&&sp.right.length>=2){
                    //记录相连的方块位置
                    var oneArr=[i].concat(sp.top,sp.right)
                    //加到缓存，下次就不查询了
                    cache=cache.concat(oneArr)
                    clearData["right-angle"].push(oneArr)
                    continue
                }
                if(sp.top.length>=2&&sp.left.length>=2){
                    //记录相连的方块位置
                    var oneArr=[i].concat(sp.top,sp.left)
                    //加到缓存，下次就不查询了
                    cache=cache.concat(oneArr)
                    clearData["right-angle"].push(oneArr)
                    continue
                }
                if(sp.bottom.length>=2&&sp.right.length>=2){
                    //记录相连的方块位置
                    var oneArr=[i].concat(sp.bottom,sp.right)
                    //加到缓存，下次就不查询了
                    cache=cache.concat(oneArr)
                    clearData["right-angle"].push(oneArr)
                    continue
                }
                if(sp.bottom.length>=2&&sp.left.length>=2){
                    //记录相连的方块位置
                    var oneArr=[i].concat(sp.bottom,sp.left)
                    //加到缓存，下次就不查询了
                    cache=cache.concat(oneArr)
                    clearData["right-angle"].push(oneArr)
                    continue
                }
            }
        }
        //平角相连的同色方块
        for(var i=0;i<this.children.length;i++){
            if(cache.indexOf(i)==-1){
                var sp=this.children[i]
                sp.top=this.getColorXy(sp,0,1)
                sp.right=this.getColorXy(sp,1,0)
                sp.bottom=this.getColorXy(sp,0,-1)
                sp.left=this.getColorXy(sp,-1,0)
                //3个以上平角相连的
                if(sp.top.length>=2){
                    var oneArr=[i].concat(sp.top)
                    cache=cache.concat(oneArr)
                    clearData["flat-angle"].push(oneArr)
 
                }
                if(sp.right.length>2){
                    var oneArr=[i].concat(sp.right)
                    cache=cache.concat(oneArr)
                    clearData["flat-angle"].push(oneArr)
                }
            }
        }
        return clearData
    },
    //消除方块
    clearLinks:function(clearData){
        var arr=[];
        let newarr = [].concat(this.children);
        for(var i=0;i<clearData["right-angle"].length;i++){
            arr=arr.concat(clearData["right-angle"][i])
        }
        for(var i=0;i<clearData["flat-angle"].length;i++){
            arr=arr.concat(clearData["flat-angle"][i])
        }
        while(arr.length > 0){
            let rIdx = arr.shift();
            newarr = newarr.filter(v=>{return v.i !== rIdx})
        }
        this.children = newarr;
    }
    //方块下落
 
})
//测试
var arr=[]
for(var x=0;x<5;x++){
    for(var y=0;y<5;y++){
        var p={
            x:x,
            y:y,
            color:0|Math.random()*3
        }
        arr.push(p)
    }
}
 
var game=new PointArr(arr)
game.getLinkData()
console.log(game)

// console.log(game.children.length)
 
//统计数据
var clearData=game.getClearData()
console.log("...........getClearData",clearData)
game.clearLinks(clearData)
// console.log("........near",arr,game.nearOf({x:3,y:3}))
console.log("............game.children",game.children);
 
// "C:\Program Files (x86)\JetBrains\WebStorm 8.0.3\bin\runnerw.exe" "C:\Program Files (x86)\nodejs\node.exe" make.js
// { children:
//    [ { x: 0, y: 0, color: 0 },
//        { x: 0, y: 1, color: 0 },
//        { x: 0, y: 2, color: 1 },
//        { x: 0, y: 3, color: 0 },
//        { x: 0, y: 4, color: 1 },
//        { x: 1, y: 0, color: 0 },
//        { x: 1, y: 1, color: 0 },
//        { x: 1, y: 2, color: 2 },
//        { x: 1, y: 3, color: 0 },
//        { x: 1, y: 4, color: 2 },
//        { x: 2, y: 0, color: 1 },
//        { x: 2, y: 1, color: 0 },
//        { x: 2, y: 2, color: 0 },
//        { x: 2, y: 3, color: 1 },
//        { x: 2, y: 4, color: 2 },
//        { x: 3, y: 0, color: 1 },
//        { x: 3, y: 1, color: 2 },
//        { x: 3, y: 2, color: 2 },
//        { x: 3, y: 3, color: 2 },
//        { x: 3, y: 4, color: 0 },
//        { x: 4, y: 0, color: 2 },
//        { x: 4, y: 1, color: 1 },
//        { x: 4, y: 2, color: 2 },
//        { x: 4, y: 3, color: 1 },
//        { x: 4, y: 4, color: 2 } ] }
// 25
// { 'right-angle': [], 'flat-angle': [ [ 16, 17, 18 ] ] }
// [ 16, 17, 18 ]
