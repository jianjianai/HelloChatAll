import ChatWorker from "../all/ChatWorker";
import BingChat from "./BingChat.vue";
import BingSetUp from "./BingSetUp.vue"

export default class BingWorker extends ChatWorker{
        /**
     * 开始聊天
     */
        start() {
            throw new NoAchieveError("start未实现");
        }
        /**
         * 是否开始聊天了
         */
        isStart(){
            throw new NoAchieveError("isStart未实现");
        }
        /**
         * 停止聊天
         */
        stop() {
            throw new NoAchieveError("stop未实现");
        }
        /**
         * 发送消息
         */
        sendMessage() {
            throw new NoAchieveError("sendMessage未实现");
        }
        /**
         * 获取聊天显示vue对象
         *  */
        getChatVue(){
            return BingChat;
        }
        /**
         * 获取设置vue对象
         */
        getSetUpVue(){
            throw BingSetUp;
        }
}