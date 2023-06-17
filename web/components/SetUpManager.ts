import { reactive, watch } from "vue";

let setUpMap:{[name:string]:Object} = {};

/**
 * 管理配置文件对象，修改时自动保存
 */
export default class SetUpManager{
    
    static getSetUpObj(name:string){
        const wathname = "conf-"+name
        if(!setUpMap[wathname]){
            let data = localStorage[wathname];
            if(!data){
                data = '{}';
            }
            let re = reactive(JSON.parse(data));
            setUpMap[wathname] = re;
            watch(re,()=>{
                localStorage[wathname] = JSON.stringify(re);
            });
        }
        return setUpMap[wathname];
    }
}