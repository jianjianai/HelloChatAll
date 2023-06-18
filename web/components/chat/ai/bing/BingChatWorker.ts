import type { ChatRecordData } from "@/components/ChatRecordData";
import type { AddMessageFun, ChatWorker, MyDefineComponent } from "../ChatWorker";
import { readonly, type DefineComponent, markRaw, toRef, ref, type Ref, type ToRef } from "vue";
import BingChat from "./BingChat.vue";
import BingChatMessage from "./types/BingChatMessage.vue";
import { BingChatMessageData } from "./types/BingChatMessageData";
import { Chat, createChat } from "./chatWork/createChat";
import type { AllUserMessage } from "../../Messages";
import { type ToneType } from "./chatWork/aTalk";

let bingTypeList: { [type: string]: MyDefineComponent } = readonly({
    "BingChatMessage": markRaw(BingChatMessage)
});



export class BingChatWorker implements ChatWorker {

    addMessage?: AddMessageFun;
    chatRecordData?: ChatRecordData;
    /**
     * 对话风格
     */
    tone?: Ref<ToneType>;
    /**
     * 聊天是否已经开始
     */
    isStart?: Ref<boolean>;
    /**
     * 聊天开始时间
     */
    startTime?: Ref<string>;
    /**
     * chat对象
     */
    chat?: Ref<Chat | undefined>;


    getTypeList(): { [type: string]: DefineComponent; } {
        return bingTypeList;
    }

    init(chatRecordData: ChatRecordData, addMessage: AddMessageFun): void {
        this.addMessage = addMessage;
        this.chatRecordData = chatRecordData;
        let data = this.chatRecordData.getData();
        this.tone = toRef(data, "ChatTone", "Balanced") as any;
        this.isStart = toRef(data, "isStart", true) as any;
        this.startTime = toRef(data, "startTime") as any;
        this.chat = toRef(data, "chat") as any;
    }

    getChatVue(): MyDefineComponent {
        return BingChat
    }


    async sendMessage(message: string, userMessage: AllUserMessage) {
        if (!this.chat!.value) {
            let re = await createChat();
            console.log(re);
            if(re.chat){
                this.chat!.value = re.chat;
            }else{//这里是错误了
                userMessage.data.isFall = true;
                userMessage.data.errorMessage = re.error?.message;
                return;
            }
        }
        let t = this.addMessage!("BingChatMessage", new BingChatMessageData(JSON.stringify(this.chat!.value)));
    }
}