import type { DefineComponent } from "vue";
import { ChatRecordData } from "../../ChatRecordData"

interface ChatWorker{
    init(chatRecordData:ChatRecordData,addMessage:(type:string,data:object)=>void):void;
    /**
     * 开始聊天
     */
    start():void;
    /**
     * 是否开始聊天了
     */
    isStart():boolean;
    /**
     * 停止聊天
     */
    stop():void;
    /**
     * 发送消息
     */
    sendMessage(message:string):void;
    /**
     * 获取聊天显示对象
     *  */
    getChatVue():DefineComponent
    /**
     * 获取设置对象,当前会话设置
     */
    getSetUpVue():DefineComponent
}
export {type ChatWorker};