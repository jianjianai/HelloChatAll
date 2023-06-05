import { markRaw, readonly } from "vue";
import BingWorker from "./bing/BingWorker";
import ChatWorker from "./all/ChatWorker";

class ChatAi{
  id;
  name;
  describe;
  workerChass;
  /**
   * 
   * @param {string} id id
   * @param {string} name 名称
   * @param {ChatWorker.class} workerChass 工作对象的class对象
   * @param {string} describe 简介
   */
  constructor(id,name,describe,workerChass){
    this.id = id;
    this.name = name;
    this.workerChass = workerChass;
    this.describe = describe;
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
  new ChatAi('bing','bingAi',"微软NewBing",BingWorker),
  new ChatAi('bing1','bingAi',"微软NewBing",BingWorker),
  new ChatAi('bing2','bingAi',"微软NewBing",BingWorker)
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
