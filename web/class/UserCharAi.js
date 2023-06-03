import {readonly, ref } from "vue";
import BingChat from "../components/chats/BingChat.vue";
import BingChatSetUp from "../components/chats/BingChatSetUp.vue";

let aiList = [{
    id:"bing",
    name:"Bing Ai",
    chatVue:BingChat,
    setUpVue:BingChatSetUp
},{
    id:"bing1",
    name:"Bing Ai",
    chatVue:BingChat,
    setUpVue:BingChatSetUp
},{
    id:"bing2",
    name:"Bing Ai",
    chatVue:BingChat,
    setUpVue:BingChatSetUp
},{
    id:"bing3",
    name:"Bing Ai",
    chatVue:BingChat,
    setUpVue:BingChatSetUp
},{
    id:"bing4",
    name:"Bing Ai",
    chatVue:BingChat,
    setUpVue:BingChatSetUp
}];
let userAi = ref(aiList[0]);

//添加use方法
for(let the of aiList){
    the.use = ()=>{
        userAi.value = the;
    }
}

export default class UserCharAi{
    static getUseChatAi(){
        return readonly(userAi);
    }
    static getChatAiArray(){
        return readonly(aiList);
    }
}