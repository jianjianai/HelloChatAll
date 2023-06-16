import type { ChatRecordData } from "@/components/ChatRecordData";
import type { AddMessageFun, ChatWorker, MyDefineComponent } from "../ChatWorker";
import { readonly, type DefineComponent, markRaw, toRef, ref, type Ref, type ToRef } from "vue";
import BingChat from "./BingChat.vue";
import BingChatMessage from "./types/BingChatMessage.vue";
import { BingChatMessageData } from "./types/BingChatMessageData";

let bingTypeList: { [type: string]: MyDefineComponent } = readonly({
    "BingChatMessage": markRaw(BingChatMessage)
});

export type ToneType = "Creative" | "Balanced" | "Precise";
export const OptionsSets = readonly({
    //更有创造力选项
    Creative: [
        "nlu_direct_response_filter",
        "deepleo",
        "disable_emoji_spoken_text",
        "responsible_ai_policy_235",
        "enablemm",
        "h3imaginative",
        "objopinion",
        "eredirecturl",
        "dv3sugg",
        "autosave",
        "clgalileo",
        "gencontentv3",
        "prompttrcp"
    ],
    //Balanced 平衡模式选项
    Balanced: [
        "nlu_direct_response_filter",
        "deepleo",
        "disable_emoji_spoken_text",
        "responsible_ai_policy_235",
        "enablemm",
        "galileo",
        "objopinion",
        "eredirecturl",
        "dv3sugg",
        "autosave",
        "saharagenconv5"
    ],
    //精准选项
    Precise: [
        "nlu_direct_response_filter",
        "deepleo",
        "disable_emoji_spoken_text",
        "responsible_ai_policy_235",
        "enablemm",
        "h3precise",
        "objopinion",
        "eredirecturl",
        "dv3sugg",
        "autosave",
        "clgalileo",
        "gencontentv3",
        "prompttrcp"
    ]
})

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


    getTypeList(): { [type: string]: DefineComponent; } {
        return bingTypeList;
    }

    init(chatRecordData: ChatRecordData, addMessage: AddMessageFun): void {
        this.addMessage = addMessage;
        this.chatRecordData = chatRecordData;
        let data = this.chatRecordData.getData();
        this.tone = toRef(data, "ChatTone", "Balanced") as any;
        this.isStart = toRef(data, "isStart", true) as any;
    }

    getChatVue(): MyDefineComponent {
        return BingChat
    }


    async sendMessage(message: string) {
        this.addMessage!("BingChatMessage", new BingChatMessageData(message));
        console.log(message);
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

function getUuid() {
    return URL.createObjectURL(new Blob()).split('/')[3];
}
function uuidToNoSplit(uuid: string) {
    return uuid.replace(/-/g, '');
}

/**
 * @param optionsSets 聊天选项 不同的聊天类型有不同的选项
 * @param tone  语气
 * @param isStartOfSession 是否是聊天的开始
 * @param timestamp  2023-05-14T09:17:16+08:00 聊天开始的时间
 * @param text  文本，聊天文本
 * @param conversationSignature  对话签名
 * @param participant  对话用户
 * @param conversationId  对话id
 * @param invocationId 调用id 应该从1开始每次发送+1
 * */
function getSendMessageJson(
    tone: ToneType,
    isStartOfSession: boolean,
    timestamp: string,
    text: string,
    conversationSignature: string,
    participant: string,
    conversationId: string,
    invocationId: string
) {
    let requestId = getUuid();
    return {
        "arguments": [
            {
                "source": "cib",
                "optionsSets": OptionsSets[tone],
                "allowedMessageTypes": [
                    "ActionRequest",
                    "Chat",
                    "Context",
                    "InternalSearchQuery",
                    "InternalSearchResult",
                    "Disengaged",
                    "InternalLoaderMessage",
                    "Progress",
                    "RenderCardRequest",
                    "AdsQuery",
                    "SemanticSerp",
                    "GenerateContentQuery",
                    "SearchQuery"
                ],
                "sliceIds": [
                    "winmuid1tf",
                    "osbsdusgreccf",
                    "contansperf",
                    "mlchatpc2",
                    "winstmsg2tf",
                    "creatgoglt2",
                    "creatorv2t",
                    "norespwcf",
                    "0521dur5",
                    "dur5",
                    "517opinion",
                    "418dhlths0",
                    "525ptrcp",
                    "kcimgv2cf",
                    "kcimgatt",
                    "427startpms0"
                ],
                "verbosity": "verbose",
                "traceId": uuidToNoSplit(getUuid()),
                "isStartOfSession": isStartOfSession,
                "message": {
                    "locale": "zh-CN",
                    "market": "zh-CN",
                    "region": "US",
                    "location": "lat:47.639557;long:-122.128159;re=1000m;",
                    "locationHints": [
                        {
                            "Center": {
                                "Latitude": 30.474103707944767,
                                "Longitude": 114.39625306330366
                            },
                            "RegionType": 2,
                            "SourceType": 11
                        },
                        {
                            "country": "United States",
                            "state": "Washington",
                            "city": "Index",
                            "zipcode": "98256",
                            "timezoneoffset": -8,
                            "dma": 819,
                            "countryConfidence": 9,
                            "Center": {
                                "Latitude": 47.8201,
                                "Longitude": -121.5543
                            },
                            "RegionType": 2,
                            "SourceType": 1
                        }
                    ],
                    "timestamp": timestamp,
                    "author": "user",
                    "inputMethod": "Keyboard",
                    "text": text,
                    "messageType": "Chat",
                    "requestId": requestId,
                    "messageId": requestId
                },
                "tone": tone,
                "requestId": requestId,
                "conversationSignature": conversationSignature,
                "participant": {
                    "id": participant
                },
                "conversationId": conversationId
            }
        ],
        "invocationId": invocationId,
        "target": "chat",
        "type": 4
    }
}