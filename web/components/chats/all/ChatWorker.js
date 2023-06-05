class NoAchieveError extends Error{
    constructor(message){
        super(message);
    }
}
class ChatWorker{
    chatRecordData;
    /**
     * @param {ChatRecordData} chatRecordData 
     */
    constructor(chatRecordData){
        this.chatRecordData = chatRecordData;
    }
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
        throw new NoAchieveError("getChatVue未实现");
    }
    /**
     * 获取设置vue对象
     */
    getSetUpVue(){
        throw new NoAchieveError("getSetUpVue未实现");
    }
}
export {NoAchieveError,ChatWorker};