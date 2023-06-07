import { readonly } from "vue";
import type { ChatWorker } from "./ChatWorker";
import { BingChatWorker } from "./bing/BingChatWorker";

class WorkerOption {
    constructor(
        public worker: new () => ChatWorker,
        public name: string,
        public describe: string) {

    }
}

let aiMap: {
    [id: string]: WorkerOption
} = readonly({
    'NewBing': new WorkerOption(BingChatWorker,"BingAi","微软 BingAi")
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