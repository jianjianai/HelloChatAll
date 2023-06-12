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
    ,porxyServer?:string
    ):Promise<Response>{
        let r;
        if(porxyServer){
            r = await fetch(porxyServer,{
                headers:{
                    ProxyData:encodeURI(JSON.stringify({
                        url:url,
                        headers:init.headers
                    }))
                },
                method:init.method,
                body:init.body
            });
            
        }else{
            r = await fetch(url,init);
        }
        return r;
}


export {proxyFetch}