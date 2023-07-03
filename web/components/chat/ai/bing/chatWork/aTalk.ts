/**
 * 一次对话
 */

import { readonly } from "vue";
import type { Chat } from "./createChat";
import { WebSocketProxy } from "@/components/proxy/WebSocketProxy";
import { BingAllSetUp } from "../BingAllSetUp";


/**
 * 进行一次对话
 * @param chat 这个聊天
 * @param message 发送的消息
 */
export function aTalk(
    chat: Chat,
    message: {
        tone: ToneType,
        isStartOfSession: boolean,
        timestamp: string,
        text: string,
        invocationId: string
    },
    returnMessageFun: (data: {type:number,[name:string]:any}) => void,
    returnErrorMessageFun: (type: string, message: string) => void
) {
    let open = false;
    let close = false;
    let ws = WebSocketProxy.create("wss://sydney.bing.com/sydney/ChatHub", {
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Host": "sydney.bing.com",
        "Origin": "https://www.bing.com",
        "Pragma": "no-cache",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.57",
        "X-forwarded-for": "66.102.109.95"
    }, BingAllSetUp.WebSocketProxyUrl);
    ws.addEventListener("open",async (event)=>{
        console.log("open",event);
        sendJson(ws, {//发送握手包
            "protocol": "json",
            "version": 1
        });
    })
    ws.addEventListener("close", async (event) => {
        if(!close){
            console.log("异常关闭！");
        }
        console.log("close",event);
    });
    ws.addEventListener("error", async (event) => {
        console.log("error",event);
        returnErrorMessageFun("error","聊天连接出错："+event.type)
    });
    ws.addEventListener("message", async (event) => {
        console.log("accept", event.data)
        slicing(event.data as string, async (data) => {
            if (!data.type) { //没有type首次空包，此时可以发送消息
                if (!open) {
                    open = true;
                    //发送ping
                    await sendJson(ws,{"type":6});
                    //发送消息
                    await sendJson(ws,getSendMessageJson(
                        message.tone,
                        message.isStartOfSession,
                        message.timestamp,
                        message.text,
                        chat.conversationSignature,
                        chat.clientId,
                        chat.conversationId,
                        message.invocationId
                    ));
                }
            }else if(data.type==3){//type3为关闭
                close = true;
                ws.close();
            }else if(data.type==3){//type6为ping
                //发送ping
                await sendJson(ws,{"type":6});
            } else{//交给处理函数
                returnMessageFun(data as any);
            }
        });
    });
}
/**
 * 将消息切割并解析成json
 */
async function slicing(data: string, pipeline: (data: { [name: string]: any }) => void) {
    let jsonArray = data.split('\u001e');
    for (let json of jsonArray) {
        if(json){
            pipeline(JSON.parse(json));
        }
    }
}

async function sendJson(ws: WebSocket, json: object) {
    let go = JSON.stringify(json) + '\u001e';
    console.log("send", go)
    await ws.send(go);
}

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