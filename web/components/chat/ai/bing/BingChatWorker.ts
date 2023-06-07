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
    start(): void {
        throw new Error("Method not implemented.");
    }
    isStart(): boolean {
        throw new Error("Method not implemented.");
    }
    stop(): void {
        throw new Error("Method not implemented.");
    }
    sendMessage(message: string): void {
        throw new Error("Method not implemented.");
    }
    getChatVue(): DefineComponent<any,any,any,any,any,any,any,any,any,any> {
        return BingChat
    }
    getSetUpVue(): DefineComponent<any,any,any,any,any,any,any,any,any,any> {
        return BingSetUp
    }
}

export { BingChatWorker };