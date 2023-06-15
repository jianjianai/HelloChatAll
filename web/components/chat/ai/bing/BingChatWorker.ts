import type { ChatRecordData } from "@/components/ChatRecordData";
import type { AddMessageFun, ChatWorker, MyDefineComponent } from "../ChatWorker";
import { readonly, type DefineComponent, markRaw } from "vue";
import BingChat from "./BingChat.vue";
import BingChatMessage from "./types/BingChatMessage.vue";
import { BingChatMessageData } from "./types/BingChatMessageData";

let bingTypeList:{[type:string]:MyDefineComponent} = readonly({
    "BingChatMessage":markRaw(BingChatMessage)
});

class BingChatWorker implements ChatWorker {

    addMessage:AddMessageFun = ()=>{console.warn("未初始化？？？？？")};
    chatRecordData?:ChatRecordData;

    getTypeList(): { [type: string]: DefineComponent; } {
        return bingTypeList;
    }

    init(chatRecordData: ChatRecordData, addMessage:AddMessageFun): void {
        this.addMessage = addMessage;
        this.chatRecordData = chatRecordData;
    }

    async sendMessage(message: string) {
        this.addMessage("BingChatMessage",new BingChatMessageData(message));
        console.log(message);
    }

    getChatVue(): MyDefineComponent {
        return BingChat
    }
}

export {BingChatWorker};