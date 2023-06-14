import type { DefineComponent } from "vue";
import { ChatRecordData } from "../../ChatRecordData"

interface ChatWorker{
    init(chatRecordData:ChatRecordData,addMessage:(type:string,data:object)=>void):void;
    /**
     * 发送消息
     */
    sendMessage(message:string):Promise<void>;
    /**
     * 获取聊天显示对象
     *  */
    getChatVue():DefineComponent
}
export {type ChatWorker};