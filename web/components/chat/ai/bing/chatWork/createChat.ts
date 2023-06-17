import { proxyFetch } from "@/components/ProxyWorker";
import { BingAllSetUp } from "../BingAllSetUp";

export class Chat {
    constructor(
        public clientId:string,
        public conversationId:string,
        public conversationSignature:string
        ){}
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
    // let r = await proxyFetch("https://jjaw.cn/", {
    let r = await proxyFetch("https://www.bing.com/turing/conversation/create", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate, br, zsdch",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "Cache-Control":"no-cache",
            "Pragma":"no-cache",
            "Referer": "https://www.bing.com/search?q=Bing+AI",
            // "Sec-Ch-Ua":'"Not.A/Brand";v="8", "Chromium";v="114", "Microsoft Edge";v="114"',
            // "Sec-Ch-Ua-Arch":'"x86"',
            // "Sec-Ch-Ua-Bitness":'"64"',
            // "Sec-Ch-Ua-Full-Version":'"114.0.1823.43"',
            // "Sec-Ch-Ua-Full-Version-List":'"Not.A/Brand";v="8.0.0.0", "Chromium";v="114.0.5735.110", "Microsoft Edge";v="114.0.1823.43"',
            // "Sec-Ch-Ua-Mobile":"?0",
            // "Sec-Ch-Ua-Model":'""',
            // "Sec-Ch-Ua-Platform":'"Windows"',
            // "Sec-Ch-Ua-Platform-Version":'"15.0.0"',
            "Sec-Fetch-Dest":"empty",
            "Sec-Fetch-Mode":"cors",
            "Sec-Fetch-Site":"same-origin",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.57",
            "Cookie":BingAllSetUp.useCookie.value,
            "X-forwarded-for":"66.102.109.95"
        }
    }, BingAllSetUp.porxyServer.value);

    
    if(!r.ok){
        if(r.headers.has('ProxyErrorType')){
            return{
                error:{
                    type:"NoOk",
                    message:await r.text()
                }
            }
        }
        return{
            error:{
                type:"NoOk",
                message:"请求错误，错误代码"+r.status
            }
        }
    }
    let obj:{
        result:{
            message:string|null,
            value:string
        },
        clientId?:string,
        conversationId?:string,
        conversationSignature?:string
    };
    try{
        obj = await r.json();
    }catch(error){
        return{
            error:{
                type:"NoJson",
                message:error+""
            }
        }
    }
    if(obj.result.value==="Success"){
        return{
            chat:new Chat(obj.clientId!,obj.conversationId!,obj.conversationSignature!)
        }
    }else{
        return{
            error:{
                type:obj.result.value,
                message:obj.result.message+""
            }
        }
    }
}