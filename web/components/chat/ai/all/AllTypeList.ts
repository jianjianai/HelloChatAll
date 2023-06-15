import { readonly, type DefineComponent,markRaw } from "vue";
import AllUserMessage from "./AllUserMessage.vue";
import type { MyDefineComponent } from "../ChatWorker";

let allTypeList:{[type:string]:MyDefineComponent} = readonly({
    "AllUserMessage":markRaw(AllUserMessage)
});
export {allTypeList}