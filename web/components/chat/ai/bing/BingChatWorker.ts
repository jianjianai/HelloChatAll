import type { ChatRecordData } from "@/components/ChatRecordData";
import type { AddMessageFun, ChatWorker, MyDefineComponent } from "../ChatWorker";
import { readonly, type DefineComponent, markRaw, toRef, ref, type Ref, type ToRef } from "vue";
import BingChat from "./BingChat.vue";
import BingChatMessage from "./types/BingChatMessage.vue";
import { BingChatMessageData } from "./types/BingChatMessageData";
import { Chat, createChat } from "./chatWork/createChat";
import type { Message } from "../../Messages";
import { aTalk, type ToneType } from "./chatWork/aTalk";
import type { AllUserMessageData } from "../all/AllUserMessageData";

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
    /**
     * 聊天id，每次对话+1
     */
    invocationId?: Ref<number>;



    getTypeList(): { [type: string]: DefineComponent; } {
        return bingTypeList;
    }

    init(chatRecordData: ChatRecordData, addMessage: AddMessageFun, messages: { [id: string]: Message<any> }): void {
        this.addMessage = addMessage;
        this.chatRecordData = chatRecordData;
        let data = this.chatRecordData.getData();
        this.tone = toRef(data, "ChatTone", "Balanced") as any;
        this.isStart = toRef(data, "isStart", true) as any;
        this.startTime = toRef(data, "startTime") as any;
        this.chat = toRef(data, "chat") as any;
        this.invocationId = toRef(data, "invocationId", 1) as any;
        console.log(messages);
    }

    getChatVue(): MyDefineComponent {
        return BingChat
    }


    async sendMessage(message: string, userMessage: Message<AllUserMessageData>) {
        if (!this.chat!.value) {
            let re = await createChat();
            console.log(re);
            if (re.chat) {
                this.chat!.value = re.chat;
            } else {//这里是错误了
                userMessage.data.isFall = true;
                userMessage.data.errorMessage = re.error?.message;
                return;
            }
        }
        let t = this.addMessage!("BingChatMessage", new BingChatMessageData(JSON.stringify(this.chat!.value)));
        this.invocationId!.value++;
        if (!this.startTime?.value) {
            this.startTime!.value = timeString(new Date());
        }
        aTalk(this.chat!.value, {
            tone: "Balanced",
            isStartOfSession: true,
            timestamp: this.startTime!.value,
            text: message,
            invocationId: this.invocationId!.value.toString()
        },
            (data) => {
                console.log(data);
                t.data.makerMessage = JSON.stringify(data);
            },
            (type, message) => {
                console.log(type, message);
            }
        );
    }
}


function timeString(d: Date) {
    let year = d.getFullYear();
    let month = (d.getMonth() + 1).toString().padStart(2, "0");
    let date = d.getDate().toString().padStart(2, "0");
    let hour = d.getHours().toString().padStart(2, "0");
    let minute = d.getMinutes().toString().padStart(2, "0");
    let second = d.getSeconds().toString().padStart(2, "0");
    let offset = "+08:00"; // 你可以根据需要修改这个值
    return year + "-" + month + "-" + date + "T" + hour + ":" + minute + ":" + second + offset;
}