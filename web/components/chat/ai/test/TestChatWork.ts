import type { ChatRecordData } from "@/components/ChatRecordData";
import { reactive, type DefineComponent } from "vue";
import type { ChatWorker, MyDefineComponent,AddMessageFun } from "../ChatWorker";
import TestChatMessage from "./TestChatMessage.vue"
import TestChat from "./TestChat.vue";
import { TestChatMessageData } from "./TestChatMessageData";

let typelist:{ [type: string]: MyDefineComponent; }= {
    "testMessage":TestChatMessage,
};



class TestChatWork implements ChatWorker {
    chatRecordData?:ChatRecordData;
    addMessage?:AddMessageFun;
    getTypeList(): { [type: string]: DefineComponent; } {
        return typelist;
    }
    init(chatRecordData: ChatRecordData, addMessage: AddMessageFun): void {
        this.chatRecordData = chatRecordData;
        this.addMessage = addMessage;
    }
    async sendMessage(message: string): Promise<void> {
        let addMessage = this.addMessage as AddMessageFun;
        let messageData = reactive(new TestChatMessageData(message));
        addMessage("testMessage",messageData);
        for(let i=0;i<message.length;i++){
            messageData.message = message.substring(0,i);
            await new Promise((e)=>{setTimeout(e, 100);})
        }
    }
    getChatVue(): MyDefineComponent {
        return TestChat;
    }
}

export {TestChatWork}