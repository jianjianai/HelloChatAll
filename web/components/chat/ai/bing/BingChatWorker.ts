import type { ChatRecordData } from "@/components/ChatRecordData";
import type { ChatWorker } from "../ChatWorker";
import type { DefineComponent } from "vue";
import BingChat from "./BingChat.vue";
import BingSetUp from "./BingSetUp.vue";


class BingChatWorker implements ChatWorker {
    addMessage:((type: string, data: object) => void) | undefined = undefined;
    init(chatRecordData: ChatRecordData, addMessage: (type: string, data: object) => void): void {
        this.addMessage = addMessage;
    }
    async sendMessage(message: string) {
        console.log(message)
    }
    getChatVue(): DefineComponent<any,any,any,any,any,any,any,any,any,any> {
        return BingChat
    }
    getSetUpVue(): DefineComponent<any,any,any,any,any,any,any,any,any,any> {
        return BingSetUp
    }
}

export { BingChatWorker };