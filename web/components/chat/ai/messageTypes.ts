import type { DefineComponent } from "vue";
import AllUserMessage from "./all/AllUserMessage.vue";
import AllMakerDownMessage from "./all/AllMakerDownMessage.vue";

let messageTypes:{[type:string]:DefineComponent<any,any,any,any,any,any,any,any,any,any>} = {
    "AllUserMessage":AllUserMessage,
    "AllMakerDownMessage":AllMakerDownMessage
}
export {messageTypes};