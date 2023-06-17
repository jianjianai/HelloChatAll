import SetUpManager from "@/components/SetUpManager";
import { toRef, type Ref } from "vue";

let bingSetUp:any = SetUpManager.getSetUpObj("NewBing");

export class BingAllSetUp{
    static porxyServer:Ref<string> = toRef(bingSetUp,"porxyServer","./HttpProxy");
    static useCookie:Ref<string>=toRef(bingSetUp,"useCookie","");
}