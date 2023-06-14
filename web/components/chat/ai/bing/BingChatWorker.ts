import type { ChatRecordData } from "@/components/ChatRecordData";
import type { ChatWorker } from "../ChatWorker";
import type { DefineComponent } from "vue";
import BingChat from "./BingChat.vue";


class BingChatWorker implements ChatWorker {
    addMessage?:((type: string, data: object) => void);
    chatRecordData?:ChatRecordData;
    init(chatRecordData: ChatRecordData, addMessage: (type: string, data: object) => void): void {
        this.addMessage = addMessage;
        this.chatRecordData = chatRecordData;
    }
    async sendMessage(message: string) {
        console.log(message)
    }
    getChatVue(): DefineComponent<any,any,any,any,any,any,any,any,any,any> {
        return BingChat
    }
}

export { BingChatWorker };