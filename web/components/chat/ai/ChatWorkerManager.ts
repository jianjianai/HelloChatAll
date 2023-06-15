import { readonly} from "vue";
import type { ChatWorker } from "./ChatWorker";
import { BingChatWorker} from "./bing/BingChatWorker";
import { TestChatWork } from "./test/TestChatWork";

class WorkerOption {
    constructor(
        public worker: new () => ChatWorker,
        public name: string,
        public describe: string) {}
}

let aiMap: {
    [id: string]: WorkerOption
} = readonly({
    'TestRepeater': new WorkerOption(TestChatWork,"复读机","测试用的复读机"),
    // '文心一言': new WorkerOption(BingChatWorker,"文心一言","百度文心一言"),
    'NewBing': new WorkerOption(BingChatWorker,"BingAi","微软 BingAi"),
    // 'ChatGPT': new WorkerOption(BingChatWorker,"ChatGPT","OpenAI ChatGPT"),
});

class ChatWorkerManager {
    static getAllWorker() {
        return aiMap;
    }
    static getWorker(id: string) {
        return aiMap[id];
    };
}

export { ChatWorkerManager,WorkerOption };