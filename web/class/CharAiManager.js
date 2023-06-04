import { markRaw, readonly } from "vue";
import BingChat from "../components/chats/bing/BingChat.vue";
import BingChatSetUp from "../components/chats/bing/BingChatSetUp.vue";

let aiList = [
  {
    id: "bing",
    name: "Bing Ai",
    chatVue: markRaw(BingChat),
    setUpVue: markRaw(BingChatSetUp),
  },
  {
    id: "bing1",
    name: "Bing Ai",
    chatVue: markRaw(BingChat),
    setUpVue: markRaw(BingChatSetUp),
  },
  {
    id: "bing2",
    name: "Bing Ai",
    chatVue: markRaw(BingChat),
    setUpVue: markRaw(BingChatSetUp),
  },
  {
    id: "bing3",
    name: "Bing Ai",
    chatVue: markRaw(BingChat),
    setUpVue: markRaw(BingChatSetUp),
  },
  {
    id: "bing4",
    name: "Bing Ai",
    chatVue: markRaw(BingChat),
    setUpVue: markRaw(BingChatSetUp),
  },
];

// {id,{id,name,chatVue,setUpVue}}
let aiMap = {};
aiList.forEach((a)=>{
  aiMap[a.id] = a;
})

export default class UserCharAi {
  static getChatAiArray() {
    return readonly(aiList);
  }
  static getChatAi(id){
    return readonly(aiMap[id]);
  }
}
