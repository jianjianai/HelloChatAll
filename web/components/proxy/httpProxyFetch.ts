import SetUpManager from "../SetUpManager"

export let httpProxyFetchConfig:{
    porxyServer?:string
} = SetUpManager.getSetUpObj("httpProxyFetchConfig");



export async function httpProxyFetch(
    url:string,
    init?:{
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
                        headers:{
                            ...init?.headers
                        }
                    }))
                },
                method:init?.method,
                body:init?.body
            });
        }else{
            r = await fetch(url,init);
        }
        return r;
}