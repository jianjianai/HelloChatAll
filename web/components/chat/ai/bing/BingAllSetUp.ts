import SetUpManager from "@/components/SetUpManager";

export let BingAllSetUp = SetUpManager.getSetUpObj("NewBing",{
    HttpProxyUrl:"./HttpProxy",
    WebSocketProxyUrl:`${location.protocol.replace("http","ws")}//${location.host}/WebSocketProxy`,
    useCookie:""
});