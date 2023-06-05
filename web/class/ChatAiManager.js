import { markRaw, readonly } from "vue";
import BingWorker from "../components/chats/bing/BingWorker";
import ChatWorker from "../components/chats/all/ChatWorker";

class ChatAi{
  id;
  name;
  workerChass;
  /**
   * 
   * @param {string} id 
   * @param {string} name 
   * @param {ChatWorker.class} workerChass 
   */
  constructor(id,name,workerChass){
    this.id = id;
    this.name = name;
    this.workerChass = workerChass;
  }
  /**
   * 获取一个ChatWorker对象
   * @returns {ChatWorker}
   */
  newWorker(){
    return markRaw(new this.workerChass());
  }
}

let aiList = [
  new ChatAi('bing','bingAi',BingWorker)
];

// {id,ChatAi}
let aiMap = {};
aiList.forEach((a)=>{
  aiMap[a.id] = a;
})

export default class UserCharAi {
  /**
   * @returns {[ChatAi]}
   */
  static getChatAiArray() {
    return readonly(aiList);
  }
  /**
   * 
   * @param {string} id 
   * @returns {ChatAi}
   */
  static getChatAi(id){
    return readonly(aiMap[id]);
  }
}
