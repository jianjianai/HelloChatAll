import { reactive, watchEffect } from "vue";

let setUpMap = {};
export default class SetUpManager{
    static getSetUpObj(name){
        const wathname = name.toString();
        if(!setUpMap[wathname]){
            let data = localStorage[wathname];
            if(!data){
                data = '{}';
            }
            let re = reactive(JSON.parse(data));
            setUpMap[wathname] = re;
            watchEffect(()=>{
                localStorage[wathname] = JSON.stringify(re);
            });
        }
        return setUpMap[wathname];
    }

    static getAllSetUpObj(){
        return this.getSetUpObj("GlobalSettings");
    }
}