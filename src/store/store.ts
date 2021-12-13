import { runInAction, makeAutoObservable } from 'mobx'

const store = makeAutoObservable({
    count:0,
    index:0,
    setCount(count){
        this.count = count;
    },
    async initCount(){
        const count = await new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(10);
                console.log('...............initCount');
            },5000)
        })
        runInAction(()=>{
            this.index = count;
        })
    }
})

store.initCount();

export default store;