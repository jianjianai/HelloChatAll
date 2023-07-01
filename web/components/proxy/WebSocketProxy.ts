import SetUpManager from "../SetUpManager"

export let webSocketProxyConfig: {
    porxyServer?: string
} = SetUpManager.getSetUpObj("webSocketProxyConfig");



export class WebSocketProxy{
    static create(
        url:string,
        headers?:{[name:string]:string},
        porxyServer?:string
        ){
            let porxyData = JSON.stringify({
                url:url,
                headers:{
                    ...headers
                }
            });
            let conUrl;
            if(porxyServer){
                conUrl = new URL(porxyServer);
                conUrl.searchParams.set("ProxyData",porxyData);
            }else{
                conUrl = new URL(url);
            }
            return new WebSocket(conUrl);
    }
}