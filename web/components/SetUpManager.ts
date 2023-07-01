import { isReactive, reactive, watch } from "vue";

let setUpMap:{[name:string]:Object} = {};

/**
 * 管理配置文件对象，修改时自动保存
 */
export default class SetUpManager{
    
    static getSetUpObj<T extends Object>(name:string,def:T={} as any):T{
        const wathname = "conf-"+name
        if(!setUpMap[wathname]){
            let data = localStorage[wathname];
            let re:Object;
            if(!data){
                if(isReactive(def)){
                    re = def;
                }else{
                    re = reactive(def);
                }
            }else{
                re= reactive(JSON.parse(data));
            }
            setUpMap[wathname] = re;
            watch(re,()=>{
                localStorage[wathname] = JSON.stringify(re);
            });
        }
        return <T>setUpMap[wathname];
    }
}