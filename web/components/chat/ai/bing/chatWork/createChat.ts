import { proxyFetch } from "@/components/ProxyWorker";
import { BingAllSetUp } from "../BingAllSetUp";

export class Chat {

}

/**
 * 创建聊天
 */
export async function createChat(): Promise<{
    chat?: Chat,
    error?: {
        type: string,
        message?: string,
    }
}> {
    let r = await proxyFetch("https://www.bing.com/turing/conversation/create", {
        method: "GET",
        headers: {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language:": "zh-CN,zh;q=0.9",
            "Referer": "https://www.bing.com/search?q=Bing+AI",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.57",
            "Cookie":BingAllSetUp.useCookie.value
        }
    }, BingAllSetUp.porxyServer.value);


    
    console.log(await r.text());
    return {};
}