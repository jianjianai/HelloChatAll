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

        let porxyServer = './Proxy'
        if(porxyConfig.porxyServer){
            porxyServer = porxyConfig.porxyServer
        }

        let r = await fetch(porxyServer,{
            headers:{
                ProxyData:encodeURI(JSON.stringify({
                    url:url,
                    method:init.method,
                    headers:init.headers
                }))
            },
            body:init.body
        });

        return r;
}


export {proxyFetch}