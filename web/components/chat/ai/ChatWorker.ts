import type { DefineComponent } from "vue";
import { ChatRecordData } from "../../ChatRecordData"
import type { AllUserMessage, Message } from "../Messages";

type AddMessageFun = (type: string, data: object) => Message;
type MyDefineComponent = DefineComponent<any, any, any, any, any, any, any, any, any, any>;

/**
 * 调用顺序
 * 第一个 getTypeList
 * 第二个 init
 * 第三个 getChatVue
 */
interface ChatWorker {
    /**
     * 获取需要使用的消息类型列表
     */
    getTypeList(): { [type: string]: MyDefineComponent };
    /**
     * 初始化
     */
    init(chatRecordData: ChatRecordData, addMessage: AddMessageFun): void;
    /**
     * 获取聊天显示对象
     **/
    getChatVue(): MyDefineComponent
    /**
     * 发送消息
     * @param userMessage 用户消息对象
     */
    sendMessage(message: string,userMessage:AllUserMessage): Promise<void>;

}
export { type ChatWorker, type AddMessageFun, type MyDefineComponent };