import type { DefineComponent } from "vue";
import AllUserMessage from "./ai/all/AllUserMessage.vue";
import AllMakerDownMessage from "./ai/all/AllMakerDownMessage.vue";

let messageTypes:{[type:string]:DefineComponent<any,any,any,any,any,any,any,any,any,any>} = {
    "AllUserMessage":AllUserMessage,
    "AllMakerDownMessage":AllMakerDownMessage
}
export {messageTypes};