import SetUpManager from "./SetUpManager"

let porxyConfig:{
    porxyServer?:string
} = SetUpManager.getSetUpObj("PorxyWorker");



async function proxyFetch(
    url:string,
    init:{
        method?:"POST"|"GET",
        headers?:{[name:string]:string},
        body?:BodyInit
    }
    ):Promise<Response>{

        let porxyServer = './HttpProxy'
        if(porxyConfig.porxyServer){
            porxyServer = porxyConfig.porxyServer
        }

        let r = await fetch(porxyServer,{
            headers:{
                ProxyData:encodeURI(JSON.stringify({
                    url:url,
                    headers:init.headers
                }))
            },
            method:init.method,
            body:init.body
        });

        return r;
}


export {proxyFetch}